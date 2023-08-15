const express = require('express');
const app = express();

app.set('view engine', 'ejs');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

