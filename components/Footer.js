import Link from "next/link";
import { DOMAIN } from '../config'

const Footer = () => {
  return <>
        <div className='jumbotron footer'>
        <div className='footer-title'>
        <Link href='https://geeksocean.com'>
        <a>GeeksOcean.com</a>
        </Link>
        </div>
        </div>
        <style  jsx>
        {`
        .footer{

        }
        .jumbotron{
        padding: 32px 32px 32px 32px!important;
        margin-bottom: 0px!important;
        }
        .footer-title{
          font-size: 20px;
        }
          `}
        </style>
       </>
}

export default Footer;
