const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS
// Enable CORS
app.use(function(req, res, next) {
    const allowedOrigins = ['https://hayatriya.github.io', 'http://localhost:3000']; // Add other origins as needed
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
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password1', apiKey: '123456' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password2', apiKey: 'abcdef' }
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
