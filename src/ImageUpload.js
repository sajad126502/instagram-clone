import { Button, Input } from '@mui/material'
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc,collection, addDoc } from "firebase/firestore"; 
import "./imageUpload.css"
import { Modal,Box,Typography } from '@mui/material';


import React, { useEffect, useState } from 'react'
import { db, storage, ref, uploadBytes } from "./fire"
function ImageUpload() {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState(null)
    const [progress, setProgress] = useState(0)
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   
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
   
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            console.log("xshxhs")

        }

    }
     
    const handleUpload = () => {
        const storageRef = ref(storage, `images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        // 'file' comes from the Blob or File API


        uploadTask.on("state_change",
            (snapShot) => {
                const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
                setProgress(progress)
            }, (err) => {
                alert(err.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    const docRef = await addDoc(collection(db, "posts"), {
                        timeStamp: "",
                        caption: caption,
                        imageUrl: url,
                        username: localStorage.getItem("username")
                      });
                      setCaption("")
                      setProgress(0)
                      handleClose()


              
                    
                    
                })
            }

        )

    }
    return (
        <div className='imageUpload_model'>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'></img>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <div className='imageUplaod_container'>
            <progress value={progress} max="100"></progress>
            <Input type="text" placeholder='Enter the caption' onChange={(e) => { setCaption(e.target.value) }} value={caption} />
            <Input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >Upload</Button>
           
        </div>
          </Typography>
        </Box>
      </Modal>
      <Button onClick={handleOpen}>Upload</Button>
        </div>

    )
}

export default ImageUpload