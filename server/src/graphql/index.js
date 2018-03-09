import {graphqlExpress} from 'graphql-server-express'
import {mergeSchemas} from 'graphql-tools'
import blogAPI from './blog'

const api = ({db}) => {

  const schema = mergeSchemas({
    schemas: [blogAPI(db)]
  })
  
  return graphqlExpress(request => ({
    schema,
    context: { 
      user: 'BOB' //request.user 
    }
  }))
}

export default api