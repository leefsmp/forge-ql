import gql from 'graphql-tag'

const appResolver = {
  defaults: {
    user: null
  },
  resolvers: {
    Mutation: {
      doLogin: (p1, p2, {cache}) => {
        
        const query = gql`
          query GetUser {
            user @client {
              id
            }
          }
        `

        const res = cache.readQuery({ query })

        console.log(res)  

        return null
      },
      showAbout: () => {
    
        console.log('ABOUT')  

        return null
      }
    }
  }
}

export default appResolver