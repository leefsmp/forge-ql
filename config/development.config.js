
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/forge-ql"
const HOST_URL = process.env.HOST_URL || 'http://localhost'
const PORT = process.env.PORT || 3000

const config = {

  env: 'development',

  HOT_RELOADING: true,
  MONGO_URL,
  HOST_URL,
  PORT,

  client: {
    apiUrl: `${HOST_URL}:${PORT}/api`,
    host: `${HOST_URL}`,
    env: 'development',
    port: PORT
  },

  layouts: {
    index: 'development.index.ejs'
  },

  forge: {

    oauth: {

      redirectUri: `${HOST_URL}:${PORT}/api/forge/callback/oauth`,
      authenticationUri: '/authentication/v1/authenticate',
      refreshTokenUri: '/authentication/v1/refreshtoken',
      authorizationUri: '/authentication/v1/authorize',
      accessTokenUri: '/authentication/v1/gettoken',

      baseUri: 'https://developer.api.autodesk.com',
      clientSecret: process.env.FORGE_DEV_CLIENT_SECRET,
      clientId: process.env.FORGE_DEV_CLIENT_ID,

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
    },

    hooks: {
      callbackUrl: `https://dcc54956.ngrok.io/api/forge/callback/hooks`
    },

    viewer: {
      viewer3D: 'https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.js?v=4.0.0',
      threeJS:  'https://developer.api.autodesk.com/derivativeservice/v2/viewers/three.js?v=4.0.0',
      style:    'https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=4.0.0'

      // viewer3D: '/resources/libs/lmv/4.0.1/viewer3D.js',
      // threeJS:  '/resources/libs/lmv/4.0.1/three.js',
      // style:    '/resources/libs/lmv/4.0.1/style.css'
    }
  }
}

module.exports = config


