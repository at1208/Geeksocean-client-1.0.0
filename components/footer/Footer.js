import Link from "next/link";
import { DOMAIN } from '../../config'
import { AiOutlineCopyright} from "react-icons/ai";


const Footer = () => {
  const date = new Date()
  return <div className='footer'>
          <div className='row justify-content-center'>
            <div className='col-md-4 ft-block-1'>
               <div className='ft-title'>Discover  Geeksocean</div>
               <div className='ft-tagline'>
               Welcome to a place where the weather is always awesome.
               </div>
            </div>
            <div className='col-md-4 text-center ft-block-2'>

            </div>
          </div>


          <div className='row justify-content-center'>
            <div className='col-md-4 ft-block-3'>
              <a href='https://geeksocean.com' className='domain-name'>Geeks Ocean</a>
            </div>
            <div className='col-md-4 ft-block-4'>
            <a style={{ marginLeft:"10px", marginRight:"10px", color:"rgba(255, 255, 255, 0.7)!important"}}>About</a>
            <a style={{ marginLeft:"10px", marginRight:"10px",color:"rgba(255, 255, 255, 0.7)!important;"}}>Help</a>
            <a href="/contact" style={{ marginLeft:"10px", marginRight:"10px",color:"rgba(255, 255, 255, 0.7)!important;"}}>Contact us</a>
            <a href="/privacy-policy" style={{ marginLeft:"10px", marginRight:"10px", color: "rgba(255, 255, 255, 0.7)!important;"}}>Privacy policy</a>
            <a href="/keydetail/all" style={{ marginLeft:"10px", marginRight:"10px", color:"rgba(255, 255, 255, 0.7)!important"}}>keywords</a>
            </div>
          </div>

          <div className='text-center all-rights'>
     <AiOutlineCopyright/>{date.getFullYear()}
          </div>


        <style  global jsx>
        {`
         .ft-title{
               font-size:22px;
               color:white;
               font-family: 'Source Sans Pro', sans-serif;
               margin-bottom: 5px;
         }
         .ft-tagline{
           text-align: left!important;
           font-size:14px;

         }
         .domain-name{
           color:white!important;
            font-family: 'Source Sans Pro', sans-serif;
           font-size: 30px;
           letter-spacing: 1px;
         }
          .footer{
            margin-top:400px;
            background-color:#191919;
          }
          .ft-block-1{
             padding:5px!important;
             color:rgba(255, 255, 255, 0.7)!important;
             margin:5px;
             font-weight:lighter;
          }
          .ft-block-2{
            padding:5px!important;
            margin:5px;


          }
          .ft-block-3{
            padding:5px!important;
            color:white!important;
            margin:5px;


          }
          .ft-block-4{
            padding:5px!important;
            margin:5px;
            color:rgba(255, 255, 255, 0.7)!important;
            font-weight:lighter;
            text-align: end;

          }
          .all-rights{
            color:rgba(255, 255, 255, 0.7)!important;
            font-size:15px;
            padding:10px;
          }

          `}
        </style>
       </div>
}

export default Footer;
