(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const imgRequest = new XMLHttpRequest();

		imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		imgRequest.onload = addImage;
		imgRequest.onError = function (err) {
			requestError(err, 'image')
		}
		imgRequest.setRequestHeader('Authorization', 'Client-ID 5debb93ce95f068a52499d8b35ebdde300068b49f7ead9b0696393b82aadb6af');
		imgRequest.send();

		function addImage(){
			let htmlContent = '';
			const data = JSON.parse(this.responseText);
			if (data&&data.results&&data.results[0]) {
				const firstImage = data.results[0];
				htmlContent = `<figure>
				<img src="${firstImage.urls.regular}" alt="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`;
			} else {
				htmlContent = '<div class="error-no-image">No images available</div>'
			}	
			responseContainer.insertAdjacentHTML('afterbegin',htmlContent);		
		}

		const articleRequest = new XMLHttpRequest();
		articleRequest.onload = addArticles;
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=934cb3ea330f47f687cee5eaa0fe6200`);
		articleRequest.send();
		function addArticles () {
			let htmlContent = '';
			const data = JSON.parse(this.responseText);
			if (data&&data.response&&data.response.docs&&data.response.docs[0]) {
				const firstArticle = data.response.docs[0];
				htmlContent = `<article>
					<h2>${firstArticle.headline.main}</h2>
					<p>${firstArticle.snippet}</p>
				</article>`
			} else {
				htmlContent = '<div class="error-no-articles">No articles available</div>'
			}
			responseContainer.insertAdjacentHTML('afterbegin',htmlContent);				
		}
    });
})();
