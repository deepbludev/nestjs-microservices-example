import { createGetInitialProps } from '@mantine/next'
import { Head, Html, Main, NextScript } from 'next/document'

export const Document = () => (
  <Html lang="en">
    <Head></Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

Document.getInitialProps = createGetInitialProps()

export default Document
