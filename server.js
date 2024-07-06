const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./config/db")
require("dotenv").config()
const port =process.env.PORT

const AdminRoute=require("./Routes/AdminRoute")
const UserRoute =require("./Routes/UserRoute")
const JourneyRoute=require("./Routes/BookingRoute")
const TicketContoller=require("./Routes/TicketRoute")
const FinalRoute=require("./Routes/FinalTicketRoute")

// admin api
app.use("/api/v1",AdminRoute)

//users api
app.use("/api/v2",UserRoute)

// journey api
app.use("/api/journey",JourneyRoute)
app.use("/api/ticket",TicketContoller)
app.use("/api/final",FinalRoute)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port 🤞${port}!`))