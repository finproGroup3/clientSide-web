"use client";
import React from "react"
import { Select, Option } from "@material-tailwind/react";;
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import './style.css'
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Spin } from 'antd';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useMapEvents } from 'react-leaflet/hooks'
import { Icon, L } from "leaflet"

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [storeData, setStoreData] = useState([]);
  const [courierServices, setCourierServices] = useState();
  const [selectedCourierServices, seteSlectedCourierServices] = useState("Reg");
  const [currentProvince, setCurrentProvince] = useState();
  const [currentCity, setCurrentCity] = useState();

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        localStorage.setItem("current_latitude", e.latlng.lat)
        localStorage.setItem("current_longitude", e.latlng.lng)
      },
    })
    const customIcon = new Icon({
      iconUrl: "/images/locate.png",
      iconSize: [30, 37]
    })
    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  const router = useRouter();
  function setCurrentLocation() {
    async function getProvinceAndCity(latitude, longitude) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`);
        const data = await response.json();
        if (data && data.address) {
          const { city, state } = data.address;
          console.log(`Kota: ${city}, Provinsi: ${state}`);
          setCurrentProvince(state)
          setCurrentCity(city)
          return { city, province: state };
        } else {
          console.error(`Kota dan provinsi tidak ditemukan untuk koordinat: Latitude ${latitude}, Longitude ${longitude}`);
          return null;
        }
      } catch (error) {
        console.error("Error fetching city and province:", error);
        return null;
      }
    }

    // Example usage
    getProvinceAndCity(localStorage.getItem("current_latitude"), localStorage.getItem("current_longitude")); // Example coordinates for Jakarta
  }


  const fetchShippingCost = async (origin, destination, weight, courier) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/order/cost`,
        {
          origin,
          destination,
          weight,
          courier,
        }
      );
      setCourierServices(response.data.data.rajaongkir.results[0].costs);
    } catch (error) {
      console.log("error fetching shipping cost:", error);
    } finally {
      console.log("done");
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataUser(response.data.data);
    } catch (error) {
      console.log("error fetching user:", error);
    }
  };
  const fetchData = async () => {
    try {
      const cartId = localStorage.getItem("cartId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
      calculateTotalWeight(response.data.data.CartProducts);
    } catch (error) {
      console.log("eror fetching data:", error);
    }
  };
  const updateShippingCost = async (shippingCost) => {
    const cartId = localStorage.getItem("cartId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:3000/cart/${cartId}/shipping-cost`,
        {
          shippingCost,
          shippingMethod: selectedCourierServices,
          courier: selectedCourier
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error updating shipping cost:", error);
    }
  };
  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/store/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStoreData(response.data.data.cityId); // Update state with store data
    } catch (error) {
      console.log("error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
    fetchStoreData();
  }, []);
  const calculateTotalWeight = (cartProducts) => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.Product.weight * product.quantity;
    });
    setTotalWeight(total);
  };
  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const cartId = localStorage.getItem("cartId");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:3000/order/`,
        {
          userId: userId,
          cartId: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been placed successfully!",
      }).then((result) => {

        // If "OK" is clicked on the alert, navigate to "/"
        if (result.isConfirmed || result.isDismissed) {
          router.push("/");
        }
      });
      console.log("produk ditambahkan ke Order", response.data);
    } catch (error) {
      console.log("produk tidak ditambahkan karena error:", error);
    }
  };

  function formatToRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }
  return (
    <>
      {dataUser.user ? (
        <div className="flex mx-20 gap-8 my-8 -z-50">
          <div className="w-3/4">
            <h1 className="font-bold text-3xl text-black">Checkout</h1>
            <div className="flex items-center mt-5">
              <div>
                <Image
                  src={"/images/check-circle.svg"}
                  alt=""
                  width={40}
                  height={40}
                ></Image>
              </div>
              <div className="ml-3">
                <h2 className="font-bold text-black text-2xl">
                  Thank you <span className="capitalize">{dataUser.user.username}</span>!
                </h2>
              </div>
            </div>
            <div className=" border-2 rounded p-3 shadow-sm mt-5">
              <p className="font-bold text-xl text-blue-500">Order Updates</p>
              <p className="text-gray-500 font-semibold">
                You will receive order and shipping updates in order page
              </p>
            </div>
            <p className="text-[#1e88e5] font-medium my-5 text-center">Click the map to get your current location</p>
            <div className="relative">
              <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
            <div className="mt-8 flex items-center gap-3 border-2 rounded-2xl w-fit py-2 px-7 cursor-pointer"
              onClick={setCurrentLocation}
            >
              <Image
                src={"/images/maps.png"}
                alt=""
                width={30}
                height={30}
              ></Image>
              <p className="font-bold">Set that as your location</p>
            </div>
            <div className="flex-row mt-8">
              <div className="flex border-2  p-3">
                <p className="text-gray-500 w-1/12">Email</p>
                <p className="ml-5 text-black">{dataUser.user.email}</p>
              </div>
              <div className="flex border-2 border-t-0 p-3">
                <p className="text-gray-500 w-1/12 ">Addres</p>
                <p className="ml-5 text-black ">{dataUser.user.address}</p>
              </div>
              <div className="flex border-2  p-3">
                <p className="text-gray-500 w-1/12">Province</p>
                {currentProvince ? (
                  <p className="ml-5 text-black ">{currentProvince}</p>
                ) : <p className="ml-5 text-black ">{dataUser.province.name}</p>}
              </div>
              <div className="flex border-2 border-t-0 p-3">
                <p className="text-gray-500 w-1/12 ">City</p>
                {currentCity ? (
                  <p className="ml-5 text-black ">{currentCity}</p>
                ) : <p className="ml-5 text-black ">{dataUser.city.name}</p>}
              </div>
            </div>

          </div>

          <div className="w-1/2 border-2 p-3">
            <div className="flex items-center">
              <div>
                <Image
                  src={"/images/cart-order.svg"}
                  alt=""
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div className="ml-2">
                <p className="text-black font-bold text-lg">Your Order</p>
              </div>
              <div className="ml-2">
                <p className="text-white bg-black rounded-full px-3 py-1 text-sm">
                  {data.CartProducts?.length}
                </p>
              </div>
            </div>
            {/* product start */}
            <div className="mt-8">
              {data.CartProducts?.map((product) => (
                <div key={product.productId} className="flex border-b-2 pb-6 mt-4">
                  <div>
                    <Image
                      src={`http://localhost:3000/uploads/productImage/${product.Product.imageUrl}`}
                      alt=""
                      width={90}
                      height={70}
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <div>
                      <p className="text-black font-bold text-lg">
                        {product.Product.name}
                      </p>
                      <p className="text-black mt-2">
                        Weight: {product.Product.weight} g
                      </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <p className="border-2 text-black px-2 py-1 font-bold">
                        x {product.quantity}
                      </p>
                      <p className="text-black font-bold text-lg">
                        {formatToRupiah(product.Product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* product end */}
            <div className="mt-6 ">
              <div className="pb-6 border-b-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-black text-lg">Courier</p>
                  <div className="w-52">
                    <Select
                      label="select courier"
                      onChange={(val) => {
                        setSelectedCourier(val);
                        fetchShippingCost(dataUser.user.cityId, storeData, totalWeight, val)
                      }}
                    >
                      <Option value="jne">JNE</Option>
                      <Option value="tiki">TIKI</Option>
                      <Option value="pos">Pos Indonesia</Option>
                    </Select>
                  </div>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center mt-3">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <Spin />
                      <p className="text-blue-200">Loading</p>
                    </div>
                  </div>
                ) : (
                  courierServices !== undefined && (
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-semibold text-black text-lg">Courier Services</p>
                      <div className="w-52">
                        <Select
                          label="Select Services"
                          onChange={(val) => {
                            updateShippingCost(val);
                          }}
                        >
                          {courierServices.map((service, index) => (
                            <Option key={index} value={service.cost[0].value}>
                              {service.description}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  )
                )}
                <div>
                  {data.totalPrice !== 0 && (
                    <div className="flex justify-between mt-9">
                      <p className="font-semibold text-black text-lg">Subtotal</p>
                      <p className="font-semibold text-black text-lg">
                        {formatToRupiah(data.totalPrice)}
                      </p>
                    </div>
                  )}
                  {data.shippingCost !== 0 && (
                    <div className="flex justify-between">
                      <p className="font-semibold text-black text-lg">Shipping Cost</p>
                      <p className="font-semibold text-black text-lg">
                        + {formatToRupiah(data.shippingCost)}
                      </p>
                    </div>
                  )}
                  {data.totalAffiliate !== 0 && (
                    <div className="flex justify-between">
                      <p className="font-semibold text-black text-lg">Total Affiliate:</p>
                      <p className="font-semibold text-red-500 text-lg">
                        - {formatToRupiah(data.totalAffiliate)}
                      </p>
                    </div>
                  )}
                  {data.totalDiscount !== 0 && (
                    <div className="flex justify-between">
                      <p className="font-semibold text-black text-lg">Total Discount:</p>
                      <p className="font-semibold text-red-500 text-lg">
                        - {formatToRupiah(data.totalDiscount)}
                      </p>
                    </div>
                  )}
                </div>

              </div>
              <div className="flex justify-between mt-4">
                <p className="text-2xl font-bold text-black">Total</p>
                <p className="text-2xl font-bold text-blue-500">
                  {formatToRupiah(data.nettPrice)}
                </p>
              </div>
            </div>
            <div className="mt-4">

              <button
                onClick={handleOrder}
                className="w-full p-2 bg-blue-500 text-white rounded-md text-xl font-bold"
              >
                Order
              </button>

            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}