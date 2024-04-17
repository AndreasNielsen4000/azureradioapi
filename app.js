const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const app = express();
var routes = require("./routes");
const port = process.env.PORT || 3000;

// Use Node.js body parsing middleware 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use('/', routes);

// Start the server 
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
