const searchInput = document.getElementById('search-input');
const searchBox = document.getElementById('searchBox');
const Accsess_Key = "28vpuYMzI4YAb8K-UWvWXNYerq_qLcSmynVSVeBNAXk";
const imgs_api_link = `https://api.unsplash.com/search/photos?`;
const Random_img = `https://source.unsplash.com/random/?nature`

const showMorebtn = document.getElementById('ShowMore-Btn');
const defaultHero = document.querySelector('.defualt-hero');
const placeholder = document.querySelector('.Search-Results');
let page = 1;
showMorebtn.style.display = 'none';

// localStorage.setItem("keyword",searchInput.value);
// const keyword = localStorage.getItem("keyword");
// console.log(keyword);
async function SearchImages() {
    const keyword = searchInput.value;
    const url = `${imgs_api_link}page=${page}&query=${keyword}&client_id=${Accsess_Key}&per_page=15`;
    try {
        const response = await fetch(url);
        const res = await response.json();
        const Data = res.results;
        defaultHero.innerHTML = '';
        if (page === 1) {
            placeholder.innerHTML = '';
        }
        Data.forEach(result => {
            console.log(result.tags.source.twitter_username);
            const Card = document.createElement('div');
            Card.classList.add('Card', 'post');
            Card.innerHTML =
                ` 
                <div class="Creater_section">
                  <img src="${result.user.profile_image.large}" alt="${result.user.name}" class="Creater_Cover">
                    <div class="Creater_Data">
                        <p class="Creater-Name-Location">
                          <b>${result.user.name} </b>from <i style="color:#eee">${result.user.location}</i>
                        </p>
                        <i class="Creater-Total-Photos">Total Photos :${result.user.total_photos}</i><br>
                        <i class="Creater-Total-Collections">Total Collections :${result.user.total_collections}</i><br>
                        <i class="Creater-Total-Likes">Total Likes :${result.user.total_likes}</i><br>
                        <div class="Creater-Socials">
                          <a href="${result.user.social.portfolio_url}" alt="the link to ${result.user.name} Portfolio Website!" target="_blank" class="Portfolio-icon"><i class="fa-regular fa-user"></i></a>
                          <a href="" alt="" target="_blank" class="Twitter-icon"><i class="fa-brands fa-twitter"></i></a>
                          <a href="" alt="" target="_blank" class="Instagrame-icon"><i class="fa-brands fa-square-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <a href="${result.links.html}" target="_blank"><img src="${result.urls.regular}" alt=""></a>
                <div class="buttons">
                    <div class="post-rating">
                        <span class="post-rating-button material-icons"><img class="rating-icon" src="./imgs/R.png" alt="Post Image"></span>
                        <span class="post-rating-count">${result.user.total_likes}</span>
                    </div>
                    <div class="post-rating">
                        <span class="post-rating-button material-rating-s"><img class="rating-icon" src="./imgs/Broken-heart-icon.png" alt="Post Image"></span>
                        <span class="post-rating-count">0</span>
                    </div>
                </div>
            `;
            placeholder.append(Card);
        });
        showMorebtn.style.display = 'block';
    } catch (error) {
        console.log(`Hey Ayoub there was an error : ${error}`);
    }

}

searchBox.addEventListener('submit', async (e) => {
    e.preventDefault();
    page = 1;
    await SearchImages();
    defaultHero.innerHTML = '';
});

showMorebtn.addEventListener('click', async (e) => {
    e.preventDefault();
    page++;
    await SearchImages();
});




//! get the random cards that will appear in the home page 
async function DefaultCards(){
    const url = `${imgs_api_link}page=${page}&query=nature&client_id=${Accsess_Key}&per_page=105`;
    const response = await fetch(url);
    const res = await response.json();
    const Data = res.results;
    Data.forEach(result => {
        const Card = document.createElement('div');
        Card.classList.add('Card','post');
        Card.setAttribute('data-post-id',`${result.id}`)
        // console.log(result.user.profile_image.large);
        Card.innerHTML =
            ` 
            <div class="Creater_section">
                <div class="Creater-Socials">
                <img src="${result.user.profile_image.large}" alt="" style="cursor:pointer;" class="Creater_Cover">
                    <a href="${result.user.social.portfolio_url ? result.user.social.portfolio_url :"Sorry but it looks like this user dosn't have a portfolio website or any social accounts !"}" alt="the link to ${result.user.name} Portfolio Website!" target="_blank" class="Portfolio-icon"><i class="fa-regular fa-user"></i></a>
                    <a href="" alt="" target="_blank" class="Twitter-icon"><i class="fa-brands fa-twitter"></i></a>
                    <a href="" alt="" target="_blank" class="Instagrame-icon"><i class="fa-brands fa-square-instagram"></i></a>                 
                    </div>
                <div class="Creater_Data">
                    <p class="Creater-Name-Location">
                    <b>${result.user.name} </b>from <i >${result.user.location}</i>
                    </p>
                    <i class="Creater-Total-Photos">Total Photos :${result.user.total_photos}</i><br>
                    <i class="Creater-Total-Collections">Total Collections :${result.user.total_collections}</i><br>
                    <i class="Creater-Total-Likes">Total Likes :${result.user.total_likes}</i><br>
                </div>
            </div>
            <a href="${result.links.html}" target="_blank"><img src="${result.urls.regular}" alt=""></a>
            <div class="buttons">
                <div class="post-rating">
                    <span class="post-rating-button material-icons"><img class="rating-icon" src="./imgs/R.png" alt="Post Image"></span>
                    <span class="post-rating-count">${result.user.total_likes}</span>
                </div>
                <div class="post-rating">
                    <span class="post-rating-button material-rating-s"><img class="rating-icon" src="./imgs/Broken-heart-icon.png" alt="Post Image"></span>
                    <span class="post-rating-count">0</span>
                </div>
            </div>
        `;
        defaultHero.append(Card);
        
    });
    showMorebtn.style.display = 'block';
}
DefaultCards();
showMorebtn.addEventListener('click', async (e) => {
    e.preventDefault();
    page++;
    await DefaultCards();
});


// // console.log(`thes is how to get random num between two min and max numbers : Math.floor(Math.random() * maxiterator) + 1`);

// // alt="${result.user.social.portfolio_url}" 
// //                   alt="${result.user.social.twitter_username}" 
// //                   alt="${result.user.social.instagram_username}" 



// // export {imgs_api_link,Accsess_Key,Random_img,showMorebtn,defaultHero,};