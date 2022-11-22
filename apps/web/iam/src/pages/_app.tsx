import '.tailwind/tailwind.css'

import { WebAppShell } from '@obeya/shared/ui/app-shell'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { trpc } from '../infra/trpc/trpc.config'

function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Welcome to Obeya!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <WebAppShell>
        <Component {...pageProps} />
      </WebAppShell>
    </>
  )
}

export default trpc.withTRPC(App)
