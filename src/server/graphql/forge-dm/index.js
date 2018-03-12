import ServiceManager from '../../services/SvcManager'
import {graphqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import typeDefs from './typeDefs'

import hubsRes from './hubs'

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const onError = (ex) => {

  return {
    data: null,
    error: ex
  }
}

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const onResponse = (res) => {

  if (res.statusCode === 200) {

    return {
      data: res.body.data,
      error: null
    }
  }

  return {
    data: null,
    error: {}
  }
}

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const api = () => {

  const forgeSvc = ServiceManager.getService('ForgeSvc')

  const dmSvc = ServiceManager.getService('DMSvc')

  const resolvers = {
    Query: {
      hubs: async (root, args, {session}) => {
   
        try {

          const token = 
            await forgeSvc.get3LeggedTokenMaster(
              session)

          const res = await dmSvc.getHubs(token)

          return onResponse (res)

        } catch (ex) {

          return onError(ex)
        }
      },
      hub: async (root, {hubId}, {session}) => {

        try {

          const token = 
            await forgeSvc.get3LeggedTokenMaster(
              session)

          const res = await dmSvc.getHub(token, hubId)

          return onResponse(res)

        } catch (ex) {

          console.log(ex)      

          return {}
        }
      },
      projects: async (root, {hubId}, {session}) => {

       
      }
    }
  }

  return makeExecutableSchema({
    resolvers,
    typeDefs
  })
}

export default api


