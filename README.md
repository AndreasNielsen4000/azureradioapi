# Azure Radio API

## Concept

The Azure Radio API is a web application that provides a RESTful API for accessing radio station data. We will use the API to build a radio station directory that allows users to play radio stations from urls. The system will be hosted through an Azure Web App, where a front-end application will be hosted to interact with the API. The application is made for 34346 Networking technologies and application development for the Internet of Things (IoT) at DTU. The application is made for a speaker system that can play radio stations from the internet and the API will be used to fetch the radio stations. The Wep App can be access at `internetradioapi.azurewebsites.net`.

When accessing the Web App, the user is presented with the Welcome-page. Here the user can choose to go Home-page, API-screen or About-page. The Home-page is the main page of the application, where the user can type in URL of a radio station and play it, or control various things on the connected speaker unit. The API-screen is where the user can see the API-documentation and try out the API. The About-page is where the user can read about the application and the developers.

## Getting Started

To run the Azure Radio API locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/<your-username>/azureradioapi.git
    ```

2. Install the dependencies:

    ```bash
    cd azureradioapi
    npm install
    ```

4. Start the server:

    ```bash
    node app.js
    ```

5. Access the API:

    Once the server is running, you can access the API at `http://localhost:3000`.