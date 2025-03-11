import nodemailer from "nodemailer";
import "dotenv/config";
// import customerModel from "../models/customerModel.js";
import mongoose from "mongoose";

const sendMail = async (req, res) => {
  const { userMail, name } = req.body;

  console.log(userMail, name);
  let randomOtp = Math.floor(100000 + Math.random() * 900000);
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
      user: process.env.admin_Mail, // Your email address
      pass: process.env.mail_password, // Your email password
    },
  });

  // Step 2: Define the email options
  const mailOptions = {
    from: process.env.admin_Mail, // Sender address
    to: userMail, // List of recipients
    subject: "Email Verification Mail from KnotPerfect ", // Subject line
    text: "Hello! This is a email verification mail sent from KnotPerfect.", // Plain text body
    html: `<b>Hello ${name}!</b> 
           <p>This is a email verifivation mail sent from <i>KnotPerfect</i> to verify the user </p>. 
           <p>This is your verification Code :- ${randomOtp} </p>`, // HTML body
  };

  // Step 3: Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "mail verification failed" });
    } else {
      res.status(200).send({ mailOtp: randomOtp });
    }
  });

  //   let customerId = new mongoose.Types.ObjectId(req.params.customerId);
  //   await customerModel.findByIdAndUpdate(
  //     customerId,
  //     { $set: { mailOtp: randomOtp } },
  //     { new: true }
  //   );

};

export default sendMail;
