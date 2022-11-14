export const RPC = {
  timeout: 10000,
  iam: {
    status: { query: 'query:iam.status' },
    users: {
      signup: { command: 'cmd:iam.users.signup' },
      login: { command: 'cmd:iam.users.login' },
    },
  },
} as const
