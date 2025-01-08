const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Cambia al puerto que uses en tu servidor

// Configurar body-parser para recibir JSON
app.use(bodyParser.json());

// Endpoint para recibir notificaciones de Mercado Pago
app.post('/endpoint', (req, res) => {
    const secret = "9b38902e9a9432448295aabcba7b2133b7f3f496aeb2f522f8f4438ab089ff8f";

    // Verificar la clave secreta
    const receivedSecret = req.headers['x-webhook-secret']; // Mercado Pago envía esto
    if (receivedSecret !== secret) {
        console.log('Clave secreta inválida');
        return res.status(403).send('Forbidden'); // Rechaza la solicitud
    }

    // Procesar el cuerpo del webhook
    const data = req.body;
    console.log('Datos recibidos del webhook:', data);

    // Responde a Mercado Pago que la notificación fue recibida
    res.sendStatus(200);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/endpoint`);
});
