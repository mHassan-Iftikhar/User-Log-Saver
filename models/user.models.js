import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/testapp")
    .then(() => {
        console.log(`Successfully connected with DataBase`);
    })
    .catch((err) => {
        console.error(`Error connecting with DataBase:`, err);
    });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});


export const User = mongoose.model('User', userSchema);