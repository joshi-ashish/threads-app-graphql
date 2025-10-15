import express from "express";
import { expressMiddleware } from '@as-integrations/express5'
import createApolloGraphqlServer from "./graphql/index.js";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

app.get("/",(req,res)=>{
    res.json({message :  "Server is up and runing"});

});

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(await createApolloGraphqlServer()),
);

 app.listen(PORT,() => console.log(`Server is Srarted at PORT : ${PORT}`));

    
}
init();