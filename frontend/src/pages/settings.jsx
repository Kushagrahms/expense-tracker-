import React, { useState } from "react";
import { updateProfile, changePassword, deleteAccount } from "../services/userService";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";
const Settings = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal,setShowDeleteModal] = useState(false);

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
  const handleDeleteAccount = async () => {
  try {
    await API.put("/user/delete");
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (err) {
    console.log(err);
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

<button  onClick={() => setShowDeleteModal(true)}   className="bg-red-600 px-6 py-3 rounded-lg text-white hover:bg-red-700 transition">
  Delete Account
</button>
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-bgCard p-8 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="text-xl text-textPrimary mb-4">
        Confirm Account Deletion
      </h2>

      <p className="text-textSecondary mb-6">
        This action cannot be undone. All your expenses and budgets will be permanently deleted.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteAccount}
          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Settings;