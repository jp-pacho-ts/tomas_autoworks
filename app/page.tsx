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
  Zap,
  Flame,
  Crosshair,
  ArrowUpRight,
  Gauge,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

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
  originalPrice: number | null;
  isSale: boolean;
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

const CAROUSEL_IMAGES: CarouselSlide[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1600705663731-897dbd9cc532?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "STANCE & FITMENT",
    subtitle: "WE DON'T DO STOCK. WE DO PERFECT.",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "DRAG PREP",
    subtitle: "BUILT TO DOMINATE THE ASPHALT.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "EURO TUNING",
    subtitle: "PRECISION MEETS PERFORMANCE.",
  },
];

const RIMS_DATA: ProductItem[] = [
  {
    id: 1,
    name: "Stance Multi-spoke 19x10.5",
    price: 180000,
    originalPrice: 200000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1620054948839-81342674eb99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 19x10.5J Square / Staggered",
      "Offset: +15 to +22 Custom Fitment",
      "PCD: 5x114.3 / 5x120",
      "Construction: 3-Piece Step Lip Forged",
    ],
  },
  {
    id: 2,
    name: "Euro Mesh 18x9 Forged",
    price: 250000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1590324838631-97b7cbba91b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 18x9J",
      "Offset: +30 Euro Spec",
      "PCD: 5x112 / 5x120",
      "Construction: Monoblock 6061-T6 Forged",
    ],
  },
  {
    id: 3,
    name: "Drag Radial Setup 15x8",
    price: 120000,
    originalPrice: 140000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1526367800727-b5b248a3ba5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 15x8J Beadlock Ready",
      "Tire Pairing: High-Traction Drag Radial",
      "Weight: Ultra-lightweight Strip Spec",
      "Includes Balancing & Valve Hardware",
    ],
  },
  {
    id: 4,
    name: "Track Spec Forged 18x9.5",
    price: 190000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 18x9.5J Concave Face",
      "Offset: +22 Track Clearance",
      "Knurled Bead Seat for High Grip",
      "Big Brake Kit Compatible",
    ],
  },
  {
    id: 5,
    name: "Deep Dish VIP 20x11",
    price: 185000,
    originalPrice: 195000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 20x11J Aggressive Lip",
      "Finish: Mirror Polished Barrel + Brushed Face",
      "Air Suspension Fender-to-Lip Ready",
      "Includes Hubcentric Rings & Lug Hardware",
    ],
  },
  {
    id: 6,
    name: "Classic JDM 6-Spoke 17x9",
    price: 95000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "PREMIUM RIMS",
    specs: [
      "Size: 17x9J Iconic 6-Spoke",
      "Offset: +25 Street/Track Fitment",
      "PCD: 5x114.3 / 5x100",
      "Lightweight Flow-Formed Barrel",
    ],
  },
];

const ACCESSORIES_DATA: ProductItem[] = [
  {
    id: 101,
    name: "Super Low Stance Coilovers",
    price: 55000,
    originalPrice: 60000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "32-Way Damping Force Adjustment",
      "Pillowball Camber Top Mounts",
      "Full-Length Ride Height Adjustable",
      "High-Tensile Heavy Duty Springs",
    ],
  },
  {
    id: 102,
    name: "Air Suspension Management",
    price: 180000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1552554761-0b5c929837a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Digital Pressure Preset Controller + Mobile App",
      "Dual High-Output Compressors",
      "Seamless Aluminum Air Tank",
      "Complete Double-Bellow Air Struts & Lines",
    ],
  },
  {
    id: 103,
    name: "Drag Slicks (Pair)",
    price: 45000,
    originalPrice: 50000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Soft R2 Drag Compound for Maximum 60ft Launch",
      "Reinforced Sidewall Construction",
      "Proven Strip Consistency",
      "Professional Mounting & Balancing Included",
    ],
  },
  {
    id: 104,
    name: "Adjustable Camber Arms",
    price: 12000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1596769490190-84c483d8b1e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "CNC Billet / Heavy-Wall Steel Construction",
      "Spherical Bearings for Zero Deflection",
      "Wide Camber Correction Range",
      "Direct Bolt-On Installation",
    ],
  },
  {
    id: 105,
    name: "Euro Spec Big Brake Kit",
    price: 110000,
    originalPrice: 125000,
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1506016147775-68a85de9b30c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "6-Piston Forged Monoblock Calipers",
      "380mm 2-Piece Slotted & Drilled Floating Rotors",
      "Stainless Steel Braided Brake Lines",
      "High-Temp Street/Track Pads Included",
    ],
  },
  {
    id: 106,
    name: "Drag Prep Tuning Kit",
    price: 48000,
    originalPrice: null,
    isSale: false,
    image:
      "https://images.unsplash.com/photo-1620054948839-81342674eb99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "UPGRADES & PARTS",
    specs: [
      "Launch Control & Boost-by-Gear Calibration",
      "Drivetrain Stiffening Mount Package",
      "High-Flow Fuel & Ignition Prep",
      "Dyno & Street Verification",
    ],
  },
];

