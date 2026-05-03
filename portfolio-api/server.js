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
            port: 465,
            secure: true,
            auth: {
                user: process.env.IONOS_EMAIL,
                pass: ionosPassword
            }
        });

        // Test the transporter on boot
        await transporter.verify();
        console.log("SMTP Connection Verified.");

        app.post('/api/contact', async (req, res) => {
            const { name, email, message, isClient, projectType } = req.body;
            try {
                await transporter.sendMail({
                    from: `"${name}" <${process.env.IONOS_EMAIL}>`,
                    replyTo: email,
                    to: process.env.RECEIVER_EMAIL,
                    subject: `New Transmission: ${name}`,
                    html: `
                        <h3>Contact Form Submission</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Client:</strong> ${isClient ? 'Yes' : 'No'}</p>
                        <p><strong>Project:</strong> ${projectType}</p>
                        <hr/><p>${message}</p>`
                });
                res.status(200).json({ success: true });
            } catch (err) {
                console.error("Mail Error:", err);
                res.status(500).json({ error: "Failed to send email" });
            }
        });

        app.listen(PORT, () => console.log(`API Listening on Port ${PORT}`));

    } catch (err) {
        console.error("CRITICAL INITIALIZATION ERROR:", err);
        // If it fails, keep retrying or check your IAM policies
        process.exit(1);
    }
}

initializeServer();