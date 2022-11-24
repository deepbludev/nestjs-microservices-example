import { createGetInitialProps } from '@mantine/next'
import { FontsProvider } from '@obeya/shared/ui/design-system'
import { Head, Html, Main, NextScript } from 'next/document'

export function Document() {
  return (
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
}

Document.getInitialProps = createGetInitialProps()

export default Document
