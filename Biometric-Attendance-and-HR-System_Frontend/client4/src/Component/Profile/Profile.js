import React, { useState } from 'react';
import './Profile.css'; // Create a CSS file for styling if needed
import { MdOutlineBusinessCenter, MdOutlineEmail ,MdOutlinePhotoCamera} from 'react-icons/md';
import p1 from '../../assets/image.png';

function Profile() {
  const [userName, setUserName] = useState('Kebede Chala');
  const [email, setEmail] = useState('kebedeChala@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(p1);

  const handleEmailChange = () => {
    if (newEmail) {
      setEmail(newEmail);
      setNewEmail('');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword) {
      setNewPassword('');
      setIsChangingPassword(false);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <div className='box3'>
        <img src={profilePicture} alt='profile' className='employee-pic' />
        <div className="image-up">
                                <label htmlFor="profilePicture">
                                    
                                      <MdOutlinePhotoCamera className="image-ic"/>
                                    
                                </label>
                                <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handlePictureChange} />
                            </div>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px', fontFamily: 'Lexend' }}>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            style={{ fontFamily: 'Lexend', fontSize: '30px', border: 'none', borderBottom: '1px solid #333', marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
            <MdOutlineBusinessCenter /> HR Manager
          </div>
          <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
            <MdOutlineEmail /> {email}
          </div>
        </div>
        

        <button className='profile-container-btn' onClick={() => setIsChangingPassword(!isChangingPassword)}>
          {isChangingPassword ? 'Cancel' : 'Change Password / Email'}
        </button>
      </div>

      {isChangingPassword && (
        <div className='change-pass-email'>
          <div className="change-email-container">
            <h2>Change Email</h2>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <button className='btn-pro' onClick={handleEmailChange}>Update Email</button>
          </div>
          <div className="change-password-container">
            <h2>Change Password</h2>
            <input
              type="password"
              placeholder="Enter Current password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New password"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
            />
            <button className='btn-pro' onClick={handlePasswordChange}>Update Password</button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default Profile;