import { useNotifications } from '../hooks/'
import api from "../services/api";

const usePigeonApi = () => {
  const notifications = useNotifications()
  return {
    getTeams: async (...args) => {
      try {
        const res = await api.getTeams(...args)
        return res.data
      }
      catch(e) {
        let message = 'Something went wrong'
        switch(e && e.response && e.response.status) {
          case 404:
            message = 'Resource not found'
            break
          case 500:
            message = 'Internal Server Error'
            break
        }
        notifications.error(message)
        throw e
      }
    }
  }
}

export default usePigeonApi