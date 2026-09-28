"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Flame,
  Wrench,
  ArrowUpRight,
  Gauge,
  MessageSquare,
  CheckCircle2,
  Phone,
  Tag,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const WheelIcon = ({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer Tire & Rim Lip */}
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="7.5" strokeWidth="1.5" />
    {/* Center Hub */}
    <circle cx="12" cy="12" r="2.5" />
    {/* 5 Alloy Spokes */}
    <line x1="12" y1="9.5" x2="12" y2="4.5" />
    <line x1="14.4" y1="11.2" x2="19.1" y2="9.7" />
    <line x1="13.5" y1="14" x2="16.4" y2="18.1" />
    <line x1="10.5" y1="14" x2="7.6" y2="18.1" />
    <line x1="9.6" y1="11.2" x2="4.9" y2="9.7" />
  </svg>
);

interface CarouselSlide {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

interface ProductItem {
  id: number;
  name: string;
  price: number;
  priceLabel?: string;
  originalPrice: number | null;
  isSale: boolean;
  saleBadge?: string;
  isPoster?: boolean;
  image: string;
  category: string;
  specs: string[];
}

interface PackageItem {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
}

interface PromoPost {
  id: number;
  badge: string;
  title: string;
  highlightPrice: string;
  subtitle: string;
  image: string;
  brands: string[];
  perks: string[];
  ctaText: string;
}

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  brands: string[];
  icon: "wheel" | "suspension" | "truck" | "light";
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "15\"–20\" RIMS & TIRES FITMENT",
    subtitle: "MOUNTING, BALANCING & WHEEL ALIGNMENT",
    description:
      "Authorized dealer & fitment center for 15\" to 20\" off-road, flow-formed, and JDM wheels paired with all-terrain & mud-terrain tires. Includes computerized wheel balancing & alignment.",
    brands: [
      "BFGoodrich",
      "FUEL Off-Road",
      "VLF Flow Form",
      "RAYS",
      "WORK Wheels",
      "Venom Power",
      "Patriot Tires",
    ],
    icon: "wheel",
  },
  {
    id: 2,
    title: "SUSPENSION & UNDERCHASSIS",
    subtitle: "LIFT PACKAGES, ALIGNMENT & TUNING",
    description:
      "Complete suspension lift kits, adjustable monotube coilovers, underchassis upgrades, and heavy-duty shocks tuned for highway comfort and off-road trails.",
    brands: [
      "Profender Queen Series",
      "Old Man Emu (OME)",
      "RideMax",
      "Wheel Alignment",
    ],
    icon: "suspension",
  },
  {
    id: 3,
    title: "4X4 ARMOR & BED COVERS",
    subtitle: "BUMPERS, ROLLER LIDS, CANOPIES & TRIFOLDS",
    description:
      "Steel bumpers, Hamer rollbars, nudge bars, tow hitches, ARB under-vehicle protection (UVP) plates, manual roller lids, trifold covers, and hard top canopies.",
    brands: [
      "Hamer 4x4",
      "ARB Protection",
      "Roller Lids",
      "Trifold Covers",
      "Hard Top Canopies",
    ],
    icon: "truck",
  },
  {
    id: 4,
    title: "LED LIGHTING & CAMPING GEAR",
    subtitle: "AUXILIARY LIGHTS & OVERLANDING EQUIPMENT",
    description:
      "High-output LED headlights, fog projectors, and trail pods alongside genuine ARB camping gear, chairs, and overland accessories.",
    brands: ["Novsight LED", "Nacho LED", "ARB Camping Gear"],
    icon: "light",
  },
];

const AUTHORIZED_BRANDS: string[] = [
  "BFGOODRICH",
  "FUEL OFF-ROAD",
  "VLF FLOW FORM",
  "PROFENDER",
  "OLD MAN EMU",
  "RIDEMAX",
  "HAMER 4X4",
  "ARB 4X4 ACCESSORIES",
  "VENOM POWER",
  "PATRIOT TIRES",
  "RAYS",
  "WORK WHEELS",
  "NOVSIGHT LED",
  "NACHO LED",
];

