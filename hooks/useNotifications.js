import { useSnackbar } from 'notistack'

const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar()

  return {
    info: message => enqueueSnackbar(message, { variant: 'info' }),
    success: message => enqueueSnackbar(message, { variant: 'success' }),
    error: message => enqueueSnackbar(message, { variant: 'error' }),
    warn: message => enqueueSnackbar(message, { variant: 'warning' }),
  }
}

export default useNotifications