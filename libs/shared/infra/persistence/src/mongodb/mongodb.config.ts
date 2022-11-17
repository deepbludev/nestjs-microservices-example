export const mongodbConfig = () => ({
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
})
