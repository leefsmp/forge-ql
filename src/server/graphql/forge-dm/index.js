import ServiceManager from '../../services/SvcManager'
import {graphqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import typeDefs from './typeDefs'

const api = () => {

  const forgeSvc = ServiceManager.getService('ForgeSvc')

  const dmSvc = ServiceManager.getService('DMSvc')

  const resolvers = {
    Query: {
      hubs: async (root, args, ctx) => {
        
        try {

          const token = 
            await forgeSvc.get3LeggedTokenMaster(
              ctx.session)

          const res = await dmSvc.getHubs(token)

          const hubs = res.body.data

          return hubs

        } catch (ex) {

          console.log(ex)
          return []
        }
      }
    }
  }

  return makeExecutableSchema({
    resolvers,
    typeDefs
  })
}

export default api


