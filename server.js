const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();


connectDb();
const app = express();
const port = process.env.PORT 


app.use(express.json())


app.use("/api/v1/contacts", require("../CRUD_OP_Project/routes/contactRoutes"))
app.use("/api/v1/users", require("../CRUD_OP_Project/routes/userRoutes"))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})

