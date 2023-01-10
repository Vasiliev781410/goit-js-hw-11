const axios = require('axios');

const API_KEY = '32700035-2643abb13134080679caa7410';
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q=";
const PER_PAGE = "&per_page=40";

function fetchData(name){        
    //return fetch(URL+name+PER_PAGE+"&page=1");
    const options = {
        method: 'get',
        url: URL+name+PER_PAGE+"&page=1",
        responseType: 'stream'
      };
    return axios(URL+name+PER_PAGE+"&page=1").then(function (response) {
        response.data;
        console.log(response.data);
    });
};

export {fetchData};
