const express = require('express');

const app = express();

const db = require('./db/index');
db;

app.use(express.json());

const customerRoute = require('./routes/customer.route');
const itemRoute = require('./routes/item.route');

const port = process.env.PORT || 4001;

app.get('/', (req, res) => {
  res.send('Online Shopping Store, Bring your item ideas, we love you all 😍');
});

app.use('/api/v1', customerRoute);
app.use('/api/v1', itemRoute);

app.listen(port, () => {
  console.log(`The app is listen on PORT ${port}`);
});
