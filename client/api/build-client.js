// import axios from 'axios';

// const buildClient = ({ req }) => {
//   if (typeof window === 'undefined') {
//     // console.log('you are in server');
//     // Server-side rendering
//     return axios.create({
//       baseURL: 'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
//       headers: req.headers
//     });
//   } else {
//     // console.log('you are in browser');
//     // Client-side rendering
//     return axios.create({
//       baseURL: '/api/users/currentuser'
//     });
//   }
// };

// export default buildClient;

import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Server-side rendering
    if (req) {
      // Ensure that req is provided in server-side context
      return axios.create({
        baseURL: 'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: req.headers
      });
    } else {
      console.error("Request object 'req' is missing in server-side context.");
      return null;
    }
  } else {
    // Client-side rendering
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;
