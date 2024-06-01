import mongoose from "mongoose";

const DB_connection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/appvote')
        .then((res) => console.log('DB Connected Successfully'))
        .catch((err) => console.log('db connection failed', err))
}


export default DB_connection;