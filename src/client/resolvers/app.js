import {client as config} from 'c0nfig'
import ClientAPI from 'ClientAPI'
import gql from 'graphql-tag'


const fetchUser = async () => {

  const clientAPI = new ClientAPI(config.apiUrl)

  try {

    const user = await clientAPI.ajax('/forge/user')

    return user
    
  } catch (ex) {

    return null
  }
}

const login = async () => {

  const clientAPI = new ClientAPI(config.apiUrl)

  try {

    const user = await clientAPI.ajax('/forge/user')

    return user
    
  } catch (ex) {
    
    const payload = {
      origin: window.location.href
    }

    const loginUrl = await clientAPI.ajax({
      contentType: 'application/json',
      data: JSON.stringify(payload),
      url:'/forge/login',
      dataType: 'json',
      type: 'POST'
    })

    // const url = `${config.apiUrl}/forge/login`

    // const res = await fetch(url, {
    //  credentials: "include",
    //   body: JSON.stringify(payload),
    //   method: 'post'
    // })

    // const loginUrl = await res.json()

    window.location.assign(loginUrl)

    return null
  }
}

const logout = async () => {

  const clientAPI = new ClientAPI(config.apiUrl)

  try {

    const res = await clientAPI.ajax({
      contentType: 'application/json',
      url:'/forge/logout',
      dataType: 'json',
      type: 'POST'
    })

    console.log(res)

    return res
    
  } catch (ex) {
    
    return null
  }
}

const appResolver = {
  defaults: {
    user: null
  },
  resolvers: {
    Mutation: {
      fetchUser: async (p1, p2, {cache}) => {
        
        const user = await fetchUser()

        if (user) {

          cache.writeData({ 
            data: {
              user: {
                __typename: 'User',
                profileImage: user.profileImages.sizeX80,
                firstName: user.firstName,
                lastName: user.lastName
              }
            }
          })
        }
      
        return user 
      },
      doLogin: async (p1, p2, {cache}) => {
    
        const query = gql`
          query GetUser {
            user @client {
              profileImage
              firstName
              lastName
            }
          }
        `
        const res = cache.readQuery({ 
          query 
        })

        if (res.user) {

          logout()

          cache.writeData({ 
            data: {
              user: null
            }
          })

          return null
        }

        const user = await login()

        if (user) {

          cache.writeData({ 
            data: {
              user: {
                __typename: 'User',
                profileImage: user.profileImages.sizeX80,
                firstName: user.firstName,
                lastName: user.lastName
              }
            }
          })
        }

        return null 
      }
    }
  }
}

export default appResolver