// portfolio-api/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const common = require('oci-common');
const secrets = require('oci-secrets');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS restricted to your production domain for security
app.use(cors({ origin: 'https://mistertuna.dev' }));
app.use(express.json());

// Initialize Oracle Cloud Auth (Instance Identity)
const provider = new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
const secretsClient = new secrets.SecretsClient({ authenticationDetailsProvider: provider });

let transporter;

async function fetchPasswordFromVault() {
    try {
        console.log("Fetching credentials from Oracle Vault...");
        const response = await secretsClient.getSecretBundle({
            secretId: process.env.PASSWORD_SECRET_OCID
        });
        const base64Content = response.secretBundle.secretBundleContent.content;
        return Buffer.from(base64Content, 'base64').toString('utf8');
    } catch (error) {
        console.error("CRITICAL: Vault access failed.", error);
        process.exit(1);
    }
}

async function initializeServer() {
    const ionosPassword = await fetchPasswordFromVault();

    transporter = nodemailer.createTransport({
        host: 'smtp.ionos.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.IONOS_EMAIL,
            pass: ionosPassword
        }
    });

    console.log("Mail transporter ready.");

    app.post('/api/contact', async (req, res) => {
        const { name, email, message, isClient, projectType } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const mailOptions = {
                from: `"${name}" <${process.env.IONOS_EMAIL}>`,
                replyTo: email,
                to: process.env.RECEIVER_EMAIL,
                subject: `New Transmission from ${name}`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Prospective Client:</strong> ${isClient ? 'YES' : 'NO'}</p>
                    ${isClient ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
                    <hr />
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('SMTP ERROR:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    });

    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

initializeServer();