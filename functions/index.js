/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require('firebase-functions')
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express')
const cors = require('cors');
const { getAutocompleteUtilityClass } = require("@mui/material");
const stripe = require('stripe')('sk_test_51P64IsSIH6dvveagvyayyFpdAEGrS1qgtv1rgF6Kn8JUbjuOh0OkySwVOBwdpL6osHyyHouVOwNNuZJH7WzV9Avx00LfnAYJrB')


//app config 

const app = express()

//middleware
app.use(cors({ origin: true }))
app.use(express.json())

//api routes
app.get('/', (req, res) =>{
    res.status(200).send('Hello World')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total

    console.log('Payment Request Recieved for this amount : ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

/* http://127.0.0.1:5001/ama-clone-99e82/us-central1/api */
//listen command

exports.api = functions.https.onRequest(app)