import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const Profile = () => {
  const [banner, setBanner] = useState({ url: null, width: null, height: null });
  const [profilePic, setProfilePic] = useState(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const savedBanner = JSON.parse(localStorage.getItem('banner'));
    if (savedBanner) {
      setBanner(savedBanner);
    }

    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, []);

  const handleBannerDrop = ([file]) => {
    const url = URL.createObjectURL(file);
    const { width, height } = file;
    setBanner({ url, width, height });
    localStorage.setItem('banner', JSON.stringify({ url, width, height }));
  };

  const handleProfileDrop = ([file]) => {
    const url = URL.createObjectURL(file);
    setProfilePic(url);
    localStorage.setItem('profilePic', url);
  };

  const bannerDropzone = useDropzone({ onDrop: handleBannerDrop, accept: ['image/jpeg', 'image/png'] });
  const profileDropzone = useDropzone({ onDrop: handleProfileDrop, accept: ['image/jpeg', 'image/png'] });

  return (
    <div className="profile">
      <div
        className="banner"
        style={{ width: banner.width, height: banner.height }}
        {...bannerDropzone.getRootProps()}
      >
        <input {...bannerDropzone.getInputProps()} />
        {banner.url ? (
          <img src={banner.url} alt="Banner" style={{ width: '100%', height: '100%' }} />
        ) : (
          <p className='bannerClick'>+</p>
        )}
        {banner.url && (
          <div className="hover-box">Edit Banner</div>
        )}
      </div>


      <div
        className="profile-pic"
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
        {...profileDropzone.getRootProps()}
      >
        <input {...profileDropzone.getInputProps()} />
        {profilePic ? (
          <img src={profilePic} alt="Profile" style={{ width: '100px', height: '100px' }} />
        ) : (
          <p className='profileClick'>+</p>
        )}
        {profilePic && (
          <div className="hover-box">Edit Profile Picture</div>
        )}
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default Profile;