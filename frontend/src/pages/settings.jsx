import React, { useState } from "react";
import { updateProfile, changePassword, deleteAccount } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ username });
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating profile");
    }
  };

  // Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      alert("Password changed successfully");
    } catch (err) {
      alert(err.response?.data?.msg || "Error changing password");
    }
  };

  // Delete Account
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await deleteAccount();
      localStorage.removeItem("token");
      alert("Account deleted");
      navigate("/login");
    } catch (err) {
      alert("Error deleting account");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl text-textPrimary font-bold mb-8">
        Settings
      </h1>

      {/* Update Username Card */}
      <div className="bg-bgCard p-8 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-xl text-textPrimary mb-6">
          Update Username
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New username"
            className="flex-1 bg-bgSecondary text-textPrimary px-4 py-3 rounded-lg focus:outline-none"
          />
          <button className="bg-accent px-6 py-3 rounded-lg text-white hover:opacity-90 transition">
            Update
          </button>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-bgCard p-8 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-xl text-textPrimary mb-6">
          Change Password
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="bg-bgSecondary text-textPrimary px-4 py-3 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            className="bg-bgSecondary text-textPrimary px-4 py-3 rounded-lg focus:outline-none"
          />
          <button className="bg-accent px-6 py-3 rounded-lg text-white hover:opacity-90 transition self-start">
            Change Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-600 p-8 rounded-2xl">
        <h2 className="text-xl text-red-500 mb-4">
          Danger Zone
        </h2>

        <button className="bg-red-600 px-6 py-3 rounded-lg text-white hover:bg-red-700 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;