import { timeout } from '../../utils'

let teams = [
  {id: 1, name: 'team 1'},
  {id: 2, name: 'team 2'},
  {id: 3, name: 'team 3'},
  {id: 4, name: 'team 4'},
  {id: 5, name: 'team 5'},
  {id: 6, name: 'team 6'},
  {id: 7, name: 'team 7'},
  {id: 8, name: 'team 8'},
  {id: 9, name: 'team 9'},
  {id: 10, name: 'team 10'},
]

export default async (req, res) => {
  const {
    query: { page = 0, pageSize = 5 },
    method,
    headers
  } = req

  await timeout(1500)

  if (!headers.authorization) {
    res.status(401).end(`Unauthorized`)
    return
  }

  switch (method) {
    case 'POST':
      const team = {
        name: req.body.name,
      }
      teams.push(team)
      res.status(201).json(team)
      break
    case 'GET':
      const start = page * pageSize
      const stop = (page + 1) * pageSize
      res.status(200).json(teams.slice(start, stop))
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}