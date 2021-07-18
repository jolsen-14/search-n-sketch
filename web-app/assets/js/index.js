const apiKey = config.MY_UNSPLASH_KEY;

const unsplashURL = 'https://api.unsplash.com/search/photos'+ 
'?client_id=' + apiKey +
'&per_page=25' +
'&query='

const resultsArray = [];
const referenceSetArray = [];

let idNum = 0;

document.addEventListener('DOMContentLoaded', () => {
    
    const inputBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('results');

    searchBtn.addEventListener('click', () => {
        resultsArray.length = 0; // clear the original resultsArray
        referenceSetArray.length = 0;
        const searchTerm = inputBox.value;
        fetch(unsplashURL + searchTerm)
        .then((httpResponse) => {
            return httpResponse.json();
        })
        .then((jsonData) => {
            if('content' in document.createElement('template')) {
                // First clear the results of the last search, if any.
                while (resultsContainer.lastChild.id != 'photo-result-template') {
                    resultsContainer.removeChild(resultsContainer.lastChild);
                }
                idNum = 0;
                jsonData.results.forEach((photo) => {
                    buildPhotoCard(photo);
                });
            } else {
                console.error('Your browser does not support templates');
            }
        })
    });

    function buildPhotoCard(photo) {
        resultsArray.push(photo);
        const templateCard = document.getElementById('photo-result-template').content.cloneNode(true);
        templateCard.querySelector('.photo-link').setAttribute('href', photo.links.html);
        templateCard.querySelector('.photo').setAttribute('src', photo.urls.regular);
        templateCard.querySelector('.photo').setAttribute('alt', photo.alt_description);
        templateCard.querySelector('.photo').setAttribute('title', photo.alt_description);
        templateCard.querySelector('.photo').setAttribute('id', 'ref' + idNum);
        templateCard.querySelector('.photo-card').setAttribute('id', idNum);
        templateCard.querySelector('.zoom-icon').setAttribute('id', 'refzoom' + idNum);
        templateCard.querySelector('.zoom-icon').addEventListener(('click'), (event) => {
            showFullScreenImage(event.target.id, event);
        });
        templateCard.querySelector('.profile-image').setAttribute('src', photo.user.profile_image.medium);
        templateCard.querySelector('.profile-image').setAttribute('title', photo.user.username);
        templateCard.querySelector('.credit').innerText += photo.user.username;
        templateCard.querySelector('.credit').setAttribute('href', photo.user.links.html)
        templateCard.querySelector('.image-link').setAttribute('href', photo.user.links.html)
        const checkbox = templateCard.querySelector('.reference-set-selector');
        checkbox.setAttribute('id', 'ref' + idNum);
        checkbox.setAttribute('name', 'ref' + idNum);
        checkbox.setAttribute('value', 'ref' + idNum);
        templateCard.querySelector('.reference-set-selector-label', 'ref' + idNum);
        resultsContainer.appendChild(templateCard);
        checkbox.addEventListener(('click'), (event) => {
            const parentCard = event.currentTarget.parentNode.parentNode.parentNode.parentNode
            if (checkbox.checked) {
                parentCard.classList.add('selected');
                referenceSetArray.push(resultsArray[parentCard.id]);
            } else {
                parentCard.classList.remove('selected');
                referenceSetArray.splice(referenceSetArray.indexOf(resultsArray[parentCard.id]), 1);
            }
        });
        idNum++;
    }
});

function showFullScreenImage(id, clickEvent) {
    if (document.querySelector('.full-screen-image') != null) {
        return;
    }
    const focusedPhotoCard = document.getElementById(id.substring(7));
    const photoObj = resultsArray[id.substring(7)]
    const imageFullScreen = document.createElement('img');
    const fullScreenBlur = document.createElement('div');
    const closeBtn = document.createElement('i');
    closeBtn.setAttribute('class', 'full-screen-close-button fas fa-times-circle');
    fullScreenBlur.setAttribute('class', 'full-screen-blur');
    imageFullScreen.setAttribute('class', 'full-screen-image ' + id);
    imageFullScreen.setAttribute('src', photoObj.urls.regular);
    imageFullScreen.setAttribute('visibility', 'hidden');
    
    document.querySelector('body').appendChild(imageFullScreen);
    document.querySelector('body').appendChild(closeBtn);
    document.querySelector('body').appendChild(fullScreenBlur);

    closeBtn.addEventListener(('click'), (event) => {
        imageFullScreen.remove();
        fullScreenBlur.remove();
        closeBtn.remove();
    })

    fullScreenBlur.addEventListener(('click'), (event) => {
        imageFullScreen.remove();
        fullScreenBlur.remove();
        closeBtn.remove();
    })

    imageFullScreen.setAttribute('visibility', 'visible');
}







