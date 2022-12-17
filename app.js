const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const { post } = require('request');

const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// SignUp Route
app.post('/signup', (req, res) => {
    const {firstName, lastName, email} = req.body;

    // Make sure fields are filled
    if(!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }
    // construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const postData = JSON.stringify(data);
    const options = {
        url: 'https://us21.api.mailchimp.com/3.0/lists/7072f42515-us21',
        method: 'POST',
        headers: {
            Authorization: 'auth ea4e0ddbb4e579da9f7b97a2f066d1a3-us21'
        },
        body: postData
    }
    request(options, (err, response, body) =>{
        if (err) {
            res.redirect('/fail.html');
        } else{
            if (response, statusCode === 200){
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
        }

    });
    
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`))