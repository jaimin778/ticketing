import 'bootstrap/dist/css/bootstrap.css';

// export default ({ Component, pageProps }) => {
//   return ( 
//     <div>
//       <h1>Header!</h1>
//       <Component {...pageProps} />
//     </div>
//   );
// };

const AppComponent = ({ Component, pageProps }) => {
  return ( 
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = ({req}) => {
  console.log("_app:",req)
  // console.log(context.Component.ctx);
  return {};
}

export default AppComponent;