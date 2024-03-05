"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios, { formToJSON } from "axios";
import Link from "next/link";
import Swal from 'sweetalert2';
import { Select, Option } from "@material-tailwind/react";

function Profile() {
  const [user, setUser] = useState({});
  const [value, setValue] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
    address: '',
    cityName: '',
    provinceName: '',
    cityId: '',
    provinceId: '',
    profilePicture: null,
  });
  const fetchProvinces = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/order/provinces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  const fetchCities = async (provinceId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/order/cities/${provinceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCities(response.data.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  const fetchUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}`,
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
        cityName: '',
        provinceName: '',
        cityId: response.data.data.cityId,
        provinceId: response.data.data.provinceId,
        profilePicture: null,
      });
    } catch (error) {
      console.error("Error fetching user :", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProvinces();
  }, []);
  const handleChangeProvince = async (value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/order/province-id`, { name: value }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.data;
      console.log(data);
      setEditedUser(prevState => ({
        ...prevState,
        provinceName: value,
        provinceId: data
      }));
      fetchCities(data)
    } catch (error) {
      console.error('Error fetching province ID:', error);
      // Handle error appropriately
    }
  };
  const handleChangeCity = async (valueCity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/order/city-id`, { name: valueCity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.data;
      console.log(data);
      setEditedUser(prevState => ({
        ...prevState,
        cityName: valueCity,
        cityId: data
      }));
    } catch (error) {
      console.error('Error fetching city ID:', error);
      // Handle error appropriately
    }
  };
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
    const userId = localStorage.getItem("userId");

    try {
      const formData = new FormData();
      // Append properties to FormData if they are not null and not empty string
      if (editedUser.username !== null && editedUser.username !== "") {
        formData.append("username", editedUser.username);
      }
      if (editedUser.email !== null && editedUser.email !== "") {
        formData.append("email", editedUser.email);
      }
      if (editedUser.address !== null && editedUser.address !== "") {
        formData.append("address", editedUser.address);
      }
      if (editedUser.city !== null && editedUser.city !== "") {
        formData.append("city", editedUser.city);
      }
      if (editedUser.provinceId !== null && editedUser.provinceId !== "") {
        formData.append("provinceId", editedUser.provinceId);
      }
      if (editedUser.cityId !== null && editedUser.cityId !== "") {
        formData.append("cityId", editedUser.cityId);
      }
      if (editedUser.profilePicture !== null && editedUser.profilePicture !== "") {
        formData.append("profilePicture", editedUser.profilePicture);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User profile updated successfully',
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  console.log(editedUser);
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
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads/profile/${user.profilePicture}`}
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
        <div className="flex gap-20 mt-2">
          <div className="w-1/2">
            <label
              htmlFor="province"
              className="text-black font-semibold block mb-2 mt-3 text-lg"
            >
              Province
            </label>
            {provinces && (
              <div className="mb-4">
                <Select
                  onChange={(value) => {
                    handleChangeProvince(value);
                  }} name="province">
                  {provinces.map(province => (
                    <Option key={province.id} value={province.name}>{province.name}</Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="city"
              className="text-black font-semibold block mb-2 mt-3 text-lg"
            >
              City
            </label>
            {editedUser.provinceId !== '' && (
              <div className="mb-4">
                <Select
                  onChange={(valueCity) => {
                    handleChangeCity(valueCity);
                  }}
                  name="city"
                >
                  {cities.map(city => (
                    <Option key={city.id} value={city.name}>{city.name}</Option>
                  ))}
                </Select>
              </div>
            )}
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