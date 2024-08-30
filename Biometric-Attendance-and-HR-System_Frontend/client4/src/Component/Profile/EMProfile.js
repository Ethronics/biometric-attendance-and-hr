import React, { useState, useEffect } from 'react';
import './Profile.css';
import { MdOutlineBusinessCenter, MdOutlineEmail, MdOutlinePhotoCamera } from 'react-icons/md';
import p1 from '../../assets/image.png';

const EMProfile = ({ email }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Fetch the employee details based on email
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employee/${email}/`);
        const data = await response.json();
        setUserDetails(data);
        setProfilePicture(data.profile_picture || p1);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [email]);

  const handleEmailChange = async () => {
    if (newEmail) {
      try {
        const response = await fetch(`http://localhost:8000/employee/${email}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newEmail }),
        });

        if (response.ok) {
          setUserDetails(prev => ({ ...prev, email: newEmail }));
          setNewEmail('');
        } else {
          console.error('Failed to update email');
        }
      } catch (error) {
        console.error('Error updating email:', error);
      }
    }
  };

 const handlePasswordChange = async () => {
    if (newPassword) {
        try {
            const response = await fetch(`http://localhost:8000/employee/${email}/change-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_password: newPassword }),
            });

            if (response.ok) {
                setNewPassword('');
                setIsChangingPassword(false);
                alert('Password updated successfully');
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    }
};

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetch(`http://localhost:8000/employee/${email}/`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profile_picture);
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className='box3'>
        <img src={profilePicture} alt='profile' className='employee-pic' />
        <div className="image-up">
          <label htmlFor="profilePicture">
            <MdOutlinePhotoCamera className="image-ic" />
          </label>
          <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handlePictureChange} />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px', fontFamily: 'Lexend' }}>
          <div style={{ fontFamily: 'Lexend', fontSize: '30px', border: 'none', borderBottom: '1px solid #333', marginBottom: '10px' }}>
            {userDetails.full_name}
          </div>
          <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
            <MdOutlineBusinessCenter /> {userDetails.position}
          </div>
          <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
            <MdOutlineEmail /> {userDetails.email}
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
              placeholder="Enter New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='btn-pro' onClick={handlePasswordChange}>Update Password</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMProfile;
