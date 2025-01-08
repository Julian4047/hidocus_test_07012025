export default async function handler(req, res) {
    const secret = "9b38902e9a9432448295aabcba7b2133b7f3f496aeb2f522f8f4438ab089ff8f";

    if (req.method !== 'POST') {
        return res.status(405).send('Método no permitido');
    }

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
    res.status(200).send('OK');
}
