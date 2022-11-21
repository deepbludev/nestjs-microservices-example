import './tailwind.css'

import React from 'react'

import {
  FontsProvider,
  NotificationsProvider,
  UiFrameworkProvider,
} from '../src'

export const parameters = { layout: 'fullscreen' }

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <FontsProvider />
      </head>
      <UiFrameworkProvider>
        <NotificationsProvider>
          <div className="m-10">{props.children}</div>
        </NotificationsProvider>
      </UiFrameworkProvider>
    </>
  )
}

export const decorators = [
  (renderStory: () => React.ReactNode) => (
    <ThemeWrapper>{renderStory()}</ThemeWrapper>
  ),
]