const PROMO_POSTS: PromoPost[] = [
  {
    id: 1,
    badge: "FIRST 5 CLIENTS BONUS",
    title: "20-INCH PROMO PACKAGE",
    highlightPrice: "₱96,000",
    subtitle: "20x9 RIMS + 275/55 R20 ALL-TERRAIN TIRES",
    image: "/promos/promo-20inch-package.jpg",
    brands: ["FUEL OFF-ROAD", "VENOM POWER TERRA HUNTER X/T2", "RAYS"],
    perks: [
      "20x9 FUEL Off-Road Rims + 275/55 R20 Venom Power Terra Hunter X/T2",
      "FREE Installation & Computerized Wheel Balance",
      "FREE RAYS Lug Nuts + Camping Chair (First 5 Clients!)",
    ],
    ctaText: "CLAIM 96K PACKAGE",
  },
  {
    id: 2,
    badge: "LIMITED TIME OFFER",
    title: "RIMS PROMO SALE",
    highlightPrice: "20% OFF",
    subtitle: "SELECTED 15\"–20\" OFF-ROAD, FLOW FORM & JDM WHEELS",
    image: "/promos/promo-rims-20off.jpg",
    brands: ["FUEL OFF-ROAD", "VLF FLOW FORM", "RAYS", "WORK WHEELS"],
    perks: [
      "20% OFF on selected Rims across top performance & off-road brands",
      "FUEL Off-Road • VLF Flow Form (Wheelegend) • RAYS • WORK Wheels",
      "Available at Tomas Autoworks — IP Cars Compound, Maharlika Highway",
    ],
    ctaText: "INQUIRE 20% OFF RIMS",
  },
  {
    id: 3,
    badge: "BUY 3 GET 1 FREE",
    title: "PATRIOT TIRE PROMO",
    highlightPrice: "3+1 FREE",
    subtitle: "PATRIOT RUGGED & ALL-TERRAIN TIRES",
    image: "/promos/promo-tire-3plus1.jpg",
    brands: ["PATRIOT TIRES", "OFF-ROAD", "ALL-TERRAIN"],
    perks: [
      "Buy 3 Patriot Tires and get 1 Tire FREE (3+1 Promo)",
      "FREE Installation & Computerized Wheel Balance",
      "Heavy-duty off-road & mud-terrain tread built for Philippine roads",
    ],
    ctaText: "CLAIM 3+1 TIRE PROMO",
  },
];

const CAROUSEL_IMAGES: CarouselSlide[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "4X4 & OFF-ROAD",
    subtitle: "YOUR FRIENDLY NEIGHBORHOOD CAR ACCESSORIES SHOP IN TACLOBAN",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1600705663731-897dbd9cc532?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "RIMS & TIRES",
    subtitle: "15\" TO 20\" FUEL • VLF • RAYS • WORK • BFGOODRICH • VENOM",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "SUSPENSION & RIGS",
    subtitle: "PROFENDER • OLD MAN EMU • RIDEMAX • HAMER 4X4 • ARB",
  },
];

const RIMS_DATA: ProductItem[] = [
  {
    id: 1,
    name: "20-Inch Promo Package (Fuel 20x9 + Venom 275/55 R20)",
    price: 96000,
    originalPrice: 115000,
    isSale: true,
    saleBadge: "96K PROMO!",
    isPoster: true,
    image: "/promos/promo-20inch-package.jpg",
    category: "PREMIUM RIMS",
    specs: [
      "20x9 FUEL Off-Road Rims + 275/55 R20 Venom Power Terra Hunter X/T2",
      "FREE Installation & Computerized Wheel Balance",
      "FIRST 5 CLIENTS: FREE RAYS Lug Nuts + Camping Chair",
      "KC Ken: 0997 269 3611 | Owing: 0962 898 5139 | Johnrick: 0970 382 3659",
    ],
  },
  {
    id: 2,
    name: "Selected Rims Promo (FUEL • VLF • RAYS • WORK)",
    price: 0,
    priceLabel: "20% OFF",
    originalPrice: null,
    isSale: true,
    saleBadge: "20% OFF!",
    isPoster: true,
    image: "/promos/promo-rims-20off.jpg",
    category: "PREMIUM RIMS",
    specs: [
      "20% OFF on selected 15\"–20\" Rims across top off-road & JDM brands",
      "Brands Included: FUEL Off-Road, VLF Flow Form, RAYS, WORK Wheels",
      "Professional Fitment, Wheel Balancing & Alignment Available",
      "KC Ken: 0997 269 3611 | Owing: 0962 898 5139 | Johnrick: 0970 382 3659",
    ],
  },
  {
    id: 3,
    name: "VLF Flow Form Wheelegend Series (15\"–20\")",
    price: 58000,
    originalPrice: 68000,
    isSale: true,
    saleBadge: "20% OFF!",
    image:
      "https://images.unsplash.com/photo-1620054948839-81342674eb99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Ultra-Lightweight Flow-Formed Barrel Construction (15\" to 20\")",
      "Available for SUVs, Pickups (6x139.7) & Street Sedans (5x114.3)",
      "FREE Mounting & Computerized Wheel Balancing",
      "Eligible for Selected Rims 20% OFF Promo",
    ],
  },
  {
    id: 4,
    name: "FUEL Off-Road 20x9 4x4 Alloy Wheels",
    price: 68000,
    originalPrice: 85000,
    isSale: true,
    saleBadge: "20% OFF!",
    image:
      "https://images.unsplash.com/photo-1590324838631-97b7cbba91b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 17\", 18\" & 20x9 Aggressive Off-Road Concave Profiles",
      "Fitment: Hilux, Ranger, Fortuner, Montero, Terra, Triton, D-Max",
      "Pair with Venom Power, Patriot, or BFGoodrich All-Terrain Tires",
      "FREE Installation & Wheel Balancing Included",
    ],
  },
  {
    id: 5,
    name: "BFGoodrich All-Terrain KO2 / KO3 + Rim Package",
    price: 115000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Authorized BFGoodrich Tire Dealer in Tacloban City",
      "CoreGard Technology Tough Sidewall All-Terrain Rubber",
      "Bundled with VLF, FUEL, WORK, or RAYS Off-Road Rims",
      "Includes Free Installation, Wheel Balance & Valve Stems",
    ],
  },
  {
    id: 6,
    name: "RAYS & WORK Wheels JDM / SUV Lineup (15\"–20\")",
    price: 62000,
    originalPrice: 75000,
    isSale: true,
    saleBadge: "20% OFF!",
    image:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Iconic 15\" to 20\" JDM 6-Spoke & Step-Lip Designs for Cars & SUVs",
      "Selected Models Included in 20% OFF Rims Promo",
      "FREE RAYS Lug Nuts on Promo Packages",
      "Expert Flush / Aggressive Fender Fitment & Alignment",
    ],
  },
];

