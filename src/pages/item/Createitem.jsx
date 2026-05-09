import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { serverUrl } from "../../constants/constant";
import { FiUpload } from "react-icons/fi";

const ITEM_CATEGORIES = [
  "snacks",
  "Main Course",
  "Desserts",
  "Pizza",
  "Burgers",
  "Sandwiches",
  "South Indian",
  "Chinese",
  "Fast Food",
  "Others",
];

const FOOD_TYPES = ["veg", "non veg"];

const CreateItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "snacks",
    foodType: "veg",
    price: "",
    shopId: "",
    image: null,
  });
  const [shops, setShops] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
          withCredentials: true,
        });
        setShops(data.shops || []);
        if (data.shops && data.shops.length > 0) {
          setFormData((prev) => ({
            ...prev,
            shopId: data.shops[0]._id,
          }));
        }
      } catch (err) {
        setError("Error fetching shops");
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.category ||
      !formData.foodType ||
      !formData.price ||
      !formData.shopId ||
      !formData.image
    ) {
      setError("All fields including image are required");
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      setError("Price must be a valid positive number");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("category", formData.category);
      form.append("foodType", formData.foodType);
      form.append("price", formData.price);
      form.append("shopId", formData.shopId);
      form.append("image", formData.image);

      const { data } = await axios.post(`${serverUrl}/api/item/create-item`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(data.message);
      navigate("/my-shops");
    } catch (error) {
      setError(error.response?.data?.message || "Error creating item");
      console.error("Create Item Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-orange-600 text-xl font-bold">Loading shops...</p>
      </div>
    );
  }

  if (shops.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-xl font-bold text-gray-800 mb-4">
            You need to create a shop first before adding items
          </p>
          <button
            onClick={() => navigate("/create-shop")}
            className="py-3 px-6 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
          >
            Create Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Create Item
        </h1>
        <h2 className="text-center text-gray-500 text-md font-semibold mb-6">
          Add a new item to your shop
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Shop */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Select Shop <sup className="text-orange-600">*</sup>
            </label>
            <select
              name="shopId"
              value={formData.shopId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            >
              <option value="">-- Select a shop --</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Item Name <sup className="text-orange-600">*</sup>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Category <sup className="text-orange-600">*</sup>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            >
              {ITEM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Price (₹) <sup className="text-orange-600">*</sup>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            />
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Food Type <sup className="text-orange-600">*</sup>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {FOOD_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      foodType: type,
                    }))
                  }
                  className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    formData.foodType === type
                      ? "border-2 border-transparent bg-orange-600 text-white"
                      : "border-2 border-gray-300 bg-white text-gray-700 hover:border-orange-600 hover:text-orange-600"
                  }`}
                >
                  {type === "veg" ? "🥬" : "🍗"} {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Item Image <sup className="text-orange-600">*</sup>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="item-image"
              />
              <label
                htmlFor="item-image"
                className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-orange-300 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
              >
                <FiUpload className="text-orange-600 text-lg" />
                <span className="text-orange-600 font-semibold">
                  {formData.image ? "Change Image" : "Upload Image"}
                </span>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-3 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Image selected</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Item..." : "Create Item"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/my-shops")}
            className="w-full py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-all duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;