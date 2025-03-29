import Container from '@mui/material/Container'

// Used in app/ui/form-wrapper-action-state/ index.tsx and app/ui/form-wrapper-action-state/text-field/skeleton

export default function FormContainer({ children }: FormWrapperProps) {
  return (
    <Container
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '15vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  )
}

interface FormWrapperProps {
  children: React.ReactNode
}
