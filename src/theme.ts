'use client'
import { blue, grey, red, yellow } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      light: yellow[100],
      main: yellow[500],
      dark: yellow[800],
      contrastText: grey[800],
    },
    secondary: {
      light: blue[100],
      main: blue[500],
      dark: blue[800],
      contrastText: grey[800],
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blue[500],
          '&.Mui-focused': {
            color: blue[700],
          },
          '&.Mui-error': {
            color: red[900],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: grey[900], // Main text color
          },
          '& .MuiInputLabel-root': {
            color: grey[600], // Hint text color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: blue[500], // Standard border color
            },
            '&.Mui-focused fieldset': {
              borderColor: blue[800], // Border color on focus
            },
            '&.Mui-error fieldset': {
              borderColor: red[700], // Border color on error
            },
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: red[700], // Error text color
          },
          backgroundColor: '#fff', // TextField background color
        },
      },
    },
  },
})

export default theme
