import { useEffect, useState } from 'react';

import EditProfile from './components/edit-profile';
import ProfileInfo from './components/profile-info';
import { Iprofile } from './types';

import './index.css';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState<Iprofile>({});

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {};
    if (!user.phone) {
      setEdit(true);
    } else {
      setEdit(false);
      setInfo(user);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="profileTitle">Profile</h1>
      <div className="profileContent">
        {edit ? (
          <EditProfile info={info} setInfo={setInfo} setEdit={setEdit} />
        ) : (
          <ProfileInfo info={info} setEdit={setEdit} />
        )}
      </div>
    </div>
  );
}

export default Profile;
