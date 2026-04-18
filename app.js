const express = require('express');
const app = express();


const usermodel = require('./usermodel');


app.get('/', (req, res) => {
  res.send("Hello World");
});


//create user
app.get('/create', async (req, res) => {  //mongoose related all code will ber asynchonous
  const createduser = await usermodel.create({
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com"
})
console.log("User created"); //this will run first because of synchonous code

res.send(createduser); 
});


//update user
app.get('/update', async (req, res) => {  //mongoose related all code will ber asynchonous

  const updateduser = await usermodel.findOneAndUpdate( //(filter, update, options)
    {username: "johndoe"}, 
    {name: "John Doe Updated"}, 
    { new: true });

  console.log("User updated"); //this will run first because of synchonous code

  res.send(updateduser);
});


//read user
app.get('/read', async (req, res) => {  
let users = await usermodel.find(); //find will give array[]. findone will give object{}.
res.send(users);
});

//delete user
app.get('/delete', async (req, res) => {  
let users = await usermodel.findOneAndDelete({username: "johndoe"}); 
res.send(users);
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});