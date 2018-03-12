// async support
import 'babel-polyfill'

//Server stuff
import {graphiqlExpress} from 'graphql-server-express'
import RateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import gzip from 'express-static-gzip'
import session from 'express-session'
import bodyParser from 'body-parser'
import {MongoClient} from 'mongodb'
import store from 'connect-mongo'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'

//Endpoints
import ForgeAPI from './endpoints/forge'
import DMAPI from './endpoints/dm'

//Services
import DerivativesSvc from './services/DerivativesSvc'
import ServiceManager from './services/SvcManager'
import LMVProxySvc from './services/LMVProxySvc'
import SocketSvc from './services/SocketSvc'
import UploadSvc from './services/UploadSvc'
import ForgeSvc from './services/ForgeSvc'
import OssSvc from './services/OssSvc'
import DMSvc from './services/DMSvc'

// GraphQL API
import graphQLAPI from './graphql'

//Config (NODE_ENV dependant)
import config from'c0nfig'

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  delayMs: 0, // disabled
  max: 1000
})

const app = express()

app.use(session({
  secret: 'forge-ql',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // 24h session
  },
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('trust proxy', 1)
app.use(cookieParser())
app.use(helmet())
app.use(limiter)
app.use(cors())

///////////////////////////////////////////////////////////
// Services setup
//
///////////////////////////////////////////////////////////
const derivativesSvc = new DerivativesSvc()

const lmvProxySvc = new LMVProxySvc({
  endpoint: 'developer.api.autodesk.com'
})

const forgeSvc = new ForgeSvc(config.forge)

const uploadSvc = new UploadSvc({
  tempStorage: path.join(__dirname, '/../../TMP')
})

const ossSvc = new OssSvc()
const dmSvc = new DMSvc()

ServiceManager.registerService(derivativesSvc)
ServiceManager.registerService(uploadSvc)
ServiceManager.registerService(forgeSvc)
ServiceManager.registerService(ossSvc)
ServiceManager.registerService(dmSvc)

///////////////////////////////////////////////////////////
// API Routes setup
//
///////////////////////////////////////////////////////////
const setupAPI = (db) => {

  app.use('/api/forge',     ForgeAPI(config.forge))
  app.use('/api/dm',        DMAPI())

  app.use('/api/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql'
  })) 

  app.use('/api/graphql', graphQLAPI({db}))
}

///////////////////////////////////////////////////////////
// Viewer GET Proxy
//
///////////////////////////////////////////////////////////
const setupLMVProxy = () => {

  const proxy2legged = lmvProxySvc.generateProxy(
    'lmv-proxy-2legged',
    () => forgeSvc.get2LeggedToken())
  
  app.get('/lmv-proxy-2legged/*', proxy2legged)
  
  const proxy3legged = lmvProxySvc.generateProxy(
    'lmv-proxy-3legged',
    (session) => forgeSvc.get3LeggedTokenMaster(session))
  
  app.get('/lmv-proxy-3legged/*', proxy3legged)
}

/////////////////////////////////////////////////////////////////////
// Static routes
//
/////////////////////////////////////////////////////////////////////
const setupStatic = () => {

  if (process.env.HOT_RELOADING) {

    // dynamically require webpack dependencies
    // to keep them in devDependencies (package.json)
    const webpackConfig = require('../../webpack/development.webpack.config')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpack = require('webpack')
  
    const compiler = webpack(webpackConfig)
  
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
      progress: true,
      hot: true
    }))
  
    app.use(webpackHotMiddleware(compiler))
  
    app.use('/resources', express.static(__dirname + '/../../resources'))
  
    app.get('*', express.static(path.resolve(process.cwd(), './dist')))
  
  } else {
  
    app.use('/resources', express.static(__dirname + '/../../resources'))
  
    app.use(gzip(path.resolve(process.cwd(), './dist'), {
      enableBrotli: true
    }))
  
    app.get('*', gzip(path.resolve(process.cwd(), './dist'), {
      enableBrotli: true
    }))
  }
}

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const run = async () => {

  try {

    const {HOST_URL, MONGO_URL, PORT} = process.env
  
    const db = await MongoClient.connect(MONGO_URL)

    setupAPI(db)

    setupLMVProxy()

    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware
    app.use(require('connect-history-api-fallback')())

    setupStatic()

    app.listen(PORT, () => {
      console.log(`Server running on ${HOST_URL}:${PORT}`)
    })

  } catch (e) {

    console.error(e)
  }
}

run()