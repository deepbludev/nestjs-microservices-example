/* eslint-disable */
export default {
  displayName: 'contexts-iam-ui-workspaces',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  // transform: {
  //   '^.+\\.[tj]sx?$': [
  //     '@swc/jest',
  //     { jsc: { transform: { react: { runtime: 'automatic' } } } },
  //   ],
  // },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/contexts/iam/ui/workspaces',
}
