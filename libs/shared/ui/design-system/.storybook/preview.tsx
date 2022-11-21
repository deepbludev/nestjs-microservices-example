import './tailwind.css'

import { Title } from '@mantine/core'
import React from 'react'

import { UiFrameworkProvider } from '../src'

export const parameters = { layout: 'fullscreen' }

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <UiFrameworkProvider>
      <div className="m-10">{props.children}</div>
    </UiFrameworkProvider>
  )
}

export const decorators = [
  (renderStory: () => React.ReactNode) => (
    <ThemeWrapper>
      <Title>Storybook here</Title>
      {renderStory()}
    </ThemeWrapper>
  ),
]
