import { Resend } from "resend";
import jsxToString from 'jsx-to-string';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, subject, message } = req.body;
    console.log(email, subject, message);

    const emailBody = (
      <div>
        <h1>{subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>{message}</p>
      </div>
    );

    const emailBodyString = jsxToString(emailBody);

    const data = await resend.emails.send({
      from: fromEmail,
      to: 'gachray@gmail.com', // Replace with the desired email address
      subject: subject,
      body: emailBodyString,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}