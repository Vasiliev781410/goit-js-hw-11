
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
const otherParams = '&image_type=photo&orientation=horizontal&safesearch=true';

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector('input[name="searchQuery"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const btnLoad = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

searchInput.classList.add("search-form__input");
btnSubmit.textContent = "";
btnLoad.classList.add("is-hidden");

let name = "";
let page = 1;
let loadHits = 0;

function smoothScroll(){  
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  if (page > 1){
    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",    
    }); 
  };
}

function interfaceUpdate(galleryItems){
  const list = document.querySelector(".gallery");
  //console.log(galleryItems[0].tags);
  const markup = galleryItems.map((image) => templateMarkup(image.largeImageURL,image.webformatURL,image.likes,image.views,image.comments,image.downloads,image.tags)).join("");
  list.insertAdjacentHTML("beforeend", markup);
  smoothScroll();
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

async function getData() {  
  if (searchInput.value.trim() === ""){
    Notiflix.Notify.failure('Oops, there is no images with that name');     
    return;  
 }     
  try {          
    name = searchInput.value.trim();       
    const response = await instance.get('/?key='+AUTH_TOKEN+'&q='+name+otherParams+PER_PAGE+'&page='+page);
    loadHits += response.data.hits.length;
    console.log(response.data.totalHits);
    console.log(loadHits);
    if (loadHits === response.data.totalHits && response.data.hits.length > 0) {
      btnLoad.classList.add("is-hidden"); 
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");   
    }
    if (page === 1){
      btnLoad.classList.remove("is-hidden");
    }
    interfaceUpdate(response.data.hits);
    page += 1;    
  } catch (error) {
    btnLoad.classList.add("is-hidden"); 
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');   
    console.error(error);
  }
};

const search = (e)=>{ 
  e.preventDefault();  
  gallery.innerHTML = ""; 
  page = 1;
  loadHits = 0; 
  getData();  
};

const loadMore = (e)=>{    
  getData();  
};
// 
searchForm.addEventListener("submit",search);
btnLoad.addEventListener("click",loadMore);

