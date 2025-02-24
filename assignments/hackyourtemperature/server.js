const app = require('./app.js');

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`Server is runnig on port ${PORT}`);
});