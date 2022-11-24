import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log({ req: req.body })

  const { data } = await axios<{
    message: string
  }>('http://localhost:3000/status')

  res.status(200).json(data)
}
