import {makeExecutableSchema} from 'graphql-tools'
import typeDefs from './typeDefs'
import {ObjectId} from 'mongodb'

const api = (db) => {

  const Comments = db.collection('comments')

  const Posts = db.collection('posts')

  const stringifyObjectId = (obj) => {
    return {
      ...obj,
      _id: obj._id.toString()
    }
  }

  const resolvers = {
    Query: {
      post: async (root, {_id}) => {
        return stringifyObjectId(
          await Posts.findOne(ObjectId(_id)))
      },
      posts: async (root, args, context) => {
        const posts = await Posts.find({}).toArray()
        return posts.map(stringifyObjectId)
      },
      comment: async (root, {_id}) => {
        return stringifyObjectId(
          await Comments.findOne(ObjectId(_id)))
      },
      comments: async (root, {postId}) => {
        return (await Comments.find({
          postId
        }).toArray()).map(stringifyObjectId)
      }
    },
    Post: {
      comments: async ({_id}) => {
        return (await Comments.find({
          postId: _id
        }).toArray()).map(stringifyObjectId)
      }
    },
    Comment: {
      post: async ({postId}) => {
        return stringifyObjectId(
          await Posts.findOne(ObjectId(postId)))
      }
    },
    Mutation: {
      createPost: async (root, args, context, info) => {
        const res = await Posts.insert(args)
        return stringifyObjectId(await Posts.findOne({
          _id: res.insertedIds[0]
        }))
      },
      createComment: async (root, args) => {
        const res = await Comments.insert(args)
        return stringifyObjectId(await Comments.findOne({
          _id: res.insertedIds[0]
        }))
      }
    }
  }

  return makeExecutableSchema({
    resolvers,
    typeDefs
  })
}

export default api

// adds a post 
// mutation {
//   createPost(title:"Appolo & GraphQL", content:"Sweet!") {
//     _id
//     title
//     content
//   }
// }

// query posts
// query {
//   posts {
//     _id
//     title
//     content
//   }
// }

// creates comment
// mutation {
//   createComment(postId: "5aa861ab70498b9d79362837", content: "Cool article!") {
//     _id
//     postId
//     content
//   }
// }

// get posts with comments
// query {
//   posts {
//     _id
//     title
//     content
//     comments {
//       _id
//       postId
//       content
//     }
//   }
// }

// include post in each comments
// query {
//   posts {
//     _id
//     title
//     content
//     comments {
//       _id
//       postId
//       content
//       post {
//         _id
//         title
//         content
//       }
//     }
//   }
// }