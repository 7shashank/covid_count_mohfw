const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;


const apiUrl = 'https://www.mohfw.gov.in/data/datanew.json';
let jsonData;

axios.get(apiUrl)
  .then(response => {
    jsonData = response.data;
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });

app.get('/', (req, res) => {
  let final_data = jsonData.filter((state)=> state.state_name==='Karnataka'||state.state_name==='Kerala***'||state.state_name==='Maharashtra').map((state)=>{
    return `State: ${state.state_name}
Active: ${state.new_active} ||| ${state.new_active-state.active}
positive: ${state.new_positive} ||| ${state.new_positive-state.positive}
cured: ${state.new_cured} ||| ${state.new_cured-state.cured}
death: ${state.new_death} ||| ${state.new_death-state.death}

-------------------

`
  })
  res.setHeader('Content-Type', 'text/plain');
  res.send(`Welcome to State Data

${final_data.join('')}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
