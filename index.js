const app = require('./app');

const PORT = 4000;

// ---
// Server
// ------------------------
app.listen(PORT, () => {
    console.log('---');
    console.log(`Server running on port: ${PORT}`);
    console.log('----------------------------------');
});
