import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
      <>
        <Layout>
           <div className='container col-md-5 shadow signin-box'>
              <div>{showRedirectMessage()}</div>
              <SigninComponent />
           </div>
        </Layout>
    <style jsx>{`
      .signin-box{
        padding: 30px;
        margin-top: 35px;
        border-bottom: 2px solid red;
      }
      `}</style>
     </>
    );
};

export default withRouter(Signin);
