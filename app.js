if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const initializePassport = require('./config-passport');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []; //efoson den theloume na xrhsimopoihsoume DB

app.set('view-engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ exnteded: false }));
app.use(flash());
app.use(session({
    secret: 'test', //secret key
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true //na emfanizei minima sthn othoni
}));

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register')
    }
    console.log(users);
});

app.delete('/logout', (req, res) => {
    req.logOut(); //kanei clear to session kai mas loggarei off
    res.redirect('/login');
});

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
};

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next();
}

app.listen(port, () =>
console.log("to app anoikse sto port 3000"));