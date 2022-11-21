import { createGetInitialProps } from '@mantine/next'
import { FontsProvider } from '@obeya/shared/ui/app-shell'
import { Head, Html, Main, NextScript } from 'next/document'

export const Document = () => (
  <Html lang="en">
    <Head>
      <FontsProvider />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

Document.getInitialProps = createGetInitialProps()

export default Document
