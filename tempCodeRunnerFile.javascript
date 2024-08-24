const axios = require('axios');

// Define the API endpoint and the request payload
const url = "https://wse-api-rag.onrender.com/api/query"; // FastAPI URL
const data = {
    prompt: "Làm sao để có học bổng",
    database: "Trường Đại học Công nghệ Thông tin"
};

// Make the POST request
axios.post(url, data)
    .then(response => {
        console.log(response.data.response); // Handle the response data
    })
    .catch(error => {
        console.error('Error making the request:', error); // Handle errors
    });
