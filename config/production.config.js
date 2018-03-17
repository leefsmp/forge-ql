
/////////////////////////////////////////////////////////////////////
// PRODUCTION configuration
//
/////////////////////////////////////////////////////////////////////
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/forge-ql"
const HOST_URL = process.env.HOST_URL || 'https://forge-ql.autodesk.io'
const PORT = process.env.PORT ||443

const config = {

  env: 'production',
  
  MONGO_URL,
  HOST_URL,
  PORT,

  client: {
    apiUrl: `${HOST_URL}:${PORT}/api`,
    host: `${HOST_URL}`,
    env: 'production',
    port: PORT
  },

  layouts: {
    index: 'production.index.ejs'
  },

  forge: {

    oauth: {

      redirectUri: `${HOST_URL}/api/forge/callback/oauth`,
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
    },

    hooks: {
      callbackUrl: `${HOST_URL}/api/forge/callback/hooks`
    },

    viewer: {
      viewer3D: 'https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.min.js?v=4.0.1',
      threeJS:  'https://developer.api.autodesk.com/derivativeservice/v2/viewers/three.min.js?v=4.0.1',
      style:    'https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=4.0.1'
    }
  }
}

module.exports = config


