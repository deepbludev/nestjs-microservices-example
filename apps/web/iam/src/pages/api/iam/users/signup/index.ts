import { SignupUserResponseDTO } from '@obeya/contexts/iam/application'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupUserResponseDTO>
) {
  console.log({ req: req.body })

  const { data } = await axios.post<SignupUserResponseDTO>(
    'http://localhost:3000/iam/users/signup',
    req.body
  )

  console.log({ data })

  res.status(200).json({ id: '123' })
}
