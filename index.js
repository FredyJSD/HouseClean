import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from 'fs/promises';
import nodemailer from 'nodemailer'

const app = express();
// const port = 3000;
const port = process.env.PORT || 3000; //Heroku


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fredy0113@gmail.com', // Your email
      pass: 'bchf vfyp yaeo zvle'         // Your password
    }
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/services", async (req, res) => {
    res.render("services.ejs");
});

app.get("/contact", async (req, res) => {
    res.render("contact.ejs");
});

app.get("/gallery", async (req, res) => {
    res.render("gallery.ejs");
});

app.get("/about", async (req, res) => {
    res.render("about.ejs");
});

app.get("/book", async (req, res) => {
    res.render("book.ejs");
});

app.post("/submit-form", async (req, res) =>{
    console.log(req.body);
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const userEmail = req.body.uEmail;
    const userMessage = req.body.message;

    const mailOptions = {
        from: 'fredy0113@gmail.com', // Sender address
        to: 'fredy0113@gmail.com',  // List of recipients
        subject: 'New Contact Form Submission', // Subject line
        text: `You have a new submission from: 
           Name: ${firstName} ${lastName}
           Email: ${userEmail}
           Message: ${userMessage}` // Plain text body
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
          res.send('Error occurred');
        } else {
          console.log(info);
          res.send('Success!');
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
