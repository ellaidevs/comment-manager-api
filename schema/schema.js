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
            resolve: async (parent, args) => {
                const dataPost = await data.getPost();
                const posts = await dataPost.json();
                return _.find(posts, {id: args.id})
            }
        },
        getAllPosts: {
            type: new GraphQLList(PostType),
            args: {id: {type: GraphQLInt}, sortOfKey: {type: GraphQLInt}, limit: {type: GraphQLInt}},
            resolve: async (parent, {sortOfKey = null, limit = null}) => {
                const postsJson = await data.getPost();
                const posts = await postsJson.json();
                if (sortOfKey || limit) {
                    const sort = _.drop(posts, (sortOfKey));
                    if (limit != null) {
                        return _.take(sort, limit);
                    }
                    return sort;
                } else {
                    return posts;
                }
            }
        },
        getAllComments: {
            type: new GraphQLList(CommentType),
            args: {
                id: {type: GraphQLInt},
                sortOfKey: {type: GraphQLInt},
                limit: {type: GraphQLInt},
                filterBy: {type: GraphQLString}
            },
            resolve: async (parent, {sortOfKey = null, limit = null, filterBy = null}) => {
                const commentsJson = await data.getComment();
                const comments = await commentsJson.json();

                let commentList;
                if (filterBy != null) {
                    switch (filterBy) {
                        case 'name':
                            commentList = _(comments).orderBy(['name'], ['asc']);
                            break;
                        case 'email':
                            commentList = _(comments).orderBy(['email'], ['asc']);
                            break;
                        case 'body':
                            commentList = _(comments).orderBy(['body'], ['asc']);
                            break;
                        default:
                            commentList = comments;
                    }
                }

                if (sortOfKey || limit) {
                    const sort = _.drop(commentList, (sortOfKey));
                    if (limit != null) {
                        return _.take(sort, limit);
                    }
                    return sort;
                } else {
                    return commentList;
                }
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})