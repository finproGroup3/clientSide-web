"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Profile() {
  const [user, setUser] = useState([]);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    address: user.address,
    city: user.cityId,
    province: user.provinceId,
    profilePicture: user.profilePicture,
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    const idFromPath = pathname.substring(pathname.lastIndexOf("/") + 1);

    const fetchUser = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDg2ODA5MzMsImV4cCI6MTcwODcyNDEzM30.dPTQGmMGJA14IVYm90C8EyPM65AcHD8zbLi_DlFx540";
      localStorage.setItem("token", token);
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/users/${idFromPath}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUser(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching user :", error);
      }
    };

    if (idFromPath) {
      fetchUser();
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedUser((prevUser) => ({
      ...prevUser,
      profilePicture: file,
    }));
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    const idFromPath = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${idFromPath}/edit`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response (you may want to show a success message or redirect)
      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative p-16">
      <div className="flex justify-between items-center">
        <p className="text-black text-3xl font-bold">Edit Profile</p>
        <label className="rounded-full overflow-hidden cursor-pointer transform hover:scale-110 transition-transform duration-300">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 hover:bg-gray-300 ">
            {editedUser.profilePicture ? (
              // Jika ada gambar yang baru dipilih, tampilkan gambar baru
              <Image
                src={URL.createObjectURL(editedUser.profilePicture)}
                alt="Selected Image"
                className="rounded-full w-full h-full object-cover"
                width={90}
                height={90}
              />
            ) : (
              // Jika tidak ada gambar baru, tampilkan gambar dari API
              <Image
                src={`http://localhost:3000/uploads/profile/${user.profilePicture}`}
                alt="Current Image"
                className="rounded-full w-full h-full object-cover"
                width={90}
                height={90}
              />
            )}
          </div>
        </label>
      </div>
      <div>
        <div>
          <label
            htmlFor="username"
            className="text-black font-semibold block mb-2 mt-3 text-lg"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black"
            value={editedUser.username}
            defaultValue={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-black font-semibold block mb-2 mt-3 text-lg "
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            defaultValue={user.email}
            className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="text-black font-semibold block mb-2 mt-3 text-lg"
          >
            Address
          </label>
          <input
            type="text"
            name="addres"
            value={editedUser.address}
            defaultValue={user.address}
            className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black"
          />
        </div>
        <div className="flex gap-20">
          <div className="w-1/2">
            <label
              htmlFor="city"
              className="text-black font-semibold block mb-2 mt-3 text-lg"
            >
              City
            </label>
            <select className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black">
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="province"
              className="text-black font-semibold block mb-2 mt-3 text-lg"
            >
              Province
            </label>
            <select className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black">
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province3">Province 3</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-black font-semibold block mb-2 mt-3 text-lg"
          >
            Password
          </label>
          <div className="flex gap-5">
            <button className="text-white bg-black border rounded-md p-2 font-semibold">
              Change Password
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-16">
          <div>
            <Link href="/" className="">
              <p className="text-blue-500 border p-2 border-blue-500 rounded-md font-semibold cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                Back to Home
              </p>
            </Link>
          </div>
          <div>
            <button
              onClick={handleEdit}
              className="p-2 text-white bg-blue-500 border rounded-md w-20 font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
