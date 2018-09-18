/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
        	url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        	headers:{
        		Authorization:'Client-ID 5debb93ce95f068a52499d8b35ebdde300068b49f7ead9b0696393b82aadb6af'
        	}
        }).done(addImage);

        function addImage(images) {
        	const firstImage = images.results[0];

    		responseContainer.insertAdjacentHTML('afterbegin', `<figure>
	            <img src="${firstImage.urls.small}" alt="${searchedForText}">
	            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        	</figure>`
    		);
        }

        $.ajax({
        	url:`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=934cb3ea330f47f687cee5eaa0fe6200`,
        }).done(addArticles);

        function addArticles(articles) {
			const firstArticle = articles.response.docs[0];
			responseContainer.insertAdjacentHTML('afterbegin',`<article>
					<h2>${firstArticle.headline.main}</h2>
					<p>${firstArticle.snippet}</p>
				</article>`);				
		}
    });
})();
