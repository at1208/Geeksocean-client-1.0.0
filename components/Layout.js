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
        <>
          <Header />
          <div className='geek-container'>
            {children}
          </div>
          <Footer />
          <style jsx>{`
            .geek-container{
            min-height:100vh;
            }
            `}</style>
        </>
    );
};

export default Layout;
