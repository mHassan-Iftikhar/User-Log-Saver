import express from 'express'
import path from 'path'
import { User } from './models/user.models.js'
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extented: true}));
app.use(express.static(path.join('public')));

app.get('/', async (req, res) => {
    let users = await User.find()
    res.render("index", {users});
});

app.get('/read', async (req, res) => {
    const users = await User.find();
    res.render("read", { users });
});

app.get('/edit', (req, res) => {
    res.render("edit");
});

app.get('/delete', (req, res) => {
    res.render("delete");
});

app.post('/create', async (req, res) => {
    // Destructuring
    let {name, email, image} = req.body;
    let createdUser = await User.create({
        name,
        email,
        image,
    }); 
    res.send(createdUser);  
});

app.listen(3000);