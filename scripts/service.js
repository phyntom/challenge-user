class Service {
   constructor(url) {
      this.apiURL = url;
   }
   fetchUsers = async () => {
      try {
         let res = await fetch(`${this.apiURL}/users`);
         return await res.json();
      } catch (err) {
         console.error(err);
      }
   };
   fetchUserPosts = async (userId) => {
      try {
         let res = await fetch(`${this.apiURL}/posts/${userId}`);
         return await res.json();
      } catch (err) {
         console.error(err);
      }
   };
}

export default Service;
