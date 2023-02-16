import { Box } from "@mui/system";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
const MailBody = ({MailBody = ''}) =>{



    return (
        <Grid2 sx={{display: 'flex', flexDirection: 'column',  alignItems: 'center', height: '100vh', padding: '0', width: 'auto'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Grid2 sx={{paddingLeft: '12px', paddingTop: '10px', height: '5vh'}}>
                
            </Grid2>
            <Grid2 sx={{display: 'flex', paddingLeft: '12px' , justifyContent:'flex-start', alignItems: 'flex-start', padding: '10px'}} >
                <Typography variant="body1" align='left' mt={0.5}> 
                    {MailBody}
                </Typography>
            </Grid2>
        </Box>
        
        </Grid2>
    )
}

export default MailBody