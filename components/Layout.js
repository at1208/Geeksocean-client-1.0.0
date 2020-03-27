import Header from './Header';
import Footer from './Footer'
import Router from "next/router";
import NProgress from "nprogress";
import './Header.css'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    return (
        <div className='page-container'>
          <Header />
          <div className='content'>
            {children}
          </div>
            <Footer />
          <style global jsx>{`
           .page-container{

           }
 
            `}</style>
        </div>
    );
};

export default Layout;
