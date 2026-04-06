const express = require('express');
const app = express();
const port = 5050;
const connectDB = require('./config/dbConnection.js')

// Middleware
app.use(express.json());
app.use("/uploads", express.static('uploads'));
app.use("/api", require("./routes/book.routes.js"))

connectDB();

app.listen(port, () => {
    console.log("Server running on http://localhost:5050"); 
});