"use client";
import React, { useState } from "react";
import { NavigationItem } from "../../../types/menu";

interface NavItemCurrent extends NavigationItem {
  current?: boolean;
}

interface NavbarClientProps {
  navigation: NavItemCurrent[];
  anonymousProfileImage: string;
  authState: { isLoggedIn: boolean; user: any };
  logo: string;
}

export default function NavbarClient({ logo, navigation, anonymousProfileImage, authState }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Close profile menu when clicking outside
  React.useEffect(() => {
    if (!profileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('#user-menu-button') && !target.closest('#profile-dropdown')) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileMenuOpen]);

  return (
    <nav className="bg-blue-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-blue-300 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={mobileMenuOpen ? "hidden size-6" : "block size-6"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={mobileMenuOpen ? "block size-6" : "hidden size-6"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className={
                      (item.current
                        ? "bg-blue-300"
                        : "text-gray-800 hover:bg-blue-200") +
                      " rounded-md px-3 py-2 text-sm font-semibold"
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setProfileMenuOpen((open) => !open)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-8 rounded-full"
                    src={authState.isLoggedIn ? authState.user.profileImage : anonymousProfileImage}
                    alt=""
                  />
                </button>
              </div>
              {/* Dropdown menu, show/hide based on profileMenuOpen */}
              {profileMenuOpen && authState.isLoggedIn && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                </div>
              )}
              {profileMenuOpen && !authState.isLoggedIn && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Sign In</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className={
                  (item.current
                    ? "bg-blue-200 text-black"
                    : "text-gray-800 hover:bg-blue-200 hover:text-black") +
                  " block rounded-md px-3 py-2 text-base font-semibold"
                }
                aria-current={item.current ? "page" : undefined}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
