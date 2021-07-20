const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList} = graphql;
const _ = require('lodash');
const data = require('./data');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        userId: {type: GraphQLInt},
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    }
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        postId: {type: GraphQLInt},
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        body: {type: GraphQLString}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getPost: {
            type: PostType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                const posts = data.getPost();
                return _.find(posts, {id: args.id})
            }
        },
        getAllPosts: {
            type: new GraphQLList(PostType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                const posts = data.getPost();
                return posts;
            }
        },
        getAllComments: {
            type: new GraphQLList(CommentType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                const comments = data.getComment();
                return comments;
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})