const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/taskdb', {useNewUrlParser: true, useUnifiedTopology:true});
app.use(express.json());
app.use(express.static(__dirname + "/public/dist/public"));

const TaskSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, default: ""},
    completed: {type: Boolean, default:false},
},{timestamps:true})

const Task = mongoose.model('tasks', TaskSchema);

app.get('/tasks', (req,res) =>{
    Task.find()
        .then(data => res.json({message:"success", tasks:data}))
        .catch(err => res.json(err))
})

app.get('/tasks/:id', (req,res) => {
    Task.find({_id:req.params.id})
        .then(data => res.json({message:"success", task:data}))
        .catch(err => res.json(err))
})

app.post('/tasks/', (req,res) => {
    const newTask = req.body;
    Task.create(newTask)
        .then(newTask => res.json(newTask))
        .catch(err => res.json(err))
})

app.put('/tasks/:id', (req,res) => {
    User.updateOne({_id:req.params.id}, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    }, {runValidators: true})
        .then(updated => res.json(updated))
        .catch(err => res.json(err))
})

app.delete('/tasks/:id', (req,res) => {
    User.remove({_id:req.body.id})
        .then(removed => res.json(removed))
        .catch(err => res.json(err))
})

app.listen(8000, () => console.log("listening on port 8000"));
