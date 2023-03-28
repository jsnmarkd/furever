import React, { useEffect, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Button, Input } from '@mui/material';
import axios from 'axios';

// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './slideshow.css';

import { useAuthContext } from '../../providers/AuthProvider';

const Slideshow = () => {
  const { user } = useAuthContext();

  const [imageUrls, setImageUrls] = useState(JSON.parse(localStorage.getItem('ImageUrls')) || []);

  useEffect(() => {
    localStorage.setItem('ImageUrls', JSON.stringify(imageUrls));
  }, [imageUrls]);


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
        let url = data.secure_url.split('/upload/');
        url = url.join('/upload/w_600,h_600,c_fill/');

        setImageUrls((prevImageUrls) => [...prevImageUrls, url]);
        console.log('IMAGE:', imageUrls);
        const uploadedImg = imageUrls[imageUrls.length - 1];
        console.log('IMAGEUploaded:', uploadedImg);

        axios
          .post(`/carousels/user/${user.id}`, {
            user_id: user.id,
            carousel_pic: uploadedImg,
          })
          .then((res) => {
            console.log('DATA:', res.data);
          })
          .catch((error) => {
            console.error('error', error);
          });
      })
      .catch((error) => console.error(error));
  };



  return (
    <>
      <div className="slider-container">
        <Carousel showArrows showThumbs={false} autoPlay infiniteLoop>
          {imageUrls.map((imageUrl) => (
            <div className="each-slide" key={imageUrl}>
              <Image publicId={imageUrl} cloudName={'dq5ggqhz4'}>
                <Transformation gravity="center" />
              </Image>
            </div>
          ))}
        </Carousel>
      </div>
      <Input className="input-carousel" type="file" onChange={handleImageUpload} />
    </>
  );
};

export default Slideshow;
