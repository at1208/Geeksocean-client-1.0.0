import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-161776444-1');
        `
      };
    }
  }

render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="yes"/>
          <meta name="apple-mobile-web-app-title" content="Geeks Ocean"/>
          <link rel="alternate" href="https://geeksocean.com" hrefLang="en-us" />
          <link
            rel="stylesheet"
            defer
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link rel="dns-prefetch" href="https://geeksocean.com" />
          <link rel="preconnect" href="https://geeksocean.com" crossorigin />

          <link href="https://fonts.googleapis.com/css?family=Gruppo|Philosopher|Playfair+Display+SC|Spectral+SC|Trirong&display=swap" rel="stylesheet" />
          <link defer href="https://fonts.googleapis.com/css?family=Halant:700|Lateef|Lato|Philosopher|Prata|Source+Sans+ProGotu|Marmelad|EB+Garamond&display=swap" rel="stylesheet" />
          <link rel="icon" href="/static/images/Logo.svg" />
          <script defer async src="https://www.googletagmanager.com/gtag/js?id=UA-161776444-1"></script>
          <script  defer dangerouslySetInnerHTML={this.setGoogleTags()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