const PACKAGES_DATA: PackageItem[] = [
  {
    id: 1,
    name: "VIP STANCE BUILD",
    description: "Aggressive static drop or bagged perfection. Lay it out.",
    price: 165000,
    features: [
      "Coilovers / Air Ride Install",
      "Fender Rolling & Pulling",
      "Custom Camber Setup",
      "Laser Alignment",
    ],
  },
  {
    id: 2,
    name: "DRAG PREP TUNE",
    description: "Maximized traction. Reduced mass. Pure straight-line speed.",
    price: 250000,
    features: [
      "M/T Drag Slicks Fitting",
      "Lightweight Alloy Prep",
      "Suspension Tuning",
      "Launch Geometry Alignment",
    ],
  },
  {
    id: 3,
    name: "EURO TRACK SETUP",
    description: "Corner carving capability with autobahn stability.",
    price: 320000,
    features: [
      "Big Brake Kit Install",
      "Euro Mesh Wheel Fitment",
      "Track Spec Coilovers",
      "Corner Balancing",
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
      {Array(15)
        .fill("• TOMAS AUTOWORKS • PREMIUM UPGRADES ")
        .map((text, i) => (
          <span key={i} className="mx-5 drop-shadow-[2px_2px_0_black]">
            {text}
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
                    SALE!
                  </div>
                )}

                <div className="relative h-56 md:h-60 overflow-hidden bg-gray-100 border-b-4 border-black">
                  <div className="absolute inset-0 bg-[#fe0002] opacity-0 group-hover:opacity-20 mix-blend-multiply transition-opacity duration-300 z-10"></div>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                    <span className="w-full bg-black text-white px-4 py-2.5 font-black uppercase text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-[#fe0002]">
                      Inspect Specs <ArrowUpRight size={18} />
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
                        <span className="text-xs md:text-sm font-bold text-gray-400 line-through tracking-wider">
                          {formatPHP(item.originalPrice as number)}
                        </span>
                        <span className="text-2xl md:text-3xl font-black text-[#fe0002] tracking-tighter">
                          {formatPHP(item.price)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-transparent mb-0.5">
                          Spacer
                        </span>
                        <span className="text-2xl md:text-3xl font-black text-black tracking-tighter">
                          {formatPHP(item.price)}
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
              {["Rims", "Accessories", "Packages"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-white font-black uppercase tracking-wider text-sm lg:text-base hover:bg-black hover:text-[#fe0002] hover:-skew-x-12 transition-all"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-3 px-5 py-2.5 bg-black text-white font-black uppercase tracking-wider text-sm lg:text-base border-2 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
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
                {["Rims", "Accessories", "Packages"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white font-black uppercase text-xl border-b-2 border-gray-800 pb-3 hover:text-[#fe0002]"
                  >
                    {item}
                  </a>
                ))}
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
              href="#packages"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#fe0002] text-white font-black text-base md:text-lg uppercase tracking-widest border-4 border-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-3 group"
            >
              BUILD IT{" "}
              <Flame className="group-hover:animate-pulse" size={22} />
            </a>
            <a
              href="#rims"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-black font-black text-base md:text-lg uppercase tracking-widest border-4 border-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(254,0,2,1)] transition-all flex items-center justify-center gap-3"
            >
              PARTS <Crosshair size={22} />
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
        <section className="max-w-6xl mx-auto px-4 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#rims"
              className="group relative h-52 md:h-56 border-4 border-black bg-white overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <div className="relative z-10 text-center px-5">
                <Gauge
                  size={44}
                  className="mx-auto mb-4 text-black group-hover:text-white transition-colors duration-500"
                />
                <h3 className="text-2xl md:text-3xl font-black uppercase text-black group-hover:text-white transition-colors duration-500">
                  WHEELS
                </h3>
                <p className="font-bold text-sm md:text-base text-[#fe0002] uppercase mt-1.5 tracking-widest">
                  Shop Fitment
                </p>
              </div>
            </a>

            <a
              href="#accessories"
              className="group relative h-52 md:h-56 border-4 border-black bg-white overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#fe0002] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
              <div className="relative z-20 text-center px-5">
                <Zap
                  size={44}
                  className="mx-auto mb-4 text-black group-hover:text-white transition-colors duration-500"
                />
                <h3 className="text-2xl md:text-3xl font-black uppercase text-black group-hover:text-white transition-colors duration-500">
                  PERFORMANCE
                </h3>
                <p className="font-bold text-sm md:text-base text-[#fe0002] group-hover:text-black uppercase mt-1.5 tracking-widest transition-colors duration-500">
                  Brakes & Suspension
                </p>
              </div>
            </a>

            <a
              href="#packages"
              className="group relative h-52 md:h-56 border-4 border-black bg-black overflow-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <div className="relative z-10 text-center px-5">
                <Flame size={44} className="mx-auto mb-4 text-[#fe0002]" />
                <h3 className="text-2xl md:text-3xl font-black uppercase text-white group-hover:text-black transition-colors duration-500">
                  PACKAGES
                </h3>
                <p className="font-bold text-sm md:text-base text-gray-400 group-hover:text-[#fe0002] uppercase mt-1.5 tracking-widest transition-colors duration-500">
                  All-in-one builds
                </p>
              </div>
            </a>
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
                VIP BUILDS
              </h2>
              <div className="w-28 h-2.5 bg-[#fe0002]"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PACKAGES_DATA.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white border-4 border-black flex flex-col group hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_rgba(254,0,2,1)] transition-all duration-300"
                >
                  <div className="bg-black text-white p-5 md:p-6 border-b-4 border-black flex justify-between items-center group-hover:bg-[#fe0002] transition-colors">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                      {pkg.name}
                    </h3>
                    <Flame
                      className="text-[#fe0002] group-hover:text-white shrink-0"
                      size={28}
                    />
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
                READY TO <br /> BREAK NECKS?
              </h2>
              <p className="font-bold text-base md:text-lg uppercase tracking-widest text-black bg-white px-5 py-3 inline-block border-4 border-black">
                Send us a message today.
              </p>
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
                      MESSAGE US ON FACEBOOK
                    </h4>
                    <p className="font-bold text-sm md:text-base text-gray-400 group-hover:text-[#fe0002] uppercase mt-1">
                      Fastest Response Time
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
                  HEADQUARTERS
                </h4>
                <div className="flex items-start gap-4 text-black font-bold uppercase text-base md:text-lg">
                  <MapPin size={26} className="text-[#fe0002] shrink-0 mt-0.5" />
                  <p>
                    Maharlika Highway,
                    <br />
                    Tacloban City, Leyte, PH
                  </p>
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
                &copy; {new Date().getFullYear()} TOMAS AUTOWORKS.
              </p>
            </div>
            <p className="bg-black text-white px-4 py-2.5 border-2 border-black text-center text-xs md:text-sm">
              NO FAKE PARTS. STRICTLY PREMIUM.
            </p>
          </div>
        </div>
      </footer>

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
                <div className="relative h-60 md:h-full bg-gray-100 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.isSale && (
                    <div className="absolute top-3 left-3 bg-[#fe0002] text-white px-3 py-1 border-2 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      SALE!
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
                        {formatPHP(selectedProduct.price)}
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
                    INQUIRE THIS PART
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
