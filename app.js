const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002; // You can choose any available port


// Replace 'https://example.com/api/data' with the actual URL containing JSON data
const apiUrl = 'https://www.mohfw.gov.in/data/datanew.json';
let jsonData;

// Make a GET request to the specified URL
axios.get(apiUrl)
  .then(response => {
    // Handle the JSON data in the response
    jsonData = response.data;
    // console.log(jsonData);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error.message);
  });

// Define a route for the GET method
app.get('/', (req, res) => {
  // console.log(jsonData);
  let final_data = jsonData.filter((state)=> state.state_name==='Karnataka'||state.state_name==='Kerala***'||state.state_name==='Maharashtra').map((state)=>{
    return `State: ${state.state_name}
Active: ${state.new_active} ||| ${state.new_active-state.active}
positive: ${state.new_positive} ||| ${state.new_positive-state.positive}
cured: ${state.new_cured} ||| ${state.new_cured-state.cured}
death: ${state.new_death} ||| ${state.new_death-state.death}

-------------------

`
  })
  // console.log(final_data.join(''));
  res.setHeader('Content-Type', 'text/plain');
  res.send(`Welcome to State Data

${final_data.join('')}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
