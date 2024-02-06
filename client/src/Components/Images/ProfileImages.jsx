import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Profile = () => {
  const [bannerPic, setbannerPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleBannerDrop = ([file]) => setbannerPic(file);
  const handleProfileDrop = ([file]) => setProfilePic(file);

  const bannerDropzone = useDropzone({ onDrop: handleBannerDrop, accept: {"image/jpeg" : [], "image/png" : []} });
  const profileDropzone = useDropzone({ onDrop: handleProfileDrop, accept: {"image/jpeg" : [], "image/png" : []}});

  return (
    <div className="profile">
      <div className="banner" {...bannerDropzone.getRootProps()}>
        <input {...bannerDropzone.getInputProps()} />
        {bannerPic ? (
          <img src={URL.createObjectURL(bannerPic)} alt="Banner" style={{ width: '100%' }} />
        ) : (
          <p>Click here to add a banner!</p>
        )}
      </div>
      
      <div className="profile-pic" {...profileDropzone.getRootProps()}>
        <input {...profileDropzone.getInputProps()} />
        {profilePic ? (
          <img src={URL.createObjectURL(profilePic)} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '0%' }} />
        ) : (
          <p>Click here to add a profile picture!</p>
        )}
      </div>
      <div className= 'divider'></div>
    </div>
  );
};

export default Profile;