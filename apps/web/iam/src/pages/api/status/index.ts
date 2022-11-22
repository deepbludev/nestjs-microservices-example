import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log({ req: req.body })
  return res.status(200).json({ message: 'Next.js API operational' })
}
