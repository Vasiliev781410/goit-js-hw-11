
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import templateMarkup from "./markup.js";
import axios from 'axios';

const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api'
 });
const PER_PAGE = '&per_page=40';

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector('input[name="searchQuery"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const btnLoad = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

searchInput.classList.add("search-form__input");
btnSubmit.textContent = "";
btnLoad.classList.add("is-hidden");

let name = "";

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

const search = (e)=>{ 
  e.preventDefault();
  btnLoad.classList.remove("is-hidden");  
  getData();  
};
// 
searchForm.addEventListener("submit",search);

