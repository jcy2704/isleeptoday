// import axios from 'axios';
// import randInt from './randInt';

// export const heroImg = (res, setURL) => {
//   if (res < 728) {
//     axios.get(`https://api.unsplash.com/search/photos?page=${randInt()}&orientation=portrait&query=house&client_id=${process.env.REACT_APP_UNSPLASH_API}`)
//       .then(response => {
//         const img = randInt();
//         setURL(response.data.results[img].urls.small);
//       });
//   } else {
//     axios.get(`https://api.unsplash.com/search/photos?page=${randInt()}&orientation=landscape&query=house&client_id=${process.env.REACT_APP_UNSPLASH_API}`)
//       .then(response => {
//         const img = randInt();
//         setURL(response.data.results[img].urls.regular);
//       });
//   }
// };

// export const idasd = () => {
//   axios.get(`https://api.unsplash.com/photos/L7EwHkq1B2s?client_id=${process.env.REACT_APP_UNSPLASH_API}`);
// };
