"use client";

import { useRouter } from "next/navigation";
import vibeflowlogo from "../../../public/vibeflowlogo.png";
import Link from "next/link";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";

const registerPage = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("Username");
    const password = formData.get("Password");
    const email = formData.get("Email");

    const request = await fetch("/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (request.ok) {
      router.push("/login");
    } else {
      const message = await request.json();
      console.log(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image src={vibeflowlogo} alt="logo" className="w-100 h-100"></Image>
          <div className="w-full max-w-xl p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <BsEnvelopeFill className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter Your E-mail"
                  name="Email"
                />
              </div>
            </div>
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
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default registerPage;
