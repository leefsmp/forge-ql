import {makeExecutableSchema} from 'graphql-tools'
import typeDefs from './typeDefs'

const api = (db) => {

  const Comments = db.collection('comments')

  const Posts = db.collection('posts')

  const prepare = (object) => {
    return {
      ...object,
      _id: object._id.toString()
    }
  }

  const resolvers = {
    Query: {
      post: async (root, {_id}) => {
        return prepare(await Posts.findOne(ObjectId(_id)))
      },
      posts: async (root, args, context) => {
        return (await Posts.find({}).toArray()).map(prepare)
      },
      comment: async (root, {_id}) => {
        return prepare(await Comments.findOne(ObjectId(_id)))
      },
    },
    Post: {
      comments: async ({_id}) => {
        return (await Comments.find({
          postId: _id
        }).toArray()).map(prepare)
      }
    },
    Comment: {
      post: async ({postId}) => {
        return prepare(await Posts.findOne(ObjectId(postId)))
      }
    },
    Mutation: {
      createPost: async (root, args, context, info) => {
        const res = await Posts.insert(args)
        const postId = res.insertedIds[0]
        return prepare(await Posts.findOne({
          _id: postId
        }))
      },
      createComment: async (root, args) => {
        const res = await Comments.insert(args)
        const commentId = res.insertedIds[0]
        return prepare(await Comments.findOne({
            _id: commentId
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
//   createPost(title:"hello", content:"world") {
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
//   createComment(postId: "5a9fee4dde5633b67a3621a5", content: "I like the way you say hello world.") {
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