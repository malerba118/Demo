import React from 'react'
import Button from '@material-ui/core/Button'
import { PulseLoader } from 'react-spinners'

const AsyncButton = props => {
  const { pending, children, ...other } = props

  return (
    <Button
      disabled={pending}
      {...other}
      style={styles.root}
    >
      {pending && (
        <div style={styles.loader}>
          <PulseLoader size={6} />
        </div>
      )}
      {children}
    </Button>
  )
}

const styles = {
  root: {
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default AsyncButton