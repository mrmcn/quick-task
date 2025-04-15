'use client'

import { ListLoadingIndicatorProps } from '@/lib/constants/text-const'
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useFormStatus } from 'react-dom'

export default function LoadingIndicator({ content }: LoadingIndicatorProps) {
  const status = useFormStatus()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (status.pending)
    return (
      <Box
        sx={{
          '& > :not(style)': {
            position: 'fixed',
            top: isMobile ? '55%' : '65%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '30%' : '35%',
            padding: isMobile ? '16px' : '0',
          },
        }}
      >
        <Chip
          label={content}
          icon={<CircularProgress size={20} />}
          sx={{ bgcolor: 'secondary.light' }}
        />
      </Box>
    )
}

interface LoadingIndicatorProps {
  content: ListLoadingIndicatorProps
}
