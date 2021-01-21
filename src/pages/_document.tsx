import React, { Fragment, ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets, withTheme } from '@material-ui/core/styles';

import { GA_TRACKING_ID } from 'src/utils/gtag';

const { NODE_ENV } = process.env;

const renderGAScript = (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
              `,
      }}
    />
  </>
);

class MyDocument extends Document<{ theme: any }> {
  render(): ReactElement {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content={this.props.theme.palette.primary.main} />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          {NODE_ENV === 'production' && renderGAScript}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </Fragment>,
    ],
  };
};

export default withTheme(MyDocument);
