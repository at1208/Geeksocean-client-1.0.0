import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate, isAuth } from '../../actions/auth';
import { FB_APP_ID } from '../../config';

const LoginFacebook = () => {
    const responseFacebook = response => {
        // console.log(response); // {access_token, email, id, userID, name, signed_request}

        loginWithFacebook(response).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // console.log('repsonse on fb login', data);
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    return (
        <div className="">
            <FacebookLogin
                cssClass='btn-block fb-btn btn'
                appId={`${FB_APP_ID}`}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
            />
            <style global jsx>{`
              .fb-btn{
                color:white!important;
                background-color:#3b5998!important;
                margin-top: 11px!important;
                border-radius: 2px!important;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px!important;
              }
              `}</style>
        </div>
    );
};

export default LoginFacebook;
