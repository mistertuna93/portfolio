// /var/www/mistertuna.dev/portfolio-api/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const common = require('oci-common');
const secrets = require('oci-secrets');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'https://mistertuna.dev' }));
app.use(express.json());

async function initializeServer() {
    try {
        console.log("Initializing OCI Instance Principal Provider...");

        const provider = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
        const secretsClient = new secrets.SecretsClient({
            authenticationDetailsProvider: provider
        });

        console.log("Fetching credentials from Oracle Vault...");
        const secretResponse = await secretsClient.getSecretBundle({
            secretId: process.env.PASSWORD_SECRET_OCID
        });

        const base64Content = secretResponse.secretBundle.secretBundleContent.content;
        // This is now your Gmail App Password
        const vaultPassword = Buffer.from(base64Content, 'base64').toString('utf8');

        // Nodemailer has a built-in Gmail preset, making this very clean
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: vaultPassword
            }
        });

        await transporter.verify();
        console.log("SMTP Connection Verified with Gmail.");

        app.post('/api/contact', async (req, res) => {
            const { name, email, message, isClient, projectType } = req.body;

            try {
                const info = await transporter.sendMail({
                    // Must be the Gmail account doing the sending
                    from: process.env.GMAIL_USER,

                    // Sending TO your professional IONOS email
                    to: process.env.RECEIVER_EMAIL,

                    // So you can easily hit "Reply" in IONOS and talk to the user
                    replyTo: `"${name}" <${email}>`,

                    subject: `Portfolio Transmission: ${name}`,
                    text: `New message from ${name} (${email})\nClient: ${isClient ? 'Yes' : 'No'}\nProject: ${projectType}\n\nMessage: ${message}`,
                    html: `
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Prospective Client:</strong> ${isClient ? 'Yes' : 'No'}</p>
                        <p><strong>Project Type:</strong> ${projectType}</p>
                        <hr/>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>`
                });

                console.log("Message accepted by Gmail:", info.messageId);
                res.status(200).json({ success: true });
            } catch (err) {
                console.error("CRITICAL SMTP SEND ERROR:", err);
                res.status(500).json({
                    error: "Failed to send email",
                    details: err.message
                });
            }
        });

        app.listen(PORT, () => console.log(`API Listening on Port ${PORT}`));

    } catch (err) {
        console.error("CRITICAL INITIALIZATION ERROR:", err);
        process.exit(1);
    }
}

initializeServer();