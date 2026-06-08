import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  roomsDummyData,
  assets,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find(
      (room) => String(room._id) === String(id)
    );

    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images?.[0] || null);
    }
  }, [id]);

  if (!room) {
    return (
      <div className="py-28 text-center text-gray-500">
        Room not found
      </div>
    );
  }

  return (
    <div className="py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name}
          <span className="text-sm font-inter ml-2">
            ({room.roomType})
          </span>
        </h1>

        <span className="text-xs px-3 py-1.5 bg-orange-500 text-white rounded-full w-fit">
          20% OFF
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <StarRating />
        <span className="text-sm text-gray-500">200+ Reviews</span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <img
          src={assets.locationIcon}
          alt="location"
          className="w-4 h-4"
        />
        <span>{room.hotel?.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">

        {/* Main Image */}
        <div className="lg:w-1/2 w-full">
          {mainImage && (
            <img
              src={mainImage}
              alt="Main Room"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Room"
              onClick={() => setMainImage(image)}
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image ? "ring-4 ring-orange-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Highlights + Price */}
      <div className="flex flex-col lg:flex-row lg:justify-between mt-12 gap-8">

        <div>
          <h2 className="text-2xl md:text-3xl font-playfair mb-4">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap gap-4">
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
              >
                <img
                  src={facilityIcons[item]}
                  alt={item}
                  className="w-5 h-5"
                />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-2xl font-semibold text-gray-800">
          ₹{room.pricePerNight}/night
        </div>
      </div>

      {/* Booking Form */}
      <form className="flex flex-col md:flex-row gap-6 bg-white shadow-lg p-6 rounded-xl mt-16 max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row gap-6 flex-1">

          <div className="flex flex-col">
            <label className="font-medium text-gray-600">
              Check-In
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 mt-1 outline-none"
              required
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300"></div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-600">
              Check-Out
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 mt-1 outline-none"
              required
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300"></div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-600">
              Guests
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="border border-gray-300 rounded px-3 py-2 mt-1 outline-none w-24"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-md transition-all active:scale-95"
        >
          Check Availability
        </button>
      </form>

      {/* Common Specifications */}
      <div className="mt-16 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={spec.icon}
              alt={spec.title}
              className="w-6"
            />
            <div>
              <p className="text-base font-medium">{spec.title}</p>
              <p className="text-gray-500 text-sm">
                {spec.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to availability.
          You get a comfortable two bedroom apartment with a true city feeling.
          The price quoted is for two guests. Please mark the correct number of
          guests to get the exact price for groups.
        </p>
      </div>

      {/* Hosted By Section (LIKE SCREENSHOT) */}
      <div className="mt-10">

        <div className="flex items-start gap-4">

          <img
            src={room.hotel?.owner?.image || assets.userIcon}
            alt="Host"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="text-lg md:text-xl font-medium">
              Hosted by {room.hotel?.name}
            </p>

            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2 text-sm text-gray-500">
                200+ reviews
              </p>
            </div>
          </div>

        </div>

        {/* Button BELOW (LEFT ALIGNED) */}
        <button className="mt-6 px-6 py-2.5 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all active:scale-95">
          Contact Now
        </button>

      </div>

    </div>
  );
};

export default RoomDetails;
