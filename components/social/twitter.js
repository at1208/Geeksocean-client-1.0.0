import { FaTwitter } from "react-icons/fa";

const twitter = (props) => {
  return   <div className='skin skin_birman'>
            <div className="social-likes social-likes_visible">
              <div data-service="twitter" data-url={props.url} title="Share link on twitter" className="social-likes__widget social-likes__widget_twitter social-likes__widget_notext" role='button' tabindex="0">
               <FaTwitter />
              </div>
            </div>
          </div>

}
export default twitter;
