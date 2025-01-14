const express = require('express');
const MercadoPago = require('mercadopago');

const app = express();
app.use(express.json());

// Configura tu Access Token
MercadoPago.configurations.setAccessToken('APP_USR-433181075802852-010718-b25f64e415072f70a2e53746c68b4310-209573077');

app.post('/crear-preferencia', async (req, res) => {
    try {
        const preference = await MercadoPago.preferences.create({
            items: [
                {
                    title: req.body.title,
                    unit_price: req.body.unit_price,
                    quantity: req.body.quantity,
                }
            ],
            back_urls: {
                success: 'https://hidocus.vercel.app/exito',
                failure: 'https://hidocus.vercel.app/error',
                pending: 'https://hidocus.vercel.app/pendiente',
            },
            auto_return: 'approved',
        });
        res.json(preference);
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).send('Error interno');
    }
});

// Exporta la app para que Vercel la reconozca
module.exports = app;
