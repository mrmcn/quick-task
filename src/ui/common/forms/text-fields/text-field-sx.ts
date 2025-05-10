export default function textFieldSx(fontSize: string) {
  return {
    '& .MuiInputBase-input': {
      fontSize: fontSize,
    },
    '& .MuiInputBase-root': {
      bgcolor: 'primary.light',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  }
}
