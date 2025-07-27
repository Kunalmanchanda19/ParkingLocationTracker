import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface AppBackdropProps {
    show: boolean;
}
const AppBackdrop: React.FC<AppBackdropProps> = ({ show }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                // color:'black',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={show}
        >
            <CircularProgress color="inherit" title="Loading..." />
        </Backdrop>
    );
};

export default AppBackdrop;
