const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS
// Enable CORS
app.use(function(req, res, next) {
    const allowedOrigins = ['https://hayatriya.github.io']; // Add other origins as needed
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


// Mock user data
const users = [
    { id: 1, name: 'admin', email: 'admin@example.com', password: 'admin', apiKey: '123456' },
    { id: 2, name: 'jaddu', email: 'qwert@example.com', password: 'password2', apiKey: 'abcdef' },
    { id: 3, name: 'riya', email: 'asdf@example.com', password: 'password3', apiKey: 'abcdef' },
    { id: 4, name: 'hayat', email: 'hayat@example.com', password: 'password4', apiKey: 'abcdef' },
    { id: 5, name: 'nk', email: 'nk@example.com', password: 'password5', apiKey: 'abcdef' }
];

app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        const token = req.headers.authorization;
        if (!token || token !== 'Bearer ' + user.password) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                apiKey: user.apiKey
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
