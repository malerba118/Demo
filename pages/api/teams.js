import { timeout, range } from '../../utils'

let teams = range(150).map(i => ({id: i, name: `team ${i}`}))

export default async (req, res) => {
  const {
    query,
    method,
    headers
  } = req

  const page = Number(query.page) || 0
  const pageSize = Number(query.pageSize) || 5

  await timeout(750)

  if (!headers.authorization) {
    res.status(401).end(`Unauthorized`)
    return
  }

  const rand = Math.random()

  if (rand < .15) {
    res.status(500).end(`Something went wrong`)
    return
  }
  else if (rand < .3) {
    res.status(404).end(`Resource not found`)
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
      const stop = start + pageSize
      res.status(200).json({
        teams: teams.slice(start, stop),
        page
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}