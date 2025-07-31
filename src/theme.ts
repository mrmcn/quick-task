'use client'

import { blue, grey, red, yellow } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

/**
 * @constant theme
 * @description Configuration object for the Material-UI theme.
 * This theme defines global styles for the application, including typography,
 * color palette, and style overrides for individual components.
 */
const theme = createTheme({
  // Typography settings.
  typography: {
    // Sets the font family for the entire theme, using a CSS variable
    // which is defined in the font configuration (e.g., next/font).
    fontFamily: 'var(--font-roboto)',
  },
  // Color palette settings.
  palette: {
    // Primary color palette.
    primary: {
      light: yellow[100], // Light shade of yellow.
      main: yellow[500], // Main shade of yellow.
      dark: yellow[800], // Dark shade of yellow.
      contrastText: grey[800], // Text color that contrasts well with the main yellow.
    },
    // Secondary color palette.
    secondary: {
      light: blue[100], // Light shade of blue.
      main: blue[500], // Main shade of blue.
      dark: blue[900], // Dark shade of blue.
      contrastText: grey[800], // Text color that contrasts well with the main blue.
    },
  },
  // Style overrides for specific Material-UI components.
  components: {
    // Style overrides for MuiInputLabel (labels for input fields).
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blue[500], // Default label color.
          '&.Mui-focused': {
            color: blue[700], // Label color when the input field is focused.
          },
          '&.Mui-error': {
            color: red[900], // Label color when the input field has an error.
          },
        },
      },
    },
    // Style overrides for MuiTextField (text input fields).
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: grey[900], // Main text color inside the input field.
          },
          '& .MuiInputLabel-root': {
            color: grey[600], // Hint/placeholder text color inside the input field.
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: blue[500], // Border color of the input field in its default state.
            },
            '&.Mui-focused fieldset': {
              borderColor: blue[800], // Border color of the input field when focused.
            },
            '&.Mui-error fieldset': {
              borderColor: red[700], // Border color of the input field when it has an error.
            },
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: red[700], // Color of the helper text (error message).
          },
          backgroundColor: '#fff', // Background color of the text field.
        },
      },
    },
  },
})

export default theme // Export the created theme for use in the application.
