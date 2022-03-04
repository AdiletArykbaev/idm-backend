const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const app = express()
const port = 7000
const cors = require("cors")
const connect =  mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "IDM",
  password: ""
});

connect.connect((err)=>{
  if(!err)
    console.log("db connected succeded")
  
})
app.use(bodyParser.json())
app.use(cors())
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})
app.get("/",(req,res)=>{
  res.send("idm dashboard api")
})
app.get("/clients",(req,res)=>{
  connect.query("SELECT * FROM client",(err,rows,fields)=>{
      if(!err){
        res.send(rows)
      }else{
        console.log(err)
      }
  })
})

app.get("/names",(req,res)=>{
  connect.query("SELECT name FROM client",(err,rows,fields)=>{
      if(!err){
        res.send(rows)
      }else{
        console.log(err)
      }
  })
})


app.get("/clients/:id",(req,res)=>{
  connect.query("SELECT * FROM client WHERE id=?",[req.params.id],(err,rows,fields)=>{
      if(!err){
        res.send(rows)
      }else{
        console.log(err)
      }
  })
})

app.delete("/clients/:id",(req,res)=>{
  connect.query("DELETE  FROM client WHERE id=?",[req.params.id],(err,rows,fields)=>{
      if(!err){
        res.send("Deleted successfully")
      }else{
        console.log(err)
      }
  })
})


