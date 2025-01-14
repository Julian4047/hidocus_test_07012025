const crypto = require('crypto');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Obtain headers from the request
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) {
        return res.status(400).json({ error: 'Missing required headers' });
    }

    // Obtain the data.id from the body or query parameters
    const dataID = req.query['data.id'] || req.body?.['data.id'];

    if (!dataID) {
        return res.status(400).json({ error: 'Missing data.id' });
    }

    // Separate the x-signature into parts
    const parts = xSignature.split(',');

    // Initialize variables to store ts and hash
    let ts;
    let hash;

    // Iterate over the values to obtain ts and v1
    parts.forEach((part) => {
        const [key, value] = part.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'ts') {
                ts = trimmedValue;
            } else if (trimmedKey === 'v1') {
                hash = trimmedValue;
            }
        }
    });

    if (!ts || !hash) {
        return res.status(400).json({ error: 'Invalid x-signature format' });
    }

    // Secret key for HMAC
    const secret = '9b38902e9a9432448295aabcba7b2133b7f3f496aeb2f522f8f4438ab089ff8f';

    // Generate the manifest string
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);

    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest('hex');

    if (sha === hash) {
        // HMAC verification passed
        return res.status(200).json({ message: 'HMAC verification passed' });
    } else {
        // HMAC verification failed
        return res.status(403).json({ error: 'HMAC verification failed' });
    }
}