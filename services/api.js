import axios from 'axios'

const createApi = (token) => {
  const headers = {}
  if (token) {
    headers['Authorization'] = token
  }
  return {
    getTeams: async ({page = 0, pageSize = 5}= {}) => {
        return axios.get('/api/teams', { headers, params: { page, pageSize } })
    },
    createTeam: async ({ name }) => {
        return axios.post('/api/teams', { name },  { headers })
    },
    logIn: async (username, password) => {
        const res = await axios.post('api/login')
        headers['Authorization'] = res.data
        return res
    },
    logOut: async () => {
        delete headers['Authorization']
    },
  }
}

export default createApi('somefaketoken')