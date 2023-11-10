const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient
const cors = require("cors");
const createRouter = require("./helpers/create_router");

app.use(cors());

app.use(express.json());
MongoClient.connect("mongodb://127.0.0.1:27017")
.then((client) => {
    const db = client.db("recipeAppUsers")
    const usersCollection = db.collection("users")
    const usersRouter = createRouter(usersCollection)
    app.use("/api/users", usersRouter)
})
.catch(console.error)


app.listen(9000, function () {
    console.log(`Listening on port ${ this.address().port }`);
});