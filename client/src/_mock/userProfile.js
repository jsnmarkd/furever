import React from 'react';
import { useAuthContext } from '../providers/AuthProvider';

// const userProfile = () => {
//   const { user } = useAuthContext();

//   const profile = {
//     displayName: `${user.firstName} ${user.lastName}`,
//     username: user.username,
//     photoURL: user.user_profile_picture,
//   };

//   return profile;
// };

const userProfile = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default { userProfile };
