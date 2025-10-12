import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5'

async function init() {
    const app = express();
const PORT = Number(process.env.PORT) || 8000;

// Create Graphql Server

const gqlServer = new ApolloServer({
    typeDefs: `
         type Query {
         hello : String
         say(name:String) : String
         }
    `,
    resolvers : {
        Query : {
            hello : () => `Hey there I am a Graphql Server !`,
            say: (_,{name}: {name :String}) =>`Hey ${name},How are you ?`
        }
    }
})
//   Start the gql server
await gqlServer.start();

app.get("/",(req,res)=>{
    res.json({message :  "Server is up and runing"});

});

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(gqlServer),
);

 app.listen(PORT,() => console.log(`Server is Srarted at PORT : ${PORT}`));

    
}
init();