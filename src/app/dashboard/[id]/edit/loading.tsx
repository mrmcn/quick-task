import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
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
        Edit task
      </Typography>
      <TextField
        label='Title'
        type='text'
        required
        margin='dense'
      />
      <TextField
        label='Details'
        type='text'
        multiline
        rows={4}
        required
        margin='dense'
      />
      <Typography
        variant='caption'
        sx={{ ml: '1vw' }}
      >
        Priority
      </Typography>
      <ToggleButtonGroup
        size='small'
        fullWidth
        exclusive
      >
        <ToggleButton
          color='primary'
          value='low'
        >
          low
        </ToggleButton>
        <ToggleButton
          color='error'
          value='high'
        >
          high
        </ToggleButton>
      </ToggleButtonGroup>
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
