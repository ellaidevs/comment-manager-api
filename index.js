const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();

const schema = require('./schema/schema');

const PORT = 5000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`listening on PORT :${PORT}`);
});

