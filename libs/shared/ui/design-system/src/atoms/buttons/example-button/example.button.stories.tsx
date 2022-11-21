import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ExampleButton } from './example.button'

export default {
  component: ExampleButton,
  title: 'Design System/Atoms/ExampleButton',
} as ComponentMeta<typeof ExampleButton>

const Template: ComponentStory<typeof ExampleButton> = args => (
  <ExampleButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = { children: 'Example Button', color: 'red' }
