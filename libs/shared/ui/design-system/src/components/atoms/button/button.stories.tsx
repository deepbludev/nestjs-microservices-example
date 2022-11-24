import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './button'

export default {
  component: Button,
  title: 'Design System/Atoms/Button',
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}>Obeyaka Button</Button>
)

export const Base = Template.bind({})
Base.args = { color: 'action', size: 'sm' }
