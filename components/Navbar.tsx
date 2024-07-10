"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CustomButton from "./CustomButton";

const NavBar = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert('Logout is successful!');
    router.push("/login");
  };

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6 mb-[100px] mr-[50px]">
            <li>
              <Link
                href="/dashboard"
                className="text-primary-blue font-bold text-[30px] hover:underline"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {token ? (
            <Link href="#" onClick={handleLogout}>
              <CustomButton
                title="Logout"
                btnType="button"
                containerStyles="text-white rounded-full bg-primary min-w-[130px]"
                
              />
            </Link>
          ) : (
            <>
              <Link href="/login">
                <CustomButton
                  title="Login"
                  btnType="button"
                  containerStyles="text-white rounded-full bg-primary min-w-[130px]"
                />
              </Link>
              <Link href="/register">
                <CustomButton
                  title="Register"
                  btnType="button"
                  containerStyles="text-white rounded-full bg-primary min-w-[130px]"
                />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
