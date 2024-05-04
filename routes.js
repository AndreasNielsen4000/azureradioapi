/*
    This file contains the routes for the application. 
    It defines the routes for the home page, about page, API page, and radio stations.
    It also contains the routes for getting users, top radio stations, and playing a radio station.
    This is where we have designed the API endpoints for the application, which is used to interact with the frontend and app. 
*/
const express = require('express');
const router = express.Router();
const RadioBrowser = require('radio-browser');

// Backend database to store the information from speaker device and what is playing
const backendDataBase = [
    {
        url: "",
        name: "",
        isPlaying: "false",
        deviceisPlaying: "",
        volume: "20",
        deviceVolume : "",
        batteryLevel : "",
        deviceMode : "",
        deviceDeviceMode : "",        
    }
];

// Test database for initial testing, not used
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


//Get users
router.get('/users', (request, response) => {
    response.send(users);
});

// GET method route
router.get('/', (request, response) => {
    response.render("index");
});

// About page route
router.get('/about', (request, response) => {
    response.render("about");
});

// API page route
router.get('/api', (request, response) => {
    response.render("api");
});

// Home page route
router.get('/home', (request, response) => {
    response.render("home");
});

// Get radio stations by name
router.get('/radio', async (request, response) => {
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
router.get('/radio/top', async (request, response) => {
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

// Get top 5 radio stations by click count in Denmark
router.get('/radio/top/dk', async (request, response) => {
    try {
        let filter = {
            order: 'clickcount', // stations by topvote
            country: 'Denmark', // stations in Denmark
            reverse: true,  // reverse order
            limit: 5    // top 5 stations
        }
        console.log('Filter:', filter);
        const stations = await RadioBrowser.searchStations(filter);
        console.log('Stations:', stations);
        response.send(stations);
    } catch (error) {
        console.error('Error fetching top radio stations:', error);
        response.status(500).send('An error occurred while fetching top radio stations.');
    }
});

// Post new information to backend database
router.post('/radio/play', async (request, response) => {
    try {
        if (request.body.url !== undefined) {
            backendDataBase[0].url = request.body.url;
            if (request.body.name === undefined) {
                let filter = {
                    by: 'url', // stations by url
                    searchterm: request.body.url,
                    limit: 1
                }
                try {
                    const stations = await RadioBrowser.getStations(filter);
                    if (stations.length > 0) {
                        backendDataBase[0].name = stations[0].name;
                    } else {
                        backendDataBase[0].name = "";
                    }
                } catch (error) {
                    console.error('Error fetching stations:', error);
                    backendDataBase[0].name = "";
                }
            }
        }
        if (request.body.name !== undefined) {
            backendDataBase[0].name = request.body.name;
        }
        if (request.body.isPlaying !== undefined) {
            backendDataBase[0].isPlaying = request.body.isPlaying;
        }
        if (request.body.deviceisPlaying !== undefined) {
            backendDataBase[0].deviceisPlaying = request.body.deviceisPlaying;
        }
        if (request.body.volume !== undefined) {
            backendDataBase[0].volume = request.body.volume;
        }
        if (request.body.deviceVolume !== undefined) {
            backendDataBase[0].deviceVolume = request.body.deviceVolume;
        }
        if (request.body.batteryLevel !== undefined) {
            backendDataBase[0].batteryLevel = request.body.batteryLevel;
        }
        if (request.body.deviceMode !== undefined) {
            backendDataBase[0].deviceMode = request.body.deviceMode;
        }
        if (request.body.deviceDeviceMode !== undefined) {
            backendDataBase[0].deviceDeviceMode = request.body.deviceDeviceMode;
        }
        console.log(backendDataBase);
        response.send(backendDataBase);
    } catch (error) {
        console.error(error);
        response.status(500).send('An error occurred while posting playing radio station.');
    }
});

// Get the information from backend database
router.get('/radio/play', async (request, response) => {
    try {
        response.send(backendDataBase);
    } catch (error) {
        console.error(error);
        response.status(500).send('An error occurred while fetching playing radio station.');
    }
});

module.exports = router;