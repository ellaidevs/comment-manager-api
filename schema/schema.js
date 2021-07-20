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