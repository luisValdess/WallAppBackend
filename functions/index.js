const functions = require("firebase-functions");
const admin = require("firestore-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "email@gmail.com",
    pass: "password",
  },
});

const mailOptions = {
  from: "email@gmail.com",
  to: "destinatation_email@ejemplo.com",
  subject: "Subject",
  text: "Body",
};

exports.onUserCreate = functions.firestore
  .document("users/{id}")
  .onCreate((snap, context) => {
    //send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
