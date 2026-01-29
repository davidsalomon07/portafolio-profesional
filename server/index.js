const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- CONEXIÓN BASE DE DATOS ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- CONFIGURACIÓN CORREO (BREVO) ---
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// --- RUTAS ---

app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // --- 🛡️ ZONA DE SEGURIDAD (VALIDACIONES) ---
  
  // 1. Validar que no lleguen campos vacíos
  if (!name || !email || !message) {
    console.warn("⚠️ Intento de envío con datos vacíos");
    return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios' });
  }

  // 2. Validar formato básico de email (debe tener @ y .)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn(`⚠️ Email inválido detectado: ${email}`);
    return res.status(400).json({ status: 'error', message: 'Email inválido' });
  }
  
  // ---------------------------------------------

  try {
    console.log(`📨 Procesando mensaje de: ${name}`);
    
    const mailOptions = {
      from: "david.salomon0711@outlook.com", // Tu remitente verificado
      to: "david.salomon0711@outlook.com",   // Tu bandeja de entrada
      subject: `📢 Portafolio: Mensaje de ${name}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>De:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #0078d4;">${message}</blockquote>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente con Brevo");
    res.status(200).json({ status: 'success' });

  } catch (error) {
    console.error("❌ Error enviando:", error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor listo en http://localhost:${port}`);
});