const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Friends = require('./modal/Friends')

mongoose.connect('mongodb://localhost:27017/naitikkherala')
    .then((res) => {
        console.log("conect sucses");
    })
    .catch((er) => {
        console.log(er);

    })

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const alldata = await Friends.find()
    res.render('index', { alldata, editdata: null })
})

app.post('/createdata', async (req, res) => {
    console.log(req.body);
    const data = req.body

    if (data.id!="") {
       
        await Friends.findByIdAndUpdate(data.id, data);
        console.log('Updated:', data);
    } else {
        
        await Friends.create(data);
        console.log('Created:', data);
    }

    res.redirect('/');


})
app.get('/deletedata', async (req, res) => {
    const Did = req.query.delet;
    await Friends.findByIdAndDelete(Did);
    console.log(Did);
    res.redirect('/');

})

app.get('/editdata', async (req, res) => {
    const editId = req.query.up;
    const editdata = await Friends.findById(editId);
    const alldata = await Friends.find();
    res.render('index', { editdata, alldata });
})

app.listen(8070)