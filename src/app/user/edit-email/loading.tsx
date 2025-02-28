import Box from '@mui/material/Box'
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
        Edit email
      </Typography>
      <TextField
        autoFocus
        label='Email'
        type='text'
        required
        fullWidth
        margin='dense'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '10vh',
        }}
      >
        <Fab
          variant='extended'
          color='primary'
          sx={{
            width: '100%',
            maxWidth: '300px',
          }}
        >
          Save
        </Fab>
      </Box>
    </Container>
  )
}