const ACCESSORIES_DATA: ProductItem[] = [
  {
    id: 101,
    name: "Patriot Tires 3+1 Promo (Buy 3 Get 1 Free)",
    price: 0,
    priceLabel: "BUY 3 + 1 FREE",
    originalPrice: null,
    isSale: true,
    saleBadge: "3+1 PROMO!",
    isPoster: true,
    image: "/promos/promo-tire-3plus1.jpg",
    category: "UPGRADES & PARTS",
    specs: [
      "Buy 3 Patriot Tires and Get 1 Tire FREE (3+1 Promo)",
      "FREE Installation & Computerized Wheel Balance",
      "Aggressive All-Terrain & Mud-Terrain Tread Design",
      "KC Ken: 0997 269 3611 | Owing: 0962 898 5139 | Johnrick: 0970 382 3659",
    ],
  },
  {
    id: 102,
    name: "Profender Queen Series Suspension Kit",
    price: 78000,
    originalPrice: 85000,
    isSale: true,
    saleBadge: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Profender Queen Series Front Adjustable Coilovers + Rear Piggyback",
      "8-Step / 16-Step Compression & Rebound Damping Adjustment",
      "Plush Highway Ride + Heavy-Duty Off-Road Control",
      "Includes Underchassis Inspection & Wheel Alignment",
    ],
  },
  {
    id: 103,
    name: "Old Man Emu (OME) Nitrocharger+ & RideMax",
    price: 65000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1552554761-0b5c929837a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Genuine Old Man Emu Nitrocharger+ & RideMax Suspension Systems",
      "Engineered for Both On-Road Comfort and Off-Road Terrain",
      "Matched Coil Springs, Leaf Springs & Struts for 4x4 Pickups/SUVs",
      "Full In-House Underchassis Installation & Alignment",
    ],
  },
  {
    id: 104,
    name: "Hamer 4x4 Bumpers, Rollbars & ARB Protection",
    price: 42000,
    originalPrice: 48000,
    isSale: true,
    saleBadge: "4X4 ARMOR",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Authentic Hamer 4x4 Steel Bumpers, Roll Bars, Nudge Bars & Tow Hitches",
      "ARB Under-Vehicle Protection (UVP) Skid Plates & Recovery Gear",
      "Matte Black Powder-Coated Heavy-Duty Steel Construction",
      "Direct Fitment for Hilux, Ranger, Triton, Navara & D-Max",
    ],
  },
  {
    id: 105,
    name: "Roller Lids, Trifold Covers & Hard Top Canopies",
    price: 32000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1596769490190-84c483d8b1e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Manual & Electric Retractable Roller Lids, Trifold Covers & Canopies",
      "Weatherproof Key-Locking Cargo Protection for Pickup Beds",
      "Compatible with Hamer Sports Bars & Overland Rack Systems",
      "Includes Drainage Channels & Professional Installation",
    ],
  },
  {
    id: 106,
    name: "Novsight / Nacho LED & ARB Camping Gear",
    price: 14500,
    originalPrice: 16500,
    isSale: true,
    saleBadge: "OVERLAND",
    image:
      "https://images.unsplash.com/photo-1506016147775-68a85de9b30c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Authorized Novsight LED & Nacho Off-Road Auxiliary Lighting",
      "Genuine ARB Camping Chairs, Tables & Overland Accessories",
      "IP68 Waterproof Lighting for Heavy Rain & Trail Driving",
      "Clean Relay Harness & Aiming Calibration Included",
    ],
  },
];

const PACKAGES_DATA: PackageItem[] = [
  {
    id: 1,
    name: "20\" RIM & TIRE PROMO BUILD",
    description: "Our signature 96K all-in wheel & tire upgrade package.",
    price: 96000,
    features: [
      "20x9 FUEL Off-Road Alloy Rims",
      "275/55 R20 Venom Power Terra Hunter X/T2",
      "FREE Installation & Wheel Balance",
      "FREE RAYS Lug Nuts + Camping Chair (First 5!)",
    ],
  },
  {
    id: 2,
    name: "4X4 SUSPENSION & ALIGNMENT",
    description:
      "Plush daily comfort meets commanding off-road ground clearance.",
    price: 135000,
    features: [
      "Profender Queen Series / Old Man Emu / RideMax",
      "Underchassis & Upper Control Arm Setup",
      "2-Inch Suspension Lift & Leveling",
      "Computerized Wheel Alignment & Balance",
    ],
  },
  {
    id: 3,
    name: "OVERLAND ARMOR & CAMPING RIG",
    description: "Complete 4x4 protection, bed cover, lighting & ARB gear.",
    price: 175000,
    features: [
      "Hamer 4x4 Rollbar/Bumper & ARB UVP Plates",
      "Roller Lid / Trifold / Hard Top Canopy",
      "Patriot 3+1 or BFGoodrich All-Terrain Tires",
      "Novsight / Nacho LED + ARB Camping Gear",
    ],
  },
];

