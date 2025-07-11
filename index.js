import express from 'express'
import path from 'path'
import { User } from './models/user.models.js'
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extented: true}));
app.use(express.static(path.join('public')));

app.get('/', async (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    const users = await User.find();
    res.render("read", { users });
});

app.get('/edit/:userID', async (req, res) => {
    let user = await User.findOne({_id: req.params.userID});
    res.render("edit", {user});
});

app.get('/delete/:userID', async (req, res) => {
    let user = await User.findOneAndDelete({_id: req.params.userID});
    res.redirect("/read");
});

app.post('/create', async (req, res) => {
    // Destructuring
    let {name, email, image} = req.body;
    let createdUser = await User.create({
        name,
        email,
        image,
    }); 
    res.redirect("/read");
});

app.post('/update/:userID', async (req, res) => {
    let {name, email, image} = req.body;
    let user = await User.findOneAndUpdate({_id: req.params.userID}, {name, email, image}, {new: true});
    res.redirect("/read");
});

app.listen(3000);