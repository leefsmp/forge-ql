const typeDefs = [`

    type Query {
      comment(_id: String): Comment
      post(_id: String): Post
      posts: [Post]
    }

    type Post {
      comments: [Comment]
      content: String
      title: String
      _id: String
    }

    type Comment {
      postId: String
      content: String
      _id: String
      post: Post
    }

    type Mutation {
      createComment(postId: String, content: String): Comment
      createPost(title: String, content: String): Post
    }

    schema {
      mutation: Mutation
      query: Query
    }
`]

export default typeDefs