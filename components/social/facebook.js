import { FaFacebook } from "react-icons/fa";

const facebook = (props) => {
  return  <div className='skin skin_birman'>
            <div className="social-likes social-likes_visible">
              <div data-service="facebook" data-url={props.url} title="Share link on Facebook" className="social-likes__widget social-likes__widget_facebook social-likes__widget_notext" role='button' tabindex="4">
             <FaFacebook />
              </div>
            </div>
          </div>
}
export default facebook;
