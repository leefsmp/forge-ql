// async support
import 'babel-polyfill'

//Server stuff
import {graphiqlExpress} from 'graphql-server-express'
import RateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
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
  secret: 'forge-rcdb',
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

const forgeCfg = {
  oauth: {
    redirectUri: `${process.env.HOST_URL}:${process.env.PORT}/api/forge/callback/oauth`,
    authenticationUri: '/authentication/v1/authenticate',
    refreshTokenUri: '/authentication/v1/refreshtoken',
    authorizationUri: '/authentication/v1/authorize',
    accessTokenUri: '/authentication/v1/gettoken',

    baseUri: 'https://developer.api.autodesk.com',
    clientSecret: process.env.FORGE_CLIENT_SECRET,
    clientId: process.env.FORGE_CLIENT_ID,

    scope: [
      'data:read',
      'data:write',
      'data:create',
      'data:search',
      'bucket:read',
      'bucket:create',
      'bucket:delete',
      'viewables:read'
    ]
  }
}

const forgeSvc = new ForgeSvc(forgeCfg)

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
app.use('/api/forge',     ForgeAPI(forgeCfg))
app.use('/api/dm',        DMAPI())

app.use('/api/graphiql', graphiqlExpress({
  endpointURL: '/api/graphql'
}))

///////////////////////////////////////////////////////////
// Viewer GET Proxy
//
///////////////////////////////////////////////////////////
const proxy2legged = lmvProxySvc.generateProxy(
  'lmv-proxy-2legged',
  () => forgeSvc.get2LeggedToken())

app.get('/lmv-proxy-2legged/*', proxy2legged)

const proxy3legged = lmvProxySvc.generateProxy(
  'lmv-proxy-3legged',
  (session) => forgeSvc.get3LeggedTokenMaster(session))

app.get('/lmv-proxy-3legged/*', proxy3legged)

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const run = async () => {

  try {

    const {HOST_URL, MONGO_URL, PORT} = process.env
  
    const db = await MongoClient.connect(MONGO_URL)

    app.use('/api/graphql', graphQLAPI({db}))

    app.listen(PORT, () => {
      console.log(`Server running on ${HOST_URL}:${PORT}`)
    })

  } catch (e) {

    console.error(e)
  }
}

run()