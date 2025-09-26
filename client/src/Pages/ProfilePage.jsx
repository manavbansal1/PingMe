import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore.js'
import '../CSS/ProfilePage.css'

const ProfilePage = () => {

  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64data = reader.result;
        setSelectedImg(base64data);
        await updateProfile({profilePicture : base64data});
      }
    }
  }
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Your profile information</p>
          </div>

          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-container">
              <img
                src={selectedImg || authUser.profilePicture || "/avatar.png"}
                alt="Profile"
                className="avatar-image"
              />
              <label
                htmlFor="avatar-upload"
                className={`camera-button ${isUpdatingProfile ? 'disabled' : ''}`}
              >
                <Camera />
                <input
                  type="file"
                  id="avatar-upload"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className={`upload-hint ${isUpdatingProfile ? 'uploading' : ''}`}>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <div className="info-field">
              <div className="field-label">
                <User />
                Full Name
              </div>
              <div className="field-value">
                {authUser?.fullName}
              </div>
            </div>

            <div className="info-field">
              <div className="field-label">
                <Mail />
                Email Address
              </div>
              <div className="field-value">
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="account-info-card">
          <h2 className="account-info-title">Account Information</h2>
          <div className="account-details">
            <div className="account-row">
              <span className="account-label">Member Since</span>
              <span className="account-value">
                {authUser.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className="account-row">
              <span className="account-label">Account Status</span>
              <span className="account-value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
