import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate, isAuth } from '../../actions/auth';
import { FB_APP_ID } from '../../config';
import { FaFacebookSquare } from "react-icons/fa";


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
                        Router.push(`/`);
                    } else {
                        Router.push(`/`);
                    }
                });
            }
        });
    };

    return (
        <div className="">
            <FacebookLogin
                cssClass='fb-btn btn'
                appId={`${FB_APP_ID}`}
                fields="name,email,picture"
                callback={responseFacebook}
                icon=<FaFacebookSquare style={{ fontSize: "25px!important", color:"#3b5998", width: "50px", textAlign:"left!important"}}/>
                textButton="Sign in with facebook"
            />
            <style global jsx>{`
              .fb-btn{

              }
            .metro{
               background-color: white!important;
               margin:16px 0px 0px 0px!important;
               padding:0px 0px 0px 0px!important;
              }
              button{
               margin:"50px!important"
              }
              .col{
                padding-left:0px!important;
                padding-right:0px!important;
              }
              `}</style>
        </div>
    );
};

export default LoginFacebook;
