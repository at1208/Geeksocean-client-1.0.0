const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    compress: true,
  publicRuntimeConfig: {
    APP_NAME:'Geeks Ocean',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: '',
    PRODUCTION: false,
    GOOGLE_CLIENT_ID: '384115946551-cohmqe9rrp9pnl5uf4jihvfpo99q7jbn.apps.googleusercontent.com',
    FB_APP_ID:154959638896320,
    DOMAIN_PRODUCTION: 'GeeksOcean.com',
    DOMAIN_DEVELOPMENT: 'GeeksOcean.com'
  }
})
