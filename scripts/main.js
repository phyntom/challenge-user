import Service from './service.js';

// window.addEventListener('load', getUsers());

let title = document.querySelector('h1');

const globalEventListener = (type, selector, callback) => {
   document.addEventListener(type, (event) => {
      if (selector === 'document') {
         callback();
      } else {
         if (event.target.matches(selector)) callback(event);
      }
   });
};

globalEventListener('load', 'document', getUsers());
globalEventListener('click', '.card-button', function (evt) {
   evt.stopPropagation();
   const userId = evt.target.dataset.key;
   window.location.assign(`./posts.html?userId=${userId}`);
});

async function getUsers() {
   try {
      let service = new Service(`https://jsonplaceholder.typicode.com`);
      let res = await service.fetchUsers();
      let data = res;
      let container = document.querySelector('.container');
      for (const item of data) {
         let itemCard = createCard(item);
         container.append(itemCard);
      }
   } catch (err) {
      console.error(err);
   }
}

const createCard = (item) => {
   let card = document.createElement('div');
   card.classList.add('card');
   let cardTitle = document.createElement('h2');
   let cardContent = document.createElement('div');
   let cardButton = document.createElement('button');
   cardButton.dataset.key = item.id;

   cardTitle.classList.add('card-title');
   cardContent.classList.add('card-content');
   cardButton.classList.add('card-button');
   cardButton.innerText = 'View Post';
   cardTitle.innerText = item.username;
   cardContent.innerText = item.email;
   card.append(cardTitle);
   card.append(cardContent);
   card.append(cardButton);
   return card;
};
