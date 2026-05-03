// portfolio-api/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const common = require('oci-common');
const secrets = require('oci-secrets');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Set up Oracle Cloud Authentication using the Server's Instance Identity
const provider = new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
const secretsClient = new secrets.SecretsClient({ authenticationDetailsProvider: provider });

let transporter;

// Function to fetch and decrypt the password from Oracle Vault
async function fetchPasswordFromVault() {
    try {
        console.log("Fetching secure credentials from Oracle Vault...");
        const response = await secretsClient.getSecretBundle({
            secretId: process.env.PASSWORD_SECRET_OCID
        });

        // Oracle returns secrets as Base64 encoded strings, so we decode it here
        const base64Content = response.secretBundle.secretBundleContent.content;
        return Buffer.from(base64Content, 'base64').toString('utf8');
    } catch (error) {
        console.error("CRITICAL: Failed to fetch secret from Oracle Vault.", error);
        process.exit(1); // Kill the server if it can't get the password
    }
}

// Initialize the Server
async function initializeServer() {
    // 1. Fetch the password securely into memory
    const ionosPassword = await fetchPasswordFromVault();

    // 2. Initialize Nodemailer with the fetched password
    transporter = nodemailer.createTransport({
        host: 'smtp.ionos.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.IONOS_EMAIL,
            pass: ionosPassword // <--- Securely injected from memory!
        }
    });

    console.log("Mail transporter initialized successfully.");

    // 3. Start listening for incoming React form submissions
    app.listen(PORT, () => {
        console.log(`Portfolio API running securely on port ${PORT}`);
    });
}

// The API Endpoint
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
            subject: `New Transmission from ${name} [Portfolio]`,
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
        console.log(`Success: Email sent from ${name}`);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Email failed to send:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Boot up
initializeServer();