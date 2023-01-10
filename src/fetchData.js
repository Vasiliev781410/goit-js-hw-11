const API_KEY = '32700035-2643abb13134080679caa7410';
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q=";

function fetchData(name){        
    return fetch(URL+name);
};

export {fetchData};
