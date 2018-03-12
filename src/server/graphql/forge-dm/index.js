import ServiceManager from '../../services/SvcManager'
import {graphqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import typeDefs from './typeDefs'

import hubsRes from './hubs'

const api = () => {

  const forgeSvc = ServiceManager.getService('ForgeSvc')

  const dmSvc = ServiceManager.getService('DMSvc')

  const resolvers = {
    Query: {
      hubs: async (root, args, ctx) => {
        
        return hubsRes.body.data

        // try {

        //   const token = 
        //     await forgeSvc.get3LeggedTokenMaster(
        //       ctx.session)

        //   const res = await dmSvc.getHubs(token)

        //   const hubs = res.body.data

        //   return hubs

        // } catch (ex) {

        //   console.log(ex)
        //   return []
        // }
      },
      hub: async (root, {hubId}) => {

        return hubsRes.body.data[0]
      },
      projects: async (root, {hubId}) => {

       
      }
    }
  }

  return makeExecutableSchema({
    resolvers,
    typeDefs
  })
}

export default api


