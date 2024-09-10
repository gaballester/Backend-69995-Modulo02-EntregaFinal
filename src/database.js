import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('🍃 Connected to ecommerce database'))
    .catch((error) => console.log('Connect error ',error))


