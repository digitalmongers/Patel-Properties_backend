const http = require('http');

console.log('Testing Health...');
http.get('http://localhost:5000/api/v1/health', (res) => {
    console.log(`Health Status: ${res.statusCode}`);

    console.log('\nTesting Contact Validation...');
    const postData = JSON.stringify({
        name: '', // Invalid name
        email: 'invalid-email',
    });

    const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/contact',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    }, (res2) => {
        console.log(`Contact Status: ${res2.statusCode}`);
        let data = '';
        res2.on('data', d => data += d);
        res2.on('end', () => console.log(`Contact Body: ${data}`));
    });

    req.write(postData);
    req.end();
});
