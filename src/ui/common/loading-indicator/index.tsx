'use client'

import { ListPhrases, ListPhrasesProps } from '@/lib/constants/text-const'
import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useFormStatus } from 'react-dom'

export default function LoadingIndicator({ content }: LoadingIndicatorProps) {
  const status = useFormStatus()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (status.pending)
    return (
      <Box
        sx={{
          position: 'fixed',
          top: isMobile ? '65%' : '55%',
          left: isMobile ? '50%' : '40%',
          transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          width: isMobile ? '90%' : 'auto',
          padding: isMobile ? '16px' : '0',
        }}
      >
        <Typography
          variant='h5'
          align='center'
          color='warning'
        >
          {content}
        </Typography>
      </Box>
    )
}

interface LoadingIndicatorProps {
  content: Extract<
    ListPhrasesProps,
    typeof ListPhrases.loggingIn | typeof ListPhrases.logoutIn
  >
}