const formatPHP = (number: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(number);
};

const Marquee = () => (
  <div className="bg-[#fe0002] text-white py-3 overflow-hidden border-y-4 border-black relative z-40 w-full shadow-[0_6px_0_0_rgba(0,0,0,1)]">
    <div className="whitespace-nowrap flex w-max animate-[marquee_20s_linear_infinite] font-black text-lg md:text-2xl tracking-widest uppercase">
      {AUTHORIZED_BRANDS.concat(AUTHORIZED_BRANDS).map((brand, i) => (
        <span key={i} className="mx-5 drop-shadow-[2px_2px_0_black]">
          • {brand}
        </span>
      ))}
    </div>
  </div>
);

const ProductGrid = ({
  title,
  data,
  onSelectProduct,
}: {
  title: string;
  data: ProductItem[];
  onSelectProduct: (item: ProductItem) => void;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const displayData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="py-14 md:py-16 relative bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-50 opacity-50 pointer-events-none whitespace-nowrap z-0">
        {title.split(" ")[0]}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b-4 border-black pb-4">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">
            {title.split(" ")[0]} <br />{" "}
            <span className="text-[#fe0002]">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              aria-label="Previous Page"
              className="w-11 h-11 bg-black text-white flex items-center justify-center disabled:bg-gray-300 hover:bg-[#fe0002] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer border-2 border-black disabled:border-gray-300"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="px-3 font-black text-lg tracking-widest">
              {currentPage + 1} <span className="text-[#fe0002]">/</span>{" "}
              {totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
              }
              disabled={currentPage === totalPages - 1}
              aria-label="Next Page"
              className="w-11 h-11 bg-black text-white flex items-center justify-center disabled:bg-gray-300 hover:bg-[#fe0002] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer border-2 border-black disabled:border-gray-300"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {displayData.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group relative bg-white border-4 border-black hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(254,0,2,1)] transition-all duration-300 flex flex-col cursor-pointer overflow-visible"
              >
                {item.isSale && (
                  <div className="absolute -top-4 -right-4 bg-[#fe0002] text-white px-4 py-1.5 border-2 border-black font-black text-sm md:text-base uppercase transform rotate-6 z-30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
                    {item.saleBadge || "SALE!"}
                  </div>
                )}

                <div
                  className={`relative h-64 md:h-72 overflow-hidden border-b-4 border-black ${
                    item.isPoster ? "bg-neutral-950" : "bg-gray-100"
                  }`}
                >
                  {!item.isPoster && (
                    <div className="absolute inset-0 bg-[#fe0002] opacity-0 group-hover:opacity-20 mix-blend-multiply transition-opacity duration-300 z-10"></div>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className={
                      item.isPoster
                        ? "w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        : "w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
                    }
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                    <span className="w-full bg-black text-white px-4 py-2.5 font-black uppercase text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-[#fe0002]">
                      {item.isPoster ? "View Promo Details" : "Inspect Specs"}{" "}
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                  <h3 className="text-lg md:text-xl font-black text-black leading-snug mb-3 uppercase">
                    {item.name}
                  </h3>
                  <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-300">
                    {item.isSale ? (
                      <div className="flex flex-col">
                        {item.originalPrice ? (
                          <span className="text-xs md:text-sm font-bold text-gray-400 line-through tracking-wider">
                            {formatPHP(item.originalPrice)}
                          </span>
                        ) : (
                          <span className="text-xs md:text-sm font-bold text-black uppercase tracking-wider">
                            LIMITED TIME PROMO
                          </span>
                        )}
                        <span className="text-2xl md:text-3xl font-black text-[#fe0002] tracking-tighter">
                          {item.priceLabel
                            ? item.priceLabel
                            : formatPHP(item.price)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-transparent mb-0.5">
                          Spacer
                        </span>
                        <span className="text-2xl md:text-3xl font-black text-black tracking-tighter">
                          {item.priceLabel
                            ? item.priceLabel
                            : formatPHP(item.price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [selectedPromo, setSelectedPromo] = useState<PromoPost | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden pb-20 md:pb-0">
      <nav className="fixed w-full z-50 bg-[#fe0002] border-b-4 border-black transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Tomas Autoworks Logo"
                fetchPriority="high"
                className="h-14 sm:h-16 md:h-[4.5rem] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="hidden sm:inline-block text-xs font-black text-black tracking-[0.2em] uppercase bg-white px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                Tacloban
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-1">
              {["Promos", "Services", "Rims", "Accessories", "Packages"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-3.5 py-2 text-white font-black uppercase tracking-wider text-sm lg:text-base hover:bg-black hover:text-[#fe0002] hover:-skew-x-12 transition-all"
                  >
                    {item}
                  </a>
                )
              )}
              <a
                href="#contact"
                className="ml-2 px-5 py-2.5 bg-black text-white font-black uppercase tracking-wider text-sm lg:text-base border-2 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              >
                BOOK NOW
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="text-white focus:outline-none bg-black p-2.5 border-2 border-white active:bg-[#fe0002] active:scale-95 transition-all cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="md:hidden bg-black border-t-4 border-black absolute w-full left-0 shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col p-5 space-y-3">
                {["Promos", "Services", "Rims", "Accessories", "Packages"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white font-black uppercase text-xl border-b-2 border-gray-800 pb-3 hover:text-[#fe0002]"
                    >
                      {item}
                    </a>
                  )
                )}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 py-4 bg-[#fe0002] text-white font-black uppercase text-center text-lg border-4 border-[#fe0002] active:bg-white active:text-[#fe0002] active:border-black transition-colors"
                >
                  Contact Us Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative h-[85vh] md:h-[90vh] w-full bg-black overflow-hidden pt-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>
            <img
              src={CAROUSEL_IMAGES[currentSlide].url}
              alt={CAROUSEL_IMAGES[currentSlide].title}
              fetchPriority="high"
              className="w-full h-full object-cover filter contrast-125"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 w-full px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
            className="bg-[#fe0002] text-white px-5 py-2 border-2 border-black font-black uppercase tracking-widest text-xs md:text-base mb-5 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transform -rotate-2"
          >
            {CAROUSEL_IMAGES[currentSlide].subtitle}
          </motion.div>

          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-[4px_4px_0_#fe0002]"
          >
            {CAROUSEL_IMAGES[currentSlide].title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i % 2 !== 0
                    ? "text-transparent [-webkit-text-stroke:1.5px_white] md:[-webkit-text-stroke:3px_white] drop-shadow-none"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto px-4"
          >
            <a
              href="#promos"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#fe0002] text-white font-black text-base md:text-lg uppercase tracking-widest border-4 border-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all inline-flex items-center justify-center gap-3 group"
            >
              <span>HOT PROMOS</span>
              <Flame className="shrink-0 group-hover:scale-110 transition-transform" size={20} />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-black font-black text-base md:text-lg uppercase tracking-widest border-4 border-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(254,0,2,1)] transition-all inline-flex items-center justify-center gap-3 group"
            >
              <span>OUR SERVICES</span>
              <Wrench className="shrink-0 group-hover:rotate-12 transition-transform duration-300" size={20} />
            </a>
          </motion.div>

          <div className="flex items-center gap-2.5 mt-8">
            {CAROUSEL_IMAGES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                className={`h-3 border-2 border-black transition-all cursor-pointer ${
                  currentSlide === index
                    ? "w-9 bg-[#fe0002] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    : "w-3 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <main className="bg-white relative z-30 pt-12">
        {/* Quick Category Cards */}
        <section className="max-w-6xl mx-auto px-4 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#rims"
              className="group relative h-52 md:h-56 border-4 border-black bg-white overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-5">
                <div className="w-12 h-12 flex items-center justify-center mb-3.5">
                  <WheelIcon
                    size={46}
                    className="text-black group-hover:text-white group-hover:rotate-45 transition-all duration-500"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-none text-black group-hover:text-white transition-colors duration-500">
                  WHEELS & TIRES
                </h3>
                <p className="font-bold text-sm md:text-base text-[#fe0002] uppercase mt-2 tracking-widest">
                  15&quot;–20&quot; Rims • BFGoodrich
                </p>
              </div>
            </a>

            <a
              href="#accessories"
              className="group relative h-52 md:h-56 border-4 border-black bg-white overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#fe0002] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
              <div className="relative z-20 flex flex-col items-center justify-center text-center px-5">
                <div className="w-12 h-12 flex items-center justify-center mb-3.5">
                  <Gauge
                    size={44}
                    className="text-black group-hover:text-white transition-colors duration-500"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-none text-black group-hover:text-white transition-colors duration-500">
                  SUSPENSION & 4X4
                </h3>
                <p className="font-bold text-sm md:text-base text-[#fe0002] group-hover:text-black uppercase mt-2 tracking-widest transition-colors duration-500">
                  Profender • OME • Hamer • ARB
                </p>
              </div>
            </a>

            <a
              href="#packages"
              className="group relative h-52 md:h-56 border-4 border-black bg-black overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-5">
                <div className="w-12 h-12 flex items-center justify-center mb-3.5">
                  <Wrench
                    size={42}
                    className="text-[#fe0002] group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-none text-white group-hover:text-black transition-colors duration-500">
                  BUILD PACKAGES
                </h3>
                <p className="font-bold text-sm md:text-base text-gray-400 group-hover:text-[#fe0002] uppercase mt-2 tracking-widest transition-colors duration-500">
                  Install, Balance & Alignment
                </p>
              </div>
            </a>
          </div>
        </section>

        {/* Featured Promo Posts Section */}
        <section
          id="promos"
          className="py-16 bg-neutral-950 border-y-4 border-black relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b-4 border-[#fe0002] pb-4 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#fe0002] text-white px-3 py-1 border-2 border-white font-black uppercase text-xs tracking-widest mb-3">
                  <Tag size={14} /> OFFICIAL SHOP PROMOS
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                  FEATURED <span className="text-[#fe0002]">PROMO POSTS</span>
                </h2>
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">
                Click any poster to inspect full promo details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROMO_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border-4 border-black flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
                >
                  {/* Poster Image Container */}
                  <div
                    onClick={() => setSelectedPromo(post)}
                    className="relative bg-neutral-900 border-b-4 border-black cursor-pointer group overflow-hidden"
                  >
                    <div className="absolute top-3 left-3 z-20 bg-[#fe0002] text-white px-2.5 py-1 border-2 border-black font-black uppercase text-[11px] tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {post.badge}
                    </div>
                    <div className="absolute top-3 right-3 z-20 bg-yellow-400 text-black px-3 py-1 border-2 border-black font-black uppercase text-sm md:text-base tracking-tight shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {post.highlightPrice}
                    </div>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-contain bg-black group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-black text-white px-3 py-1.5 border-2 border-white font-black uppercase text-xs inline-flex items-center gap-1.5">
                        View Full Poster <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>

                  {/* Post Details & CTA */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.brands.map((brand) => (
                          <span
                            key={brand}
                            className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-black px-2 py-0.5 border-2 border-black"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg md:text-xl font-black uppercase text-black leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-xs font-black uppercase text-[#fe0002] tracking-wider mt-1 mb-4">
                        {post.subtitle}
                      </p>

                      <ul className="space-y-2 mb-5 border-t-2 border-dashed border-gray-300 pt-3.5">
                        {post.perks.map((perk, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs font-bold uppercase text-black"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-[#fe0002] shrink-0 mt-0.5"
                            />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <a
                        href="https://www.facebook.com/tomasautoworkstacloban"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-[#fe0002] text-white font-black text-xs md:text-sm uppercase tracking-wider border-2 border-black hover:bg-black transition-colors inline-flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Facebook size={16} />
                        {post.ctaText}
                      </a>
                      <button
                        onClick={() => setSelectedPromo(post)}
                        className="w-full py-2 px-4 bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-black hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        ZOOM POSTER
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop Services & Authorized Brands Section */}
        <section
          id="services"
          className="py-16 bg-gray-50 border-b-4 border-black relative"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b-4 border-black pb-4 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 border-2 border-black font-black uppercase text-xs tracking-widest mb-3">
                  <ShieldCheck size={14} className="text-[#fe0002]" /> YOUR
                  FRIENDLY NEIGHBORHOOD CAR ACCESSORIES SHOP
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">
                  SHOP SERVICES & <br />
                  <span className="text-[#fe0002]">SPECIALIZATIONS</span>
                </h2>
              </div>
              <p className="text-xs md:text-sm font-black uppercase tracking-widest text-black bg-white px-3.5 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(254,0,2,1)]">
                IP Cars Compound, Maharlika Highway
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border-4 border-black p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-dashed border-gray-300">
                      <div>
                        <h3 className="text-xl md:text-2xl font-black uppercase text-black leading-none">
                          {service.title}
                        </h3>
                        <p className="text-xs font-black uppercase text-[#fe0002] tracking-widest mt-1.5">
                          {service.subtitle}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center shrink-0">
                        {service.icon === "wheel" && (
                          <WheelIcon size={28} className="text-[#fe0002]" />
                        )}
                        {service.icon === "suspension" && (
                          <Gauge size={28} className="text-[#fe0002]" />
                        )}
                        {service.icon === "truck" && (
                          <Truck size={28} className="text-[#fe0002]" />
                        )}
                        {service.icon === "light" && (
                          <Sparkles size={28} className="text-[#fe0002]" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm font-bold text-gray-800 uppercase leading-relaxed mb-5">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.brands.map((brand) => (
                      <span
                        key={brand}
                        className="text-[11px] font-black uppercase tracking-wider bg-black text-white px-2.5 py-1 border-2 border-black"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Authorized Brands Banner */}
            <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(254,0,2,1)]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <h4 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">
                  FEATURED & AUTHORIZED{" "}
                  <span className="text-[#fe0002]">BRANDS WE CARRY</span>
                </h4>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                  100% Authentic Parts • Free Promo Installation & Wheel Balance
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {AUTHORIZED_BRANDS.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 bg-white text-black font-black text-xs md:text-sm uppercase tracking-wider border-2 border-[#fe0002]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="rims">
          <ProductGrid
            title="PREMIUM RIMS"
            data={RIMS_DATA}
            onSelectProduct={setSelectedProduct}
          />
        </section>

        <Marquee />

        <section id="accessories">
          <ProductGrid
            title="UPGRADES & PARTS"
            data={ACCESSORIES_DATA}
            onSelectProduct={setSelectedProduct}
          />
        </section>

        <section
          id="packages"
          className="py-20 bg-black relative border-t-4 border-black"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-14 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_#fe0002]">
                SIGNATURE BUILDS
              </h2>
              <div className="w-28 h-2.5 bg-[#fe0002]"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PACKAGES_DATA.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white border-4 border-black flex flex-col group hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
                >
                  <div className="bg-black text-white p-5 md:p-6 min-h-[5.25rem] border-b-4 border-black flex justify-between items-center gap-4 group-hover:bg-[#fe0002] transition-colors">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                      {pkg.name}
                    </h3>
                    {pkg.id === 1 && (
                      <WheelIcon
                        className="text-[#fe0002] group-hover:text-white shrink-0 transition-colors"
                        size={30}
                      />
                    )}
                    {pkg.id === 2 && (
                      <Gauge
                        className="text-[#fe0002] group-hover:text-white shrink-0 transition-colors"
                        size={30}
                      />
                    )}
                    {pkg.id === 3 && (
                      <Truck
                        className="text-[#fe0002] group-hover:text-white shrink-0 transition-colors"
                        size={30}
                      />
                    )}
                  </div>

                  <div className="p-6 flex-grow bg-white">
                    <p className="text-gray-900 font-bold text-sm md:text-base mb-6 uppercase italic border-l-4 border-[#fe0002] pl-4">
                      {pkg.description}
                    </p>

                    <ul className="space-y-4 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3.5 text-black font-black uppercase text-sm md:text-base"
                        >
                          <span className="w-7 h-7 bg-black text-white flex items-center justify-center shrink-0 border-2 border-black group-hover:bg-[#fe0002] group-hover:border-[#fe0002] transition-colors text-xs">
                            {idx + 1}
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-100 border-t-4 border-dashed border-gray-300 text-center">
                    <div className="text-3xl md:text-4xl font-black text-black tracking-tighter mb-5">
                      {formatPHP(pkg.price)}
                    </div>
                    <a
                      href="#contact"
                      className="block w-full py-3.5 bg-black text-white font-black text-base md:text-lg uppercase tracking-widest border-4 border-black hover:bg-[#fe0002] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      REQUEST BUILD
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="bg-[#fe0002] text-white border-t-4 border-black pt-16 pb-28 md:pb-12 relative"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-14 border-b-4 border-black pb-14">
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 drop-shadow-[4px_4px_0_black]">
                READY TO <br /> UPGRADE YOUR RIG?
              </h2>
              <p className="font-bold text-base md:text-lg uppercase tracking-widest text-black bg-white px-5 py-3 inline-block border-4 border-black mb-6">
                Your Friendly Neighborhood Car Accessories Shop
              </p>
              <div className="bg-black/90 border-4 border-black p-4 text-left max-w-md mx-auto md:mx-0">
                <p className="text-xs font-black uppercase tracking-widest text-[#fe0002] mb-1">
                  TACLOBAN FITMENT, SUSPENSION & 4X4 HQ
                </p>
                <p className="text-xs md:text-sm font-bold uppercase text-white leading-relaxed">
                  15&quot;–20&quot; Rims & Tires • Wheel Alignment & Balance •
                  Profender, OME & RideMax Suspension • Hamer 4x4 & ARB Armor •
                  Roller Lids, Trifolds & Hard Top Canopies • LED Lighting & ARB
                  Camping Gear
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <a
                href="https://www.facebook.com/tomasautoworkstacloban"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-6 bg-black border-4 border-white flex items-center justify-between group hover:bg-white transition-colors hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2"
              >
                <div className="flex items-center gap-5">
                  <Facebook
                    size={36}
                    className="text-white group-hover:text-black shrink-0"
                  />
                  <div>
                    <h4 className="font-black text-xl md:text-2xl uppercase text-white group-hover:text-black leading-tight">
                      TOMAS AUTOWORKS TACLOBAN
                    </h4>
                    <p className="font-bold text-sm md:text-base text-gray-400 group-hover:text-[#fe0002] uppercase mt-1">
                      12.2K+ Followers • Message Us on Facebook
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={28}
                  className="text-white group-hover:text-black shrink-0 hidden sm:block"
                />
              </a>

              <div className="w-full p-6 bg-white border-4 border-black flex flex-col gap-4">
                <h4 className="font-black text-xl md:text-2xl uppercase text-black">
                  HEADQUARTERS & SALES REPS
                </h4>
                <div className="flex items-start gap-4 text-black font-bold uppercase text-sm md:text-base">
                  <MapPin size={24} className="text-[#fe0002] shrink-0 mt-0.5" />
                  <p>
                    Maharlika Highway (IP Cars Compound,
                    <br />
                    Across Angelicum Learning School),
                    <br />
                    Tacloban City, Leyte, Philippines
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-black font-black uppercase text-xs md:text-sm border-t-2 border-dashed border-gray-300 pt-3">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#fe0002] shrink-0" />
                    <span>KC KEN: 0997 269 3611</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#fe0002] shrink-0" />
                    <span>OWING (ANGKOL OWING): 0962 898 5139</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#fe0002] shrink-0" />
                    <span>JOHNRICK CABRERA: 0970 382 3659</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-black font-black uppercase tracking-widest text-sm md:text-base">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src="/logo.png"
                alt="Tomas Autoworks Logo"
                loading="lazy"
                className="h-16 md:h-20 w-auto object-contain"
              />
              <p className="text-white drop-shadow-[2px_2px_0_black]">
                &copy; {new Date().getFullYear()} TOMAS AUTOWORKS TACLOBAN • MAS
                AUTODESIGN CORP.
              </p>
            </div>
            <p className="bg-black text-white px-4 py-2.5 border-2 border-black text-center text-xs md:text-sm">
              AUTHORIZED DEALER • STRICTLY PREMIUM.
            </p>
          </div>
        </div>
      </footer>

      {/* Promo Poster Lightbox Modal */}
      <AnimatePresence>
        {selectedPromo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPromo(null)}
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black max-w-xl w-full overflow-hidden shadow-[14px_14px_0px_0px_rgba(254,0,2,1)]"
            >
              <div className="bg-black text-white px-5 py-3 border-b-4 border-black flex justify-between items-center">
                <span className="font-black uppercase tracking-widest text-xs md:text-sm text-[#fe0002]">
                  {selectedPromo.title} — {selectedPromo.highlightPrice}
                </span>
                <button
                  onClick={() => setSelectedPromo(null)}
                  aria-label="Close Promo Poster"
                  className="bg-[#fe0002] text-white p-1.5 border-2 border-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="bg-black max-h-[75vh] overflow-y-auto flex items-center justify-center">
                <img
                  src={selectedPromo.image}
                  alt={selectedPromo.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-4 bg-white border-t-4 border-black flex flex-col sm:flex-row gap-3 justify-between items-center">
                <span className="text-xs font-black uppercase text-black">
                  KC Ken: 0997 269 3611 | Owing: 0962 898 5139 | Johnrick: 0970
                  382 3659
                </span>
                <a
                  href="https://www.facebook.com/tomasautoworkstacloban"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#fe0002] text-white font-black text-xs md:text-sm uppercase tracking-wider border-2 border-black hover:bg-black transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Facebook size={16} />
                  {selectedPromo.ctaText}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black max-w-2xl w-full overflow-hidden shadow-[14px_14px_0px_0px_rgba(254,0,2,1)]"
            >
              <div className="bg-black text-white px-5 py-3 border-b-4 border-black flex justify-between items-center">
                <span className="font-black uppercase tracking-widest text-xs md:text-sm text-[#fe0002]">
                  {selectedProduct.category}
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close Spec Modal"
                  className="bg-[#fe0002] text-white p-1.5 border-2 border-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className={`relative border-b-4 md:border-b-0 md:border-r-4 border-black ${
                    selectedProduct.isPoster
                      ? "bg-neutral-950 flex items-center justify-center max-h-[65vh]"
                      : "h-60 md:h-full bg-gray-100"
                  }`}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className={
                      selectedProduct.isPoster
                        ? "w-full h-full max-h-[65vh] object-contain"
                        : "w-full h-full object-cover"
                    }
                  />
                  {selectedProduct.isSale && (
                    <div className="absolute top-3 left-3 bg-[#fe0002] text-white px-3 py-1 border-2 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {selectedProduct.saleBadge || "SALE!"}
                    </div>
                  )}
                </div>

                <div className="p-5 md:p-6 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-black leading-tight mb-3">
                      {selectedProduct.name}
                    </h3>
                    <div className="mb-5">
                      {selectedProduct.isSale &&
                        selectedProduct.originalPrice && (
                          <span className="block text-xs md:text-sm font-bold text-gray-400 line-through">
                            {formatPHP(selectedProduct.originalPrice)}
                          </span>
                        )}
                      <span className="text-2xl md:text-3xl font-black text-[#fe0002] tracking-tighter">
                        {selectedProduct.priceLabel
                          ? selectedProduct.priceLabel
                          : formatPHP(selectedProduct.price)}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-6 border-t-2 border-dashed border-gray-300 pt-4">
                      {selectedProduct.specs.map((spec, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 font-bold text-xs md:text-sm uppercase text-black"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-[#fe0002] shrink-0 mt-0.5"
                          />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="https://www.facebook.com/tomasautoworkstacloban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-black text-white font-black text-sm md:text-base uppercase tracking-widest border-2 border-black hover:bg-[#fe0002] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2.5"
                  >
                    <Facebook size={18} />
                    {selectedProduct.isPoster
                      ? "CLAIM THIS PROMO"
                      : "INQUIRE THIS PART"}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-black border-t-4 border-[#fe0002] z-[100] shadow-[0_-8px_16px_rgba(0,0,0,0.5)]">
        <a
          href="https://www.facebook.com/tomasautoworkstacloban"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#fe0002] text-white font-black text-lg uppercase tracking-widest border-2 border-white flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <MessageSquare size={22} />
          MESSAGE US
        </a>
      </div>
    </div>
  );
}
