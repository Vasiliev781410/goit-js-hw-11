
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//import {fetchData} from "./fetchData.js";
import axios from 'axios';
const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api'
 });


const URL = 'https://pixabay.com/api/?key='+AUTH_TOKEN+'&q=';
const PER_PAGE = '&per_page=40';

searchForm = document.querySelector('.search-form');

searchInput = document.querySelector('input[name="searchQuery"]');
searchInput.classList.add("search-form__input");

btnSubmit = document.querySelector('button[type="submit"]');
btnSubmit.textContent = "";

btnLoad = document.querySelector('.load-more');
btnLoad.classList.add("is-hidden");
gallery = document.querySelector('.gallery');

let name = "";

function templateMarkup(pageURL,likes,views,comments,downloads){
  const template = `<a href=${pageURL} class="photo-ref"><div class="photo-card">
  <img src=${pageURL} alt="" loading="lazy" width="300" height="200">
  <div class="info">
    <p class="info-item">
      <b>Likes</b> 
      <br>${likes}
    </p>   
    <p class="info-item">
      <b>Views</b>
      <br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br>${downloads}
    </p>
  </div>
  </div></a>`;

 return template;
}

function interfaceUpdate(galleryItems){
  const list = document.querySelector(".gallery");
  console.log(galleryItems[0].tags);
  const markup = galleryItems.map((image) => templateMarkup(image.webformatURL,image.likes,image.views,image.comments,image.downloads)).join("");

  list.insertAdjacentHTML("afterbegin", markup);

  let lightbox = new SimpleLightbox('.gallery a');
}

async function getData() {
  gallery.innerHTML = ""; 
  if (searchInput.value.trim() === ""){
    Notiflix.Notify.failure('Oops, there is no images with that name');     
    return;  
 }     
  try {
    //console.log(instance);         
    name = searchInput.value.trim();       
    const response = await instance.get('/?key='+AUTH_TOKEN+'&q='+name+PER_PAGE+'&page=1');
    console.log(response.data.hits);
    interfaceUpdate(response.data.hits);
    
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no images with that name');   
    console.error(error);
  }
};

function search(){ 
  name = searchInput.value.trim(); 
  fetchData(name);
};

//function search(){ 
    //console.log("search",searchInput.value);     
    //if (searchInput.value.trim() === ""){
    //   countryList.innerHTML = ""; 
    //   countryInfo.innerHTML = ""; 
    //console.log("search1");
    //}     
    // if (searchInput.value.trim() === "" || searchInput.value.trim() === name){ 
        // console.log("search2"); 
    //   return;
    // }  
   // name = searchInput.value.trim(); 
    // countryList.innerHTML = "";  
    // countryInfo.innerHTML = "";     
      // fetchData(name);
        // .then(response => {
          // if (!response.ok) {      
            // throw new Error(response.status);                    
          // }        
          // return response.json();
        // })
        // .then(data => {              
          // if (data.length > 10) {
            // Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');                  
            // return;
          // };
          // console.log(data.hits);       
        // })
        // .catch(error => {          
          // Notiflix.Notify.failure('Oops, there is no country with that name');        
        // });
  //};
  


searchForm.addEventListener("submit",(e) => {   
  e.preventDefault();
  btnLoad.classList.remove("is-hidden");  
  getData();       
});

