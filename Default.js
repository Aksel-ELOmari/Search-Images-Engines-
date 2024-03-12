
async  function CarouselIndecatores(){
    let maxiterator = 20;
    let R_count = Math.floor(Math.random() * maxiterator) + 1;
    let keyword = 'nature';
    let Random_url = `${imgs_api_link}page=${R_count}&query=${keyword}&client_id=${Accsess_Key}&per_page=${maxiterator}`;
    let response = await fetch(Random_url);
    let res = await response.json();
    res.results.forEach(img_data =>{
        // console.log(img_data.urls);
            let carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            carouselItem.innerHTML = 
            ` <a href="${img_data.links.html}" target="_blank"><img src="${img_data.urls.regular}" height="60vh" width="100%" class="d-block w-100" alt=""></a>
                <div class="carousel-caption d-none d-md-block">
                  <h5>${img_data.alt_description}</h5>
                  <span style="background-color:#000;padding:.4rem;color:#fff;text-shadow:2px 2px 3px #58024d;">${img_data.description}</span>
               </div>
            `
            document.querySelector('.carousel-inner').append(carouselItem);
    })
    for(let j = 1; j <= maxiterator; j++){
        let buttonTagler = document.createElement('button');
        buttonTagler.setAttribute('type','button');
        buttonTagler.setAttribute('data-bs-target','#carouselExampleIndicators');
        buttonTagler.setAttribute('data-bs-slide-to',`${j}`);
        buttonTagler.setAttribute('aria-label',`Slide ${j}`);
        document.querySelector('.carousel-indicators').append(buttonTagler);
    }
}
CarouselIndecatores();
