import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://guillermoaballester:coderhouse@cluster0.qxmm2xi.mongodb.net/ecommerce")
    .then(() => console.log('Connected to ecommerce databse'))
    .catch((error) => console.log('Connect error ',error))

/*  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('🍃 Connected to ecommerce database'))
    .catch((error) => console.log('Connect error ',error))

 */
