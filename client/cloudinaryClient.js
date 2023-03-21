const CLOUD_NAME = 'dq5ggqhz4';
const API_KEY = '113363244764741';

// It's okay for these to be public on client-side JS
// You just don't ever want to leak your API Secret

document.querySelector('#upload-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get('/get-signature');

  const data = new FormData();
  data.append('file', document.querySelector('#file-field').files[0]);
  data.append('api_key', api_key);
  data.append('signature', signatureResponse.data.signature);
  data.append('timestamp', signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total);
    },
  });
  console.log(cloudinaryResponse.data);

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature,
  };

  axios.post('/do-something-with-photo', photoData);

});






// import {fill} from "@cloudinary/url-gen/actions/resize";
// import {CloudinaryImage} from '@cloudinary/url-gen';

// const myImage = new CloudinaryImage('sample', {cloudName: 'dq5ggqhz4'}).resize(fill().width(100).height(150));


// return (
//   <div>
//     <AdvancedImage cldImg={myImage} />
//   </div>
// )

// function showUploadWidget() {
//   cloudinary.openUploadWidget(
//     {
//       cloudName: '<cloud name>',
//       uploadPreset: '<upload preset>',
//       sources: ['local', 'url'],
//       googleApiKey: '<image_search_google_api_key>',
//       showAdvancedOptions: true,
//       cropping: false,
//       multiple: false,
//       defaultSource: 'local',
//       styles: {
//         palette: {
//           window: '#FFFFFF',
//           windowBorder: '#90A0B3',
//           tabIcon: '#0078FF',
//           menuIcons: '#5A616A',
//           textDark: '#000000',
//           textLight: '#FFFFFF',
//           link: '#0078FF',
//           action: '#FF620C',
//           inactiveTabIcon: '#0E2F5A',
//           error: '#F44235',
//           inProgress: '#0078FF',
//           complete: '#20B832',
//           sourceBg: '#E4EBF1',
//         },
//         fonts: { default: null, 'sans-serif': { url: null, active: true } },
//       },
//     },
//     (err, info) => {
//       if (!err) {
//         console.log('Upload Widget event - ', info);
//       }
//     }
//   );
// }