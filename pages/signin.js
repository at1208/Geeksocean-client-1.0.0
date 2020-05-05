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
           <div>
             <div className='row col justify-content-center'>
                <div className='col-md-6 shadow mt-5   sign'>
                  <h1 className='text-center'>Sign In</h1>
                  {showRedirectMessage()}
                  <SigninComponent />
                </div>
              </div>
        </div>
        </Layout>
    <style global jsx>{`
    .col-md-6{
      padding-left:0px!important;
      padding-right:0px!important;
    }
    .sign{
      margin-bottom:200px;
    }
      `}</style>
     </>
    );
};

export default withRouter(Signin);
