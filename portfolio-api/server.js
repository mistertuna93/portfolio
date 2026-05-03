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
        const ionosPassword = Buffer.from(base64Content, 'base64').toString('utf8');

        // IONOS SMTP Configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 587,
            secure: false, // Must be false for 587
            auth: {
                user: process.env.IONOS_EMAIL,
                pass: ionosPassword
            },
            tls: {
                rejectUnauthorized: true
            }
        });

        await transporter.verify();
        console.log("SMTP Connection Verified with IONOS.");

        app.post('/api/contact', async (req, res) => {
            const { name, email, message, isClient, projectType } = req.body;

            try {
                const info = await transporter.sendMail({
                    // What the user sees in the inbox
                    from: `"${name} (Portfolio)" <${process.env.IONOS_EMAIL}>`,

                    // The strict envelope to bypass IONOS outbound spam filters
                    envelope: {
                        from: process.env.IONOS_EMAIL,
                        to: process.env.RECEIVER_EMAIL
                    },

                    to: process.env.RECEIVER_EMAIL,
                    replyTo: email,

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

                console.log("Message accepted by IONOS:", info.messageId);
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