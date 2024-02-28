"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Profile() {
    const [user, setUser] = useState({});
    const [editedUser, setEditedUser] = useState({
      username: '',
      email: '',
      address: '',
      city: '',
      province: '',
      profilePicture: null,
    });
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const storedToken = localStorage.getItem("token");
          const userId = localStorage.getItem('userId')
          const response = await axios.get(
            `http://localhost:3000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          setUser(response.data.data);
          console.log(response.data.data);
          setEditedUser({
            username: response.data.data.username,
            email: response.data.data.email,
            address: response.data.data.address,
            city: '',
            province: '',
            profilePicture: null,
          });
        } catch (error) {
          console.error("Error fetching user :", error);
        }
      };
      fetchUser()
    }, []);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setEditedUser((prevUser) => ({
        ...prevUser,
        profilePicture: file,
      }));
    };
  
    const handleChangeData = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handleEdit = async () => {
      const token = localStorage.getItem("token");
      const idFromPath = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
  
      try {
        const formData = new FormData();
        formData.append("username", editedUser.username);
        formData.append("email", editedUser.email);
        formData.append("address", editedUser.address);
        formData.append("city", editedUser.city);
        formData.append("province", editedUser.province);
        formData.append("profilePicture", editedUser.profilePicture);
        const response = await axios.put(
          `http://localhost:3000/users/${idFromPath}/edit`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
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
            defaultValue={user.username}
            onChange={handleChangeData}
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
            defaultValue={user.email}
            className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black"
            onChange={handleChangeData}
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
            name="address"
            defaultValue={user.address}
            className="bg-white border-2 border-gray-300 rounded-md w-full p-2 text-black"
            onChange={handleChangeData}
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
