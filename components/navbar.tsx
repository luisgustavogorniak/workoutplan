"use client";

import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            className="text-xl font-bold text-emerald-700 cursor-pointer"
            src="/logo.png"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>

        <div className="space-x-6 flex items-center">
          <SignedIn>
            <Link
              className="text-gray-700 hover:text-[#015D24] transition-colors"
              href="/workoutplan"
            >
              {" "}
              Workoutplan
            </Link>
            {user?.imageUrl ? (
              <Link href="/profile">
                <Image
                  src={user.imageUrl}
                  alt="Profile picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                ></Image>
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            )}
            <SignOutButton>
              <button className="ml-4 px-4 py-2 bg-[#015D24] text-white rounded hover:bg-emerald-600 transition cursor-pointer">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Link
              className="text-gray-700 hover:text-[#015D24] transition-colors"
              href="/"
            >
              {" "}
              Home
            </Link>
            <Link
              href={isSignedIn ? "/subscribe" : "/sign-up"}
              className="text-gray-700 hover:[#015D24] transition-colors"
            >
              Subscribe
            </Link>
            <Link
              className="px-4 py-2 bg-[#015D24] text-white rounded hover:bg-emerald-600 transition"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
