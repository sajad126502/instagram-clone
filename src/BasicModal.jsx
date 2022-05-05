import  {React,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {db,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "./fire"
import { getAuth, updateProfile } from "firebase/auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  maxWidth:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function BasicModal() {
  const [signUpData,setSignUpData]=useState({username:"",email:"",password:""})
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [signIn,setSignIn]=useState(false)
  const [user,setUser]=useState(null)
  const Change=(e)=>{
      setSignUpData({...signUpData,[e.target.name]:e.target.value})
    

  }
  const sendData=()=>{
  createUserWithEmailAndPassword(auth,signUpData.email,signUpData.password)
  .then((authUser)=>{
    updateProfile(authUser.user, {
      displayName:signUpData.username
    }).then(() => {
        // Profile updated!
       localStorage.setItem("username",authUser.user.displayName)
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error)
        // ...
      });
      

      
      })
.catch((e)=>{
      return alert(e.message)
  })
  }



  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        
        setUser(authUser)
       
    }
      else{
        setUser(null)
      }
    })
  },[user])

  const signInAcc=()=>{
    signInWithEmailAndPassword(auth,signUpData.email,signUpData.password).catch((e)=>{
      alert(e.message)
    })
  }


  return (

    
    <div>

      {user==null?<div><Button onClick={()=>{setSignIn(false);handleOpen()}}>Sign Up</Button><Button onClick={()=>{setSignIn(true);handleOpen()}}>Sign In</Button></div>:<Button onClick={()=>{auth.signOut();}}>LogOut</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" style={{display:"flex",flexDirection:"column"}}>
                {signIn?null:<Input onChange={Change} name="username" value={signUpData.username}  type="text"  placeholder='Username'/>}
                <Input onChange={Change} name="email" value={signUpData.email} type="email" placeholder="Email"/>
                <Input onChange={Change} name="password"value={signUpData.password} type="password" placeholder='Password' />
                {!signIn?<Button onClick={()=>{handleClose();sendData()}}>Sign Up</Button>:<Button onClick={()=>{signInAcc();handleClose();}}>Sign In</Button>}
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export {BasicModal}
