'use client'

import { ListLoadingIndicatorProps } from '@/lib/constants/text-const'
import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
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
          '& > :not(style)': {
            position: 'fixed',
            top: isMobile ? '50%' : '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : '100%',
            padding: isMobile ? '16px' : '0',
          },
        }}
      >
        <Card sx={{ maxWidth: 300, bgcolor: 'secondary.light' }}>
          <CardContent>
            <Typography
              variant='h5'
              align='center'
            >
              {content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
}

interface LoadingIndicatorProps {
  content: ListLoadingIndicatorProps
}
