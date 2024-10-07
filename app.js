const express =require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const friend=require('./modal/Friends')

mongoose.connect('mongodb://localhost:27017/naitikkherala')
.then((res)=>{
    console.log("conect sucses");
})
.catch((er)=>{
console.log(er);

})

app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    const alldata=await friend.find()
    res.render('index',{alldata})
})

app.post('/createdata',async(req,res)=>{
    console.log(req.body);
    const data =req.body
    await friend.create(data)

    res.redirect('/')
    
})

app.listen(8070)