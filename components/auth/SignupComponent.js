import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { Button, Input } from 'antd'

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        preSignup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
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

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
              <h4>Create Account</h4>
                <div className="form-group">
                    <Input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"

                        addonBefore='Name'
                    />
                </div>

                <div className="form-group">
                    <Input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"

                        addonBefore='Email'
                    />
                </div>

                <div className="form-group">
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"

                        addonBefore='Password'
                    />
                </div>

                <div className='text-center'>
                    <button className="btn" style={{ width:"100px", backgroundColor: "#6442E0", color:"white"}}>Signup</button>
                </div>
                <Link href="/auth/password/forgot">
                    <a className=" "><Button danger type="link">Forgot password</Button></a>
                </Link>
              <style global jsx>{`
                .ant-input-group-addon{
                  background-color: #6442E0!important;
                  color:white!important;
                }`}</style>
            </form>
        );
    };

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            <div className='row col justify-content-center'>
               <div className='col-sm-6'>
               <LoginGoogle />
               </div>
               <div className='col-sm-6'>
               <LoginFacebook />
               </div>
            </div>
              <br />

            <div className='showform'>

              {showForm && signupForm()}
            </div>

            <br />

            <style jsx>{`
           .showform{

             padding:20px;
           }
              `}</style>
        </>
    );
};

export default SignupComponent;
