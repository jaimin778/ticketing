// import axios from 'axios';
import buildClient from "../api/build-client";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  if(currentUser) {
    return <div>you are signin</div>;
  } else {
    return <div>you are not Siginin</div>;
  }
};


LandingPage.getInitialProps = async ({ req }) => {
  // console.log(req.headers);
  if (typeof window === "undefined") {
    // we are on the server
    // we are making request from the https://ingress-nginx.sev.local
    const {data} = await axios.get(
      'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers:req.headers
      }
    );

    return data;
  }else {
    // we are on the browser 
    const { data } = await axios.get('/api/users/currentuser');
    
    return data;
  }
  return {};
};


// LandingPage.getInitialProps = async context => {
//   const client = buildClient(context);
//   // console.log(client);
//   const {data} = await client.get('/api/users/currentuser');

//   return data;
// }




// import buildClient from "../api/build-client";
// const LandingPage = ({currentUser }) => {
//   return currentUser ? (
//     <h1>You are signed</h1>
//   ) : (
//     <h1>You are not Signin</h1>
//   );
// };
// LandingPage.getInitialProps = async context => {
//   const client = buildClient(context);
  
//   const { data } = await client.get('/api/users/currentuser');
  
//   return data;
    
// };
export default LandingPage;