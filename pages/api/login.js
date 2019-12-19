import { timeout } from '../../utils'

export default async (req, res) => {
  const {
    method,
  } = req

  await timeout(1500)

  switch (method) {
    case 'POST':
      res.status(201).json(Date.now())
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}