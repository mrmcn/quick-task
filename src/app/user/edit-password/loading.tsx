import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function Loading() {
  return (
    <Container
      component='form'
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '15vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        component='h1'
        variant='h4'
        gutterBottom
        align='center'
      >
        Reset password
      </Typography>
      <TextField
        label='password'
        required
        fullWidth
        margin='dense'
      />
      <Box
        sx={{
          '& > :not(style)': {
            position: 'fixed',
            top: '85%',
            left: '70%',
          },
        }}
      >
        <Fab
          component={Button}
          variant='extended'
          color='primary'
          aria-label='add'
        >
          Save
        </Fab>
      </Box>
    </Container>
  )
}
