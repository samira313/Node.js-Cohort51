import app from './app.js';

const PORT = 3000;

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
});