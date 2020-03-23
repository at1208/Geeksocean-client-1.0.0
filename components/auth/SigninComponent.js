import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import {Input, Button} from 'antd'
import LoginFacebook from './LoginFacebook';

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
          <div >
            <form onSubmit={handleSubmit}  className='signin-form text-center'>
                   <div style={{ margin: '10px'}}>
                   <Input
                       value={email}
                       addonBefore='Email'
                       onChange={handleChange('email')}
                       type="email"
                       placeholder="Type your email"
                       className='signin-input'
                   />
                   </div>

                   <div style={{ margin: '10px'}}>
                   <Input
                       value={password}
                       addonBefore='Password'
                       onChange={handleChange('password')}
                       type="password"
                       className='signin-input'
                       placeholder="Type your password"
                   />
                   </div>
                    <button className='btn btn-info btn-block'>Signin</button>

            </form>
            <style global jsx>{`
              .signin-form{
                padding: 10px;
                margin-bottom:10px;

            }
            .ant-input {
               line-height: 30px!important;
            }
            .btn{
              border-radius: 0px!important;
            }
            `}</style>
          </div>
        );
    };

    return<div className='sign'>

            {showError()}
            {showLoading()}
            {showMessage()}
           <div className='container row col justify-content-center social-login-btn'>
             <div className='col-sm-6'>
               <LoginGoogle />
             </div>
              <div className='col-sm-6'>
                <LoginFacebook />
              </div>
          </div>

            {showForm && signinForm()}
            <Link href="/auth/password/forgot">
            <a className=""><Button>Forgot password</Button></a>
            </Link>

   <style global jsx>{
     `.social-login-btn{
       margin: 20px;
       padding:30px;

     }
     .signin-box{
       border: 0px solid white!important;
    margin: 10px!important;
     }
     `
   }</style>
 </div>
};

export default SigninComponent;
