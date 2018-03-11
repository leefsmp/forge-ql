import {graphqlExpress} from 'graphql-server-express'
import {mergeSchemas} from 'graphql-tools'
import dmAPI from './forge-dm'
import blogAPI from './blog'

const api = ({db}) => {

  const schema = mergeSchemas({
    schemas: [dmAPI(), blogAPI(db)]
  })
  
  return graphqlExpress(request => ({
    schema,
    context: { 
      session: request.session 
    }
  }))
}

export default api