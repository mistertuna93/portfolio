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

        // Use the Async Builder - This is the fix for the getPassphrase error
        const provider = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();

        const secretsClient = new secrets.SecretsClient({
            authenticationDetailsProvider: provider
        });

        console.log("Fetching secret from Vault...");
        const secretResponse = await secretsClient.getSecretBundle({
            secretId: process.env.PASSWORD_SECRET_OCID
        });

        const base64Content = secretResponse.secretBundle.secretBundleContent.content;
        const ionosPassword = Buffer.from(base64Content, 'base64').toString('utf8');

        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 587,
            secure: false, // false for 587 (STARTTLS)
            auth: {
                user: process.env.IONOS_EMAIL,
                pass: ionosPassword
            },
            tls: {
                // Helps prevent handshake failures on some Linux distributions
                rejectUnauthorized: true
            }
        });

        // Test the transporter on boot
        await transporter.verify();
        console.log("SMTP Connection Verified.");

        app.post('/api/contact', async (req, res) => {
            const { name, email, message, isClient, projectType } = req.body;

            try {
                const info = await transporter.sendMail({
                    // IONOS requirement: The 'from' MUST be exactly your authenticated email
                    from: process.env.IONOS_EMAIL,

                    // This allows you to see the sender's name and hit reply in your inbox
                    replyTo: `"${name}" <${email}>`,

                    to: process.env.RECEIVER_EMAIL,
                    subject: `Portfolio Transmission: ${name}`,
                    html: `
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Sender:</strong> ${name} (${email})</p>
                        <p><strong>Prospective Client:</strong> ${isClient ? 'Yes' : 'No'}</p>
                        <p><strong>Project Category:</strong> ${projectType}</p>
                        <hr/>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>`
                });

                // Detailed success log for PM2
                console.log("Email Accepted by IONOS:", info.messageId);
                console.log("SMTP Response:", info.response);

                res.status(200).json({ success: true });
            } catch (err) {
                // Detailed error log for PM2
                console.error("SMTP SEND ERROR:", err);
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