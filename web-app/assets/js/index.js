const apiKey = config.MY_UNSPLASH_KEY;

const unsplashURL = 'https://api.unsplash.com/search/photos'+ 
'?client_id=' + apiKey +
'&per_page=25' +
'&query='

document.addEventListener('DOMContentLoaded', () => {
    
    const inputBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('results');

    searchBtn.addEventListener('click', () => {
        const searchTerm = inputBox.value;
        fetch(unsplashURL + searchTerm)
        .then((httpResponse) => {
            return httpResponse.json();
        })
        .then((jsonData) => {
            if('content' in document.createElement('template')) {
                while (resultsContainer.lastChild.id != 'photo-result-template') {
                    resultsContainer.removeChild(resultsContainer.lastChild);
                }
                jsonData.results.forEach((photo) => {
                    const templateCard = document.getElementById('photo-result-template').content.cloneNode(true);
                    templateCard.querySelector('.photo-link').setAttribute('href', photo.links.html);
                    templateCard.querySelector('.photo').setAttribute('src', photo.urls.small);
                    templateCard.querySelector('.photo').setAttribute('alt', photo.alt_description);
                    templateCard.querySelector('.profile-image').setAttribute('src', photo.user.profile_image.medium);
                    templateCard.querySelector('.credit').innerText += photo.user.username;
                    templateCard.querySelector('.credit').setAttribute('href', photo.user.links.html)
                    templateCard.querySelector('.image-link').setAttribute('href', photo.user.links.html)
                    resultsContainer.appendChild(templateCard);
                });
            } else {
                console.error('Your browser does not support templates');
            }
        })
    });
});



