const express = require("express")
const route = require("./routes/url")
const app = express()
const path = require("path")
const connectDb = require("./config/db")
const { urlencoded } = require("express")
app.use(express.json({extended:false}))
app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs")

connectDb()

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "index.html"))
})
app.use("/", route)
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000
app.listen( PORT, () => {
    console.log(`express server is running on PORT ${PORT}`)
})