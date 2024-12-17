import axios from "axios";
 
 

const client = axios.create({
  baseURL:  'https://9c7d-103-83-254-78.ngrok-free.app/api',
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});


export default client;
