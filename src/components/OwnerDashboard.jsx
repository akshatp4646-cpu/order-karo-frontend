import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiClock,
  FiHome,
  FiHelpCircle,
  FiLogOut
} from "react-icons/fi";
import { serverUrl } from "../constants/constant";
import {setShopData} from "../redux/shopSlice"
import { useDispatch } from "react-redux";
import axios from "axios"
import { setCity, setUserData } from "../redux/userSlice";


const OwnerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleLogout = async () => {
  try {
     await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setCity(null));
      dispatch(setShopData(null));
      navigate("/login", { replace: true });
  } catch (error) {
    console.log("Logout Error:", error.response?.data || error.message);
  }
}

  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-emerald-100 via-sky-100 to-slate-100">
      <div className="flex h-full w-full overflow-hidden bg-white">
        <aside className="h-screen w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
          <div className="px-8 py-7">
            <h1 className="text-3xl font-black tracking-tight text-orange-600">
              Order Karo
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Restaurant Partner
            </p>
          </div>
        
          {/* sidebar routes change*/}
          <div className="space-y-1 px-4">

            <NavLink
              to="/dashboard/create-shop"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FiHome className="text-xl" />
              Create Shop
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FiShoppingBag className="text-xl" />
              Orders
            </NavLink>

            

            <NavLink
              to="/dashboard/my-shops"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FiHome className="text-xl" />
              My Shops
            </NavLink>

            <NavLink
              to="/dashboard/order-history"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FiClock className="text-xl" />
             Order history
            </NavLink>
  
            <NavLink
              to="/dashboard/help"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FiHelpCircle className="text-xl" />
             Help Center
            </NavLink>
            
          </div>

          <div className="mt-8 px-4">
            <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:cursor-pointer hover:bg-red-50 hover:text-red-600"
              onClick={handleLogout}
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </aside>

        <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-slate-50">
          

          <main className="flex min-h-0 flex-1 flex-col overflow-hidden ">
         

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto ">
              <Outlet/>
            </div>
              
          </main>
        </section>
      </div>
    </div>
  );
};

export default OwnerDashboard;


/**
 * {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:grid-cols-[1fr_1.6fr_1.2fr]"
                >
                  <div>
                    <span
                      className={`inline-flex rounded-md border px-2 py-1 text-xs font-bold tracking-wide ${
                        order.tag.includes("SELF")
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-purple-200 bg-purple-50 text-purple-700"
                      }`}
                    >
                      {order.tag}
                    </span>

                    <h3 className="mt-4 text-lg font-bold text-slate-800">
                      {order.shop}
                    </h3>
                    <p className="text-sm text-slate-500">{order.location}</p>

                    <div className="my-4 border-t border-slate-100" />

                    <p className="text-lg font-bold text-slate-800">
                      ID: {order.id}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">
                        {order.customerNote}
                      </p>
                      <FiPhone className="text-xl text-blue-600" />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <FiCheckCircle className="text-green-500" />
                          Placed
                        </span>
                        <span className="font-medium text-slate-500">
                          {order.placed}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <FiCheckCircle className="text-green-500" />
                          Accepted
                        </span>
                        <span className="font-medium text-slate-500">
                          {order.accepted}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-y border-dashed border-slate-200 py-4 xl:border-x xl:border-y-0 xl:px-5 xl:py-0">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-4"
                        >
                          <p className="flex items-center gap-3 text-lg font-semibold text-slate-700">
                            <span
                              className={`h-3 w-3 rounded-sm border-2 ${
                                item.veg ? "border-green-500" : "border-red-500"
                              }`}
                            />
                            {item.qty} x {item.name}
                          </p>
                          <p className="text-lg font-bold text-slate-700">
                            ₹{item.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="my-5 border-t border-slate-100" />

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-lg font-semibold text-slate-700">
                        Total bill{" "}
                        <span
                          className={`ml-2 rounded-md border px-2 py-1 text-xs font-bold ${
                            order.payment === "PAID"
                              ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                              : "border-pink-200 bg-pink-50 text-pink-600"
                          }`}
                        >
                          {order.payment}
                        </span>{" "}
                        <span className="text-xl font-black">
                          ₹{order.total}
                        </span>
                      </p>

                      <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                        <FiPrinter className="text-lg" />
                        Print bill
                      </button>
                    </div>

                    <div className="text-center mt-1">
                      <button className="mt-5 w-full max-w-70  rounded-xl bg-blue-600 py-2 text-[15px] font-bold text-white transition hover:cursor-pointer hover:bg-blue-700">
                        Order ready ({order.readyTime})
                      </button>
                      <button className="mt-5 w-full max-w-70  rounded-xl bg-red-600 py-2 text-[15px] font-bold text-white transition hover:cursor-pointer hover:bg-red-700">
                        Cancel Order
                      </button>
                    </div>
                  </div>

                  <div>
                    {order.rider ? (
                      <>
                        <p className="text-sm font-semibold text-slate-400">
                          Delivery partner details
                        </p>

                        <div className="mt-5 flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-lg font-black text-slate-600">
                            {order.rider.name[0]}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-700">
                              {order.rider.name} {order.rider.text}
                            </p>
                            <div className="mt-2 flex gap-4 text-sm font-bold text-blue-600">
                              <span className="flex items-center gap-1">
                                <FiMapPin /> Track
                              </span>
                              <span className="flex items-center gap-1">
                                <FiPhone /> Call
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-500">
                            Arriving in
                          </span>
                          <span className="font-bold text-slate-600">
                            {order.rider.time}
                          </span>
                        </div>

                        <div className="mt-3 h-2 rounded-full bg-cyan-50">
                          <div className="h-2 w-3/4 rounded-full bg-cyan-600" />
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-400">
                          Delivery address
                        </p>
                        <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
                          {order.address}
                        </p>
                        <div className="mt-5 flex gap-5 text-2xl text-blue-600">
                          <FiCopy />
                          <FiMapPin />
                        </div>
                      </>
                    )}

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <button className="flex items-center gap-2 text-base font-semibold text-slate-600">
                        <FiHelpCircle />
                        Support
                      </button>
                    </div>
                  </div>
                </div>
              ))}
 */