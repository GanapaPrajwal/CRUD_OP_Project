const  mongoose  =require( "mongoose");

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL,clientOptions)
        console.log("Database connected: ",connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports  =connectDb;
