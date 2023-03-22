import { React, useEffect, useRef } from "react";




export default function AddDogCard() {
const uploadWidgetRef = useRef();

  useEffect(() => {
    uploadWidgetRef.current = window.cloudinary.createUploadWidget({
      cloudName: 'my_cloud_name', 
      uploadPreset: 'my_preset'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
        }
      }
    )
  
  },[])

  function showUploadWidget() {
    uploadWidgetRef.current.open()
  }
  return <button type="button" onClick={showUploadWidget}>
   Upload
  </button>
}


