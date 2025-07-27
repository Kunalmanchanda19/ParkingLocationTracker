import { Grid, Typography } from '@mui/material'
import React from 'react'

interface HeaderbarProps {
  name:string
  subtitle:string
}

const HeaderBar:React.FC<HeaderbarProps> = ({name,subtitle}) => {
  return (
    <Grid
          data-testid="fc-header-panel"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="header-panel"
          sx={{ padding: 2, background: '#EAEAEA' }}
        >
          <Grid item xs={12}  >
            <Typography variant="h5" align='center' sx={{ }} >
              {/* {title} */}
              {name}
              
            </Typography >
            <Typography variant="body2" align='center' color="text.secondary">
            {subtitle}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            {/* {!!HeaderComponent && <HeaderComponent />} */}
          </Grid>
        </Grid>
  )
}

export default HeaderBar