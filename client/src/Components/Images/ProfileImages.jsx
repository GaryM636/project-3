import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
  banners: '++id, url, width, height',
  profilePics: '++id, url',
});

const Profile = () => {
  const [banner, setBanner] = useState({ url: null, width: null, height: null });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const savedBanner = JSON.parse(localStorage.getItem('banner'));
    if (savedBanner) {
      setBanner(savedBanner);
    } else {
      setBanner({ url: null, width: null, height: null });
    }
  
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    } else {
      setProfilePic(null);
    }
  }, []);

  const handleBannerDrop = ([file]) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      const { width, height } = file;
      setBanner({ url, width, height });
      localStorage.setItem('banner', JSON.stringify({ url, width, height }));
    };
    reader.readAsDataURL(file);
  };
    
  const handleProfileDrop = ([file]) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setProfilePic(url);
      localStorage.setItem('profilePic', url);
    };
    reader.readAsDataURL(file);
  };

  const bannerDropzone = useDropzone({ onDrop: handleBannerDrop, accept:  {
    'image/*': ['.jpeg', '.jpg', '.png'],
   } });
  const profileDropzone = useDropzone({ onDrop: handleProfileDrop, accept:  {
    'image/*': ['.jpeg', '.jpg', '.png'],
   } });

  return (
    <div className="profile">
      <div className="banner" {...bannerDropzone.getRootProps()}>
        <input {...bannerDropzone.getInputProps()} />
        {banner.url ? (
          <img src={banner.url} alt="Banner" style={{ width: '100%', height: '100%' }} />
        ) : (
          <p className="bannerClick">Upload Banner</p>
        )}
        {banner.url && <div className="hover-box">Edit Banner</div>}
      </div>

      <div className="profile-pic" {...profileDropzone.getRootProps()}>
        <input {...profileDropzone.getInputProps()} />
        {profilePic ? (
          <img src={profilePic} alt="Profile" style={{ width: '100px', height: '100px' }} />
        ) : (
          <p className="profileClick">Upload Profile Picture</p>
        )}
        {profilePic && <div className="hover-box">Edit Profile Picture</div>}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default Profile;