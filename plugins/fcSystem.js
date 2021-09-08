
 export default function ({ app }, inject) {
     app.$axios.$get('/fcSystem').then(function (response) {
         if(response.status === 200) {
            inject('hello', response.data);
         }
      })
     .catch(function (error) {
        console.log(error);
     });

  }