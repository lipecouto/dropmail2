import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useApolloQuery } from "../server/Apollo_querys";
import MailIcon from '@mui/icons-material/Mail';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const MailList = (props, {updateCall = null}) =>{

    let MailExists = null;
    const [dataResp, setData] = useState({})
    const {data, errors, loading, reset} = useApolloQuery()
    
    if(updateCall){
      setData(updateCall)
    }
    
    if(errors){
            toast.error('Sessão expirou, gere um novo email',{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 1000,
                pauseOnHover: true,
            })
            return;
    }
    if(loading){
        return;
    }
    else{
        if(data){
        setData(data)
        toast.success('Email válido', {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 1000,
            paouseOnHover: true,
            })
        MailExists = 1        
        }
    } 

    const handleClickMail = (emailText) => {
        props.func(emailText)     
    }
    
   
    return (    <>
            {MailExists ? dataResp.session.mails.map((el, i) => (
                <Box key={i} id={`b1c${i}`}  sx={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '5px', width: '100%'}}>
                <IconButton key={2+i} id={`qi${i}`} sx={{borderRadius: 0, width: '100%', justifyContent: 'flex-start'}}
                onClick={handleClickMail(el.text)}>
                    <MailIcon key={3+i}id={`xm${i}`}/>
                    <Box id={i+23}  sx={{display: 'flex', flexDirection:'Column', justifyContent: 'space-around', alignItems: 'flex-start', padding: '5px'}}>            
                    
                    
                    <Typography key={4+i}id={`4tx${i}`}
                        sx={{fontSize: '14px', fontWeight: '700'}}
                    >
                    From:  {el.fromAddr}
                    </Typography>
                    <Typography key={5+i} id={`twt${i}`}
                        sx={{fontSize: '14px', fontWeight: '0'}}>
                    Subject: {el.headerSubject}
                    </Typography>
                    <Typography key={6+i} id={`yqt${i}`}
                        sx={{fontSize: '14px', fontWeight: '0'}}>
                    Text: {el.text.substring(0, 10)}...
                    </Typography>

                    </Box>
                </IconButton>
                </Box>
        )): null}
        </>
    )
} 

export default MailList