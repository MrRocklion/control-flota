import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

export default function GpsPage(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color:'#fff',
    }));


    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }} >
                        <Item>size=8</Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} >
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={12}>
                        <Item>size=8</Item>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    );

}