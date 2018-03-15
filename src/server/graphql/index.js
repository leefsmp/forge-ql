import {graphqlExpress} from 'graphql-server-express'
import costAnalysis from 'graphql-cost-analysis'
import depthLimit from 'graphql-depth-limit'
import {mergeSchemas} from 'graphql-tools'
import dmAPI from './forge-dm'
import blogAPI from './blog'

const api = ({db}) => {

  const costAnalyzer = costAnalysis({
    maximumCost: 1000
  })

  const schema = mergeSchemas({
    schemas: [dmAPI(), blogAPI(db)]
  })
  
  return graphqlExpress((req, res, graphQLParams) => ({
    schema,
    context: { 
      session: req.session 
    },
    // validationRules: [  
    //   depthLimit(10),
    //   costAnalyzer
    // ]
  }))
}

export default api