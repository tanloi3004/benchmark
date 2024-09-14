const express = require('express');
const app = express();
const port = 3000;

app.set('etag', false);
app.use((req, res, next) => {
    // Remove headers not needed
    res.removeHeader('X-Powered-By');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('Cross-Origin-Opener-Policy');
    res.removeHeader('Cross-Origin-Resource-Policy');
    res.removeHeader('Origin-Agent-Cluster');
    res.removeHeader('Referrer-Policy');
    res.removeHeader('Strict-Transport-Security');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('X-DNS-Prefetch-Control');
    res.removeHeader('X-Download-Options');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('X-Permitted-Cross-Domain-Policies');
    res.removeHeader('X-XSS-Protection');
    res.removeHeader('ETag'); // Optional, remove if you don't need caching
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');
    res.removeHeader('Content-Type');
    next();
});
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
