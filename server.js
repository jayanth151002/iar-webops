const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
var nodemailer = require('nodemailer');
const bodyParser = require("body-parser")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.post("/send", (req, res) => {
    const { name, subject, msg } = req.body;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: '',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = {
        from: name,
        to: "",
        subject: subject,
        text: msg,
    };

    transporter.sendMail(info, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });

    res.render('disp.ejs')

})


app.listen(7000, () => {
    console.log("Port 7000");
})
