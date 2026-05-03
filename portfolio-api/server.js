// /var/www/mistertuna.dev/portfolio-api/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const common = require('oci-common');
const secrets = require('oci-secrets');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS restricted to your production domain
app.use(cors({ origin: 'https://mistertuna.dev' }));
app.use(express.json());

async function initializeServer() {
    try {
        console.log("Initializing OCI Instance Principal Provider...");

        // Build provider asynchronously to ensure internal methods are populated
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

        // IONOS recommended settings: Port 587 with STARTTLS
        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.IONOS_EMAIL,
                pass: ionosPassword
            },
            tls: {
                // Critical for reliability on some Linux environments
                rejectUnauthorized: true,
                minVersion: 'TLSv1.2'
            }
        });

        // Verify SMTP connection on startup
        await transporter.verify();
        console.log("SMTP Connection Verified.");

        app.post('/api/contact', async (req, res) => {
            const { name, email, message, isClient, projectType } = req.body;

            try {
                const info = await transporter.sendMail({
                    // 1. The 'from' header (what the user sees)
                    from: `"${name}" <${process.env.IONOS_EMAIL}>`,

                    // 2. The 'envelope' (the actual sender IONOS checks for auth)
                    envelope: {
                        from: process.env.IONOS_EMAIL,
                        to: process.env.RECEIVER_EMAIL
                    },

                    to: process.env.RECEIVER_EMAIL,
                    replyTo: email,
                    subject: `Contact: ${name}`,
                    text: `Message from ${name} (${email}): ${message}`,
                    html: `<p><strong>Name:</strong> ${name}</p><p>${message}</p>`
                });

                console.log("Message accepted by IONOS:", info.messageId);
                console.log("Full SMTP Response:", info.response);

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