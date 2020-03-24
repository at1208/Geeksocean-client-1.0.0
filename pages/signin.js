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
           <div className='row justify-content-center'>
             <div className='signin-box boxing shadow col-md-5  '>
              <div>{showRedirectMessage()}</div>
              <SigninComponent />
           </div>
        </div>
        </Layout>
    <style jsx>{`
      .signin-box{

      }
      .boxing{
        margin-top:80px;
        margin-left:20px;
        margin-right:20px;
      }
      `}</style>
     </>
    );
};

export default withRouter(Signin);
