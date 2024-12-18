"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const router = useRouter();

  // Fetch user data from localStorage or API
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.name) {
      setUser(userData);
      setFormData(userData);
    } else {
      router.push("/signin"); // Redirect to sign-in if not authenticated
    }
  }, [router]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission (update user data)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData)); // Save updated data to localStorage
    setUser(formData); // Update user state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="profile-page max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            {isEditing ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Edit
              </button>
            )}

            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
