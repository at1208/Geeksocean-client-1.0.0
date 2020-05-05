import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
        <div className='row col justify-content-center'>
           <div className='col-md-6 shadow mt-5   sign'>
             <h1 className='text-center'>Create account</h1>
                        <SignupComponent />
                        </div>
                        <style jsx>{`
                          .sign{
                            margin-bottom:200px;
                          }
                          `}</style>
                    </div>
        </Layout>
    );
};

export default Signup;
