import { FaPinterest } from "react-icons/fa";

const pinterest = (props) => {
  return   <div className='skin skin_birman'>
            <div className="social-likes social-likes_visible">
              <div data-service="pinterest" data-url={props.url} title="Share link on pinterest" className="social-likes__widget social-likes__widget_pinterest social-likes__widget_notext" role='button' tabindex="0">
              <FaPinterest />
              </div>
            </div>
          </div>

}
export default pinterest;
