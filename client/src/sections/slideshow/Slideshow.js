import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './slideshow.css';

const Slideshow = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    const cloudName = 'dq5ggqhz4';
    formData.append('file', file);
    formData.append('upload_preset', 'boedy35d');
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrls((prevImageUrls) => [...prevImageUrls, data.secure_url]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <input type="file" onChange={handleImageUpload} />
      {/* <Slide> */}
        <Carousel >
        {imageUrls.map((imageUrl) => (
          <div className="each-slide" key={imageUrl}>
            <Image publicId={imageUrl} cloudName={'dq5ggqhz4'} width="900" height="900">
              <Transformation width="1024=" height="768" crop="fill" gravity="center" />
            </Image>
          </div>
         ))} 
         </Carousel>
      {/* </Slide> */}
    </>
  );
};

export default Slideshow;

// import sprite from "./sprite.svg";

