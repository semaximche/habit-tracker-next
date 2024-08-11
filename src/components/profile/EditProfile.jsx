import React, { useState } from 'react';
import { useUserData } from '@/contexts/UserContext';
import { db, storage } from '@/lib/firebase/firebaseInit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { UseAuth } from '@/contexts/AuthContext';
import { setDoc, getDoc } from 'firebase/firestore';
import AvatarUpload from './AvatarUpload';
import EditProfileInfoText from './EditProfileInfoText';

const EditProfile = ({ onCancel }) => {
  const { user } = UseAuth(); // Get the current authenticated user
  const { userData } = useUserData();
  const [username, setUsername] = useState(userData.profile?.username || '');
  const [about, setAbout] = useState(userData.profile?.about || '');
  const [location, setLocation] = useState(userData.profile?.location || 'Israel, Tel-Aviv');
  const [avatar, setAvatar] = useState(null);

  const handleSaveChanges = async () => {
    if (!user?.uid) return; // Ensure user is logged in

    const profileRef = doc(db, `users/${user.uid}`);
    let avatarURL = userData.profile?.avatarURL || '';
    let level = userData.profile?.level || 1;

    // Check if the document exists
    const docSnapshot = await getDoc(profileRef);

    if (!docSnapshot.exists()) {
      // If the document doesn't exist, create it
      await setDoc(profileRef, {
        username,
        about,
        location, // Save the selected location
        avatarURL,
        level, // Save the user's level
        uid: user.uid, // Save the user's UID in the document
      });
    } else {
      // Update the document if it exists
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatar);
        avatarURL = await getDownloadURL(avatarRef);
      }

      await updateDoc(profileRef, {
        username,
        about,
        location, // Update the location
        avatarURL,
        level, // Update the user's level if changed
      });
    }

    // Update Firebase Auth profile (username)
    await updateProfile(user, { displayName: username });

    onCancel(); // Close the edit form after saving changes
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          <div className="card p-4">
            <div className="nav flex flex-col">
              <a href="#" className="py-2 text-blue-300" onClick={onCancel}>
                Back To Profile
              </a>
              <a href="#" className="py-2">
                Settings
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="card">
            <div className="card-body">
              <div className="e-profile">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <AvatarUpload
                    currentAvatarURL={userData.profile?.avatarURL || ''}
                    onAvatarSelect={setAvatar} // Handle avatar selection
                  />
                </div>
                <EditProfileInfoText
                  username={username}
                  setUsername={setUsername}
                  about={about}
                  setAbout={setAbout}
                  location={location}
                  setLocation={setLocation}
                />
                <div className="flex justify-end">
                  <button className="btn btn-primary" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 absolute bottom-0">
            <div className="card mt-4">
              <div className="card-body">
                <h6 className="font-bold">Support</h6>
                <p>Get fast, free help from our friendly assistants.</p>
                <button type="button" className="btn btn-primary">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
