import { Button as MuiButton, CircularProgress } from '@mui/material'

const Button = ({ children, loading = false, ...props }) => (
  <MuiButton disabled={loading} {...props} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, ...props.sx }}>
    {loading ? <CircularProgress size={24} color="inherit" /> : children}
  </MuiButton>
)

export default Button