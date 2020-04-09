const facebook = (props) => {
  console.log(props)
  return  <div className='skin skin_birman'>
            <div class="social-likes social-likes_visible">
              <div data-service="facebook" data-url={props.url} title="Share link on Facebook" className="social-likes__widget social-likes__widget_facebook social-likes__widget_notext" role='button' tabindex="0">
                <svg class="social-likes__icon social-likes__icon_facebook" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                   <path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z"></path>
                </svg>
              </div>
            </div>
          </div>
}
export default facebook;
