import { React, useEffect, useRef, useState } from "react";

export default function UploadDogImg(props) {
  const [uploadURL, setUploadURL] = useState('');



  const uploadWidgetRef = useRef();


  useEffect(() => {
    uploadWidgetRef.current = window.cloudinary.createUploadWidget({
      cloudName:'dq5ggqhz4',
      uploadPreset: 'boedy35d'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info.url);
        console.log("resssssulllt:", result)
        setUploadURL(result.info.url);
        props.setUploadURL(result.info.url);
      }
    }
    )

  }, [])

  function showUploadWidget() {
    uploadWidgetRef.current.open()
  }
  return <button type="button" onClick={showUploadWidget}>
    Upload Photo
  </button>
}




// import { Avatar, Button as MuiButton } from "@material-ui/core";
// import DeleteIcon from '@mui/icons-material/Delete'
// import UploadIcon from '@mui/icons-material/Upload'
// import { spacing } from "@material-ui/system";
// import React, { createRef, useState } from "react";
// import styled from "styled-components";
// import styled from 'styled-components';

// const Button = styled(MuiButton)(spacing);
// const CenteredContent = styled.div
// 'text-align: center;';

// const BigAvatar = styled(Avatar)
// "margin-left: 40%; border: 1px solid grey; margin-top: 10%; box-shadow: 1px 1px 15px -5px black;";

// const AvatarUpload = (props) => {
//   const [image, _setImage] = useState();
//   const inputFileRef = createRef();
//   const cleanup = () => {
//     URL.revokeObjectURL(image && props.image);
//     inputFileRef.current.value = null;
//   };
//   const setImage = (newImage) => {
//     if (image) {
//       cleanup();
//     }
//     _setImage(newImage);
//   };
//   const handleOnChange = (event) => {
//     const newImage = event.target.files[0];
//     if (newImage) {
//       setImage(URL.createObjectURL(newImage));
//     }
//     props.imageUpload(event)
//   };

//   return (
//     <CenteredContent>
//       <BigAvatar
//         alt="Avatar"
//         src={image}
//         style={{ width: "110px", borderRadius: "50%", height: "100px" }}
//       />
//       <input
//         ref={inputFileRef}
//         accept="image/*"
//         hidden
//         id="avatar-image-upload"
//         type="file"
//         onChange={handleOnChange}
//       />
//       <label htmlFor="avatar-image-upload">
//         <Button
//           color="primary"
//           component="span"
//           style={{ marginBottom: "100px", width: "130px", borderRadius: "25px", fontFamily: "arial", textAlign: "center", padding: "5px", }} >
//           {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
//           {image ? "Uploaded" : "Upload"}
//         </Button>
//       </label>
//     </CenteredContent>
//   );
// };








// import AvatarUpload from ./imageUpload;
// import React, {useState} from "react";
// import axios from "axios";
// import Button from '@material-ui/core/Button';

// const Imgupload = (props) => {

//   const [logo, setLogo] = useState('');
//   const [imageUpload,] = useState({});
//   const [, setImg] = useState({});

//   const handleImg = (e) => {
//     if (e.target.files[0] {
//       setImg({
//         src: URL.createObjectURL(e.target.files[0]),
//         alt: e.target.files[0].name
//       });
//       setLogo(e.target.files[0]);
//     });
//     return data;

//   }
//   const handleSubmit = async (e) => {
//     imageUpload.image = logo;
//     await profileUpload(logo);
//   }

//   return (
//     <>
//       <div>
//         <h1 style={{ textAlign: "center", color: "grey", marginTop: "90px", marginRight: "130px" }}>
//           Image Upload in Cloudinary
//         </h1>
//         <div style={{ marginLeft: "50px", marginTop: "50px" }}>
//           <AvatarUpload imageUpload={handleImg} image={imageUpload.image} />
//         </div>
//         <div style={{
//           marginLeft: "10px", marginBottom: "50px", marginTop: "-135px", borderRadius: "25px", fontFamily:
//             arial
//         }}>
//           <Button type="submit" color="primary" onClick={(e) => handleSubmit(e)}>
//             Submit
//           </Button>

//         </div>
//       </div>
//     </>
//   );
// }