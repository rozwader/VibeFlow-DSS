"use client";

import { useRouter } from "next/navigation";
import vibeflowlogo from "../../../public/vibeflowlogo.png";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const loginPage = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("Username");
    const password = formData.get("Password");

    const request = await fetch("/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (request.ok) {
      const data = await request.json();
      localStorage.setItem("TOKEN", data.message);
      localStorage.setItem("User", username);
      router.push("/music/");
    } else {
      const message = await request.json();
      console.log(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image src={vibeflowlogo} alt="logo" className="w-64 h-64 mb-4" />
          <div className="w-full max-w-xl p-6 bg-white shadow-xl rounded-xl">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <BsFillPersonFill className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter Your Name"
                  name="Username"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <BsFillLockFill className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  placeholder="Enter Your Password"
                  name="Password"
                />
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded border border-black hover:bg-white hover:text-black transition-colors cursor-pointer mb-4"
              type="submit"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center my-4">
              <span className="text-gray-400 text-sm">or sign in with</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span className="text-gray-700">Sign in with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors"
              >
                <FaFacebookF className="text-blue-600 text-xl" />
                <span className="text-gray-700">Sign in with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default loginPage;
