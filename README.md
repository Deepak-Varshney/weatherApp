Weather Forecast Application
============================

Overview
--------

This weather forecast application was developed as part of the Full Stack Web Development course on Internshala. The application allows users to view current weather conditions and extended forecasts based on either city names or their current location. The interface is designed to be user-friendly and responsive, using Tailwind CSS for styling and the OpenWeatherMap API for weather data.

Features
--------

-   **Current Weather**: Displays temperature, humidity, and wind speed for a given city or the user's current location.
-   **Extended Forecast**: Shows a 5-day weather forecast with details for each day.
-   **Recent Searches**: Users can access and select recently searched cities from a dropdown menu.
-   **Responsive Design**: Adaptable layout for desktop, tablet, and mobile screens.

Technologies Used
-----------------

-   **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
-   **Backend**: Not applicable (the project uses the OpenWeatherMap API for data)
-   **API**: [OpenWeatherMap](https://openweathermap.org/)

Setup
-----

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari, Edge)
-   An internet connection to access the weather API

### Installation

1.  **Clone the Repository**:

    bash

    Copy code

    `git clone https://github.com/Deepak-Varshney/weatherApp.git
    cd weatherApp`

2.  **Open the Application**: Open the `index.html` file in a web browser:

    bash

    Copy code

    `open index.html`

3.  **Configuration**:

    -   **API Key**: Obtain an API key from OpenWeatherMap and replace `'YOUR_API_KEY'` in `script.js` with your key.

### File Structure

-   `index.html`: The main HTML file containing the structure of the application.
-   `styles.css`: Custom CSS styles; Tailwind CSS is included via CDN.
-   `script.js`: JavaScript file handling the application logic and API interactions.
-   `images/`: Directory for weather icons used to represent different weather conditions.

Usage
-----

### Search by City

Enter a city name into the search bar and click the search icon or press Enter to retrieve the weather data.

### Use Current Location

Click the "Use Current Location" button to get weather data based on your current location (browser location permissions required).

### Access Recent Searches

Click the "Recent Searches" button to view and select from the list of recently searched cities.

Development
-----------

-   **Modify API Key**: Ensure you replace `'YOUR_API_KEY'` in `script.js` with your actual OpenWeatherMap API key.
-   **Update Weather Icons**: Add or modify weather icons in the `images/` directory as needed.

Error Handling
--------------

-   **No City Found**: Displays an error message if the city entered is not found.
-   **API Errors**: Handles and displays errors related to API fetch failures.

Contribution
------------

Contributions are welcome! If you have suggestions for improvements or find bugs, please fork the repository and submit a pull request.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

Author
------

Developed by Deepak Varshney as part of the Internshala Full Stack Web Development course.

Acknowledgements
----------------

-   **OpenWeatherMap** for providing the weather data API.
-   **Tailwind CSS** for its utility-first CSS framework.

Contact
-------

For any questions or feedback, please contact Deepak Varshney.
