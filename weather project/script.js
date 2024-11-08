//http://api.weatherapi.com/v1/current.json?key=5c5d21fd72144d5897d113953240111&q=mumbai&aqi=no
const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location p:last-child"); // Selects the second p element for the date
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');
let target = "mumbai";

form.addEventListener('submit', searchForLocation);

const fetchResults = async () => {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=5c5d21fd72144d5897d113953240111&q=${target}&aqi=no`;
        const res = await fetch(url);
        const data = await res.json();

        // Extracting data from the response
        let locationName = data.location.name; 
        let localtime = data.location.localtime;
        let temperature = data.current.temp_c;
        let conditionText = data.current.condition.text;

        // Update HTML elements with fetched data
        updateDetails(temperature, locationName, localtime, conditionText);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim(); // Get input value and trim whitespace
    fetchResults(); // Fetch new results based on the updated target
}

function updateDetails(temp, locationName, time, condition) {
    // Split the date and time from the fetched localtime
    let [splitDate, splitTime] = time.split(' ');
    
    // Get the day name
    let currentDay = getDayName(new Date(splitDate).getDay());

    // Update the fields with formatted details
    temperatureField.innerText = `${temp} °C`;
    locationField.innerText = locationName;
    dateField.innerText = `${currentDay}, ${splitDate} ${splitTime}`;
    conditionField.innerText = condition;
}

// Function to get the day name from the day number
function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return '';
    }
}

fetchResults();
