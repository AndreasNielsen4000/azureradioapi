const bodyParser = require('body-parser');
const express = require('express')
const RadioBrowser = require('radio-browser');
const app = express();
const port = process.env.PORT || 3000;

// Use Node.js body parsing middleware 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));

const urlPlaying = [
    {
        url: "",
        name: ""
    }
]

// GET method route
app.get('/', (request, response) => {
    response.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Simple Website</title>
            </head>
            <body>
                <h1>Node.js and Express REST API</h1>
                <p>Welcome to my simple website built with Node.js and Express!</p>
                <h2>Available APIs:</h2>
                <ul>
                    <li><a href="/users">/users</a></li>
                    <li><a href="/radio?searchterm=rock">/radio?searchterm=rock</a></li>
                    <li><a href="/radio/top">/radio/top</a></li>
                    <!-- Add more API endpoints here -->
                </ul>
            </body>
        </html>
    `);
});

//Get users
app.get('/users', (request, response) => {
    response.send(users);
});

// Start the server 
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});


const users = [
    {
      id: 1,
      name: "Richard Hendricks",
      email: "richard@piedpiper.com",
    },
    {
      id: 2,
      name: "Bertram Gilfoyle",
      email: "gilfoyle@piedpiper.com",
    },
];

// Get radio stations by name
app.get('/radio', async (request, response) => {
    try {
        let filter = {
            by: 'name', // stations by tag,
            searchterm: request.query.searchterm,
            limit: 25
        }
        console.log('Filter:', filter);
        const stations = await RadioBrowser.getStations(filter);
        console.log('Stations:', stations);
        response.send(stations);
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        response.status(500).send('An error occurred while fetching radio stations.');
    }
});

// Get top 5 radio stations by click count
app.get('/radio/top', async (request, response) => {
    try {
        let filter = {
            by: 'topclick', // stations by topvote
            limit: 5    // top 5 stations
        }
        console.log('Filter:', filter);
        const stations = await RadioBrowser.getStations(filter);
        console.log('Stations:', stations);
        response.send(stations);
    } catch (error) {
        console.error('Error fetching top radio stations:', error);
        response.status(500).send('An error occurred while fetching top radio stations.');
    }
});

// Post radio station URL
app.post('/radio/play', async (request, response) => {
    try {
        urlPlaying[0].url = request.body.url;
        urlPlaying[0].name = request.body.name;
        response.send(urlPlaying);
    } catch (error) {
        console.error(error);
        response.status(500).send('An error occurred while posting playing radio station.');
    }
});

// Get radio station URL
app.get('/radio/play', async (request, response) => {
    try {
        response.send(urlPlaying);
    } catch (error) {
        console.error(error);
        response.status(500).send('An error occurred while fetching playing radio station.');
    }
});