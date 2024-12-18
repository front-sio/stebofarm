"use client";
import React, { useState } from "react";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUser } from "react-icons/fa";
import { JSX } from "react/jsx-runtime";
import AccountStatement from "./account/account-statement/page";
import Identification from "./account/identification/page";
import Account from "./account/page";
import Payments from "./account/payments/page";
import Security from "./account/security/page";
import BuyingOrders from "./orders/buying-orders/page";
import Orders from "./orders/page";
import SellingOrders from "./orders/selling-orders/page";
import DashboardPage from "./page";
import Products from "./products/page";
import VerifyAccountPage from "./verify-account"; // Import the VerifyAccountPage

const DashboardLayout: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<"Dashboard" | "Products" | "Orders" | "Account" | "VerifyAccount">("Dashboard");
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{ Orders: boolean; Account: boolean }>({
    Orders: false,
    Account: false,
  });

  const menuContent: Record<string, JSX.Element> = {
    Dashboard: <DashboardPage />,
    Products: <Products />,
    Orders: <Orders />,
    Account: <Account />,
    VerifyAccount: <VerifyAccountPage />  // Add VerifyAccount content
  };

  const submenuContent: Record<string, JSX.Element> = {
    "Buying Orders": <BuyingOrders />,
    "Selling Orders": <SellingOrders />,
    Identification: <Identification />,
    Payments: <Payments />,
    Security: <Security />,
    "Account Statement": <AccountStatement />,
  };

  const toggleDropdown = (menu: "Orders" | "Account") => {
    setOpenDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleMenuClick = (menu: "Dashboard" | "Products" | "Orders" | "Account" | "VerifyAccount", submenu?: string) => {
    if (!submenu) {
      setActiveMenu(menu);
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(submenu);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[265px] h-full bg-white shadow-md">
        <nav className="mt-4">
          <MenuItem
            label="Dashboard"
            icon={<FaTachometerAlt />}
            isActive={activeMenu === "Dashboard"}
            onClick={() => handleMenuClick("Dashboard")}
          />
          <MenuItem
            label="Products"
            icon={<FaBox />}
            isActive={activeMenu === "Products"}
            onClick={() => handleMenuClick("Products")}
          />
          <MenuItem
            label="Orders"
            icon={<FaShoppingCart />}
            isActive={activeMenu === "Orders"}
            onClick={() => handleMenuClick("Orders")}
            hasDropdown
            isDropdownOpen={openDropdown.Orders}
            onDropdownToggle={() => toggleDropdown("Orders")}
            dropdownItems={[
              { label: "Buying Orders", onClick: () => handleMenuClick("Orders", "Buying Orders") },
              { label: "Selling Orders", onClick: () => handleMenuClick("Orders", "Selling Orders") },
            ]}
            activeSubmenu={activeSubmenu}
          />
          <MenuItem
            label="Account"
            icon={<FaUser />}
            isActive={activeMenu === "Account"}
            onClick={() => handleMenuClick("Account")}
            hasDropdown
            isDropdownOpen={openDropdown.Account}
            onDropdownToggle={() => toggleDropdown("Account")}
            dropdownItems={[
              { label: "Identification", onClick: () => handleMenuClick("Account", "Identification") },
              { label: "Payments", onClick: () => handleMenuClick("Account", "Payments") },
              { label: "Security", onClick: () => handleMenuClick("Account", "Security") },
              { label: "Account Statement", onClick: () => handleMenuClick("Account", "Account Statement") },
            ]}
            activeSubmenu={activeSubmenu}
          />
          <MenuItem
            label="Verify Account"
            icon={<FaUser />}
            isActive={activeMenu === "VerifyAccount"}
            onClick={() => handleMenuClick("VerifyAccount")}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {menuContent[activeMenu]} {/* Render the selected menu content */}
        {activeSubmenu && <div className="mt-4 text-gray-600">Active Submenu: {activeSubmenu}</div>}
      </div>
    </div>
  );
};

interface MenuItemProps {
  label: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
  onDropdownToggle?: () => void;
  dropdownItems?: { label: string; onClick: () => void }[];
  activeSubmenu?: string | null;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  isActive,
  onClick,
  hasDropdown = false,
  isDropdownOpen = false,
  onDropdownToggle,
  dropdownItems = [],
  activeSubmenu,
}) => (
  <div className="p-3">
    <div
      className={`flex items-center p-3 cursor-pointer ${
        isActive ? "bg-neutral-200 text-stone-900" : "text-zinc-500"
      } text-[17px] font-['Lexend Tera'] rounded-md`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
      {hasDropdown && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDropdownToggle && onDropdownToggle();
          }}
          className="ml-auto text-zinc-500"
        >
          {isDropdownOpen ? "▲" : "▼"}
        </button>
      )}
    </div>
    {hasDropdown && isDropdownOpen && (
      <div className="ml-6 mt-2">
        {dropdownItems.map((item, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer text-sm rounded-md ${
              activeSubmenu === item.label
                ? "bg-neutral-200 text-stone-900"
                : "text-zinc-500 hover:bg-neutral-200"
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default DashboardLayout;
