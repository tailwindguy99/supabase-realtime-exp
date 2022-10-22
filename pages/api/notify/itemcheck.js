import { supabase } from "../../../utils/supabaseClient";
import nodemailer from "nodemailer";


export default async function handler(req, res) {
  const { data: items, error } = await supabase.from("items").select();
  if(items) {
    // TODO: 
    // 1. loop through every user buy intent keywords
    // 2. if items name/description/ etc.. contains intent keywords
    // 3. send email notification
    console.log(items);
    await sendEmailNotif();
    res.status(200).json(items);
  } else {
    res.status(500).json(error);
  }
}

async function sendEmailNotif() {

  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'garrick.von@ethereal.email',
          pass: 'et2fDJX5t7dcpFkmJf'
      }
  });

  console.log("1");
    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Item xyz receive a new message!',
        // text: 'Hello to myself!',
        html: '<p>John has send you a message regarding ...</p>'
    };
    console.log("2");
    console.log(transporter);
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log("3");
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    console.log("4");

});
}