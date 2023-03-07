const App = require('./App');
// require('dotenv').config();
const cloudinary = require('cloudinary').v2 
const Database = require('./Database/Database');

console.log(process.env.PORT)

const PORT = process.env.PORT || 3000;

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

Database()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})
