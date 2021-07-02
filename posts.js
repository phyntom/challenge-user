import Service from './service.js';

let userId = getQueryParameters();

if (userId) {
   document.addEventListener('load', getPosts(userId));
   document.addEventListener('click', (e) => {
      e.stopPropagation();
      window.history.back();
   });
} else {
   let main = document.querySelector('main');
   let empty = document.createElement('div');
   let emptyHeading = document.createElement('h2');
   empty.classList.add('card');
   emptyHeading.classList.add('empty');
   emptyHeading.innerText = 'no user id parameter provided';
   empty.append(emptyHeading);
   main.append(empty);
}

async function getPosts(id) {
   try {
      let service = new Service(`https://jsonplaceholder.typicode.com`);
      let res = await service.fetchUserPosts(id);
      let data = res;
      const card = createCard(data);
      document.querySelector('main').append(card);
   } catch (err) {
      console.error(err);
   }
}

function getQueryParameters() {
   let queryString = window.location.search;
   const urlParameters = new URLSearchParams(queryString);
   return urlParameters.get('userId');
}

const createCard = (post) => {
   let card = document.createElement('div');
   card.classList.add('card');
   let cardTitle = document.createElement('h2');
   let cardContent = document.createElement('div');
   let cardButton = document.createElement('button');
   // cardButton.dataset.key = item.id;

   cardTitle.classList.add('card-title');
   cardContent.classList.add('card-content');
   cardButton.classList.add('card-button');
   cardButton.innerText = 'Back';
   cardTitle.innerText = post.title;
   cardContent.innerText = post.body;
   card.append(cardTitle);
   card.append(cardContent);
   card.append(cardButton);
   return card;
};
