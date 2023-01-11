export default function templateMarkup(pageURL,likes,views,comments,downloads){
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
  