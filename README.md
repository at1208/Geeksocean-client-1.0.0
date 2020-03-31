# GeeksOcean.com

    Steps to setup locally

1.clone this repository
<br />
2.run command
<br />
     npm install
<br />
 inside root directory of this cloned repository.
<br />
3.create next.config.js file inside root directory ...
   and write all these things inside nex.config.js

    const withCSS = require('@zeit/next-css');
    module.exports = withCSS({
    publicRuntimeConfig: {
    APP_NAME:'Geeks Ocean',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'http://Geeksocean.com/api',
    PRODUCTION: false,
    GOOGLE_CLIENT_ID: '',
    FB_APP_ID:'',
    DOMAIN_PRODUCTION: 'Geeksocean.com',
    DOMAIN_DEVELOPMENT: 'Geeksocean.com'
  },
})

    Steps to run in production

run command
<br />
      npm run build
<br />
      npm start
<br />

listen to port 3000
