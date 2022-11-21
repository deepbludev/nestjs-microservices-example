import './tailwind.css'

import React from 'react'

import { FontsProvider, UiFrameworkProvider } from '../src'

export const parameters = { layout: 'fullscreen' }

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <FontsProvider />
      </head>
      <UiFrameworkProvider>
        <div className="m-10">{props.children}</div>
      </UiFrameworkProvider>
    </>
  )
}

export const decorators = [
  (renderStory: () => React.ReactNode) => (
    <ThemeWrapper>{renderStory()}</ThemeWrapper>
  ),
]
