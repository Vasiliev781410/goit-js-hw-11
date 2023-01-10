
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios');
import {fetchData} from "./fetchData.js";

searchForm = document.querySelector('.search-form');

searchInput = document.querySelector('input[name="searchQuery"]');
searchInput.classList.add("search-form__input");

btnSubmit = document.querySelector('button[type="submit"]');
btnSubmit.textContent = "";

btnLoad = document.querySelector('.load-more');
btnLoad.classList.add("is-hidden");

let name = "";
function search(){ 
    console.log("search",searchInput.value);     
    if (searchInput.value.trim() === ""){
    //   countryList.innerHTML = ""; 
    //   countryInfo.innerHTML = ""; 
    console.log("search1");
    }     
    // if (searchInput.value.trim() === "" || searchInput.value.trim() === name){ 
        // console.log("search2"); 
    //   return;
    // }  
    name = searchInput.value.trim(); 
    // countryList.innerHTML = "";  
    // countryInfo.innerHTML = "";     
      fetchData(name)
        .then(response => {
          if (!response.ok) {      
            throw new Error(response.status);                    
          }        
          return response.json();
        })
        .then(data => {              
          if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');                  
            return;
          };
          console.log(data);
          //createCountryElements(data);     
        })
        .catch(error => {          
          Notiflix.Notify.failure('Oops, there is no country with that name');        
        });
  };
  


searchForm.addEventListener("submit",(e) => {   
    e.preventDefault();
    btnLoad.classList.remove("is-hidden");  
    search();        
});

