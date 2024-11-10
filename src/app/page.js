"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import localFont from 'next/font/local';
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";

import { HeartDiseaseInfo } from "./components/HeartDiseaseInfo";
import { HeartDiseaseChart } from "./components/HeartDiseaseChart";
import { MultiStepLoader } from "./components/MultiStepLoader";
import ImageSlider from "./components/ImageSlider";

const nothingOS = localFont({
    src: 'font/NothingOS.ttf',
    variable: '--font-nothing-os',
    display: 'swap',
});

const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
        />
    </svg>
);

const AppNavbar = () => {
    const menuItems = [
        { name: "Predictive Analysis", path: "/predictive" },
        { name: "EDA Analysis", path: "/eda" },
    ];

    return (
        <Navbar
            disableAnimation
            isBordered
            className={`bg-neutral-950 border-b border-neutral-800 fixed top-0 w-full z-50 ${nothingOS.className}`}
            classNames={{
                wrapper: "px-4 sm:px-6 lg:px-8 max-w-full",
                base: "bg-neutral-950",
                brand: "text-white",
                toggle: "text-white",
                item: "text-white",
            }}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-white">Heart Disease Predictor</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-white">Heart Disease Predictor</p>
                </NavbarBrand>
                {menuItems.map((item) => (
                    <NavbarItem key={item.name} className="hidden lg:flex">
                        <Link
                            href={item.path}
                            className="text-white/90 hover:text-white"
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarMenu className="bg-neutral-950 mt-16">
                {menuItems.map((item) => (
                    <NavbarMenuItem key={item.name}>
                        <Link
                            className="w-full text-white/90 hover:text-white"
                            href={item.path}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    const mainContentRef = useRef(null);

    const loadingStates = [
        { text: "Setting up.." },
        { text: "It may take a few moments..." },
        { text: "Yep..nearly done..." },
        { text: "Let's start..." },
    ];

    useEffect(() => {
        // Initialize the component
        if (typeof window !== 'undefined' && !initialized) {
            const hasVisited = localStorage.getItem('hasVisitedHeartDisease');

            if (!hasVisited) {
                // First visit
                const timer = setTimeout(() => {
                    setLoading(false);
                    localStorage.setItem('hasVisitedHeartDisease', 'true');
                }, 4000);

                return () => clearTimeout(timer);
            } else {
                // Returning visit
                setLoading(false);
            }

            setInitialized(true);
        }
    }, [initialized]);

    useEffect(() => {
        if (typeof window !== "undefined" && !loading) {
            gsap.registerPlugin(ScrollTrigger);

            gsap.set(".heading", {
                yPercent: -150,
                opacity: 1,
            });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(".nav-animation", { duration: 1, y: -50, opacity: 0 });
            tl.from(mainContentRef.current, { duration: 1, opacity: 0 }, "-=0.5");
        }
    }, [loading]);

    const shouldShowLoader = loading && (!initialized || !localStorage.getItem('hasVisitedHeartDisease'));

    return (
        <div className={`min-h-screen bg-neutral-950 ${nothingOS.className}`}>
            <div
                className="fixed inset-0 w-full h-full z-0"
                style={{
                    background: 'radial-gradient(circle at 50% -20%, rgba(120,119,198,0.3), transparent 70%)',
                    minHeight: '100vh',
                    overflow: 'auto'
                }}
            >
                {shouldShowLoader ? (
                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
                        <MultiStepLoader
                            loadingStates={loadingStates}
                            loading={true}
                            duration={1000}
                        />
                    </div>
                ) : (
                    <div className="relative min-h-screen">
                        <AppNavbar />

                        <main className="pt-16 relative z-10">
                            <section className="container mx-auto px-4 py-8 mt-8">
                                <div className="max-w-6xl mx-auto">
                                    <ImageSlider />
                                </div>
                            </section>

                            <section className="container mx-auto px-4 py-16">
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-white">
                                        Understanding Heart Disease
                                    </h2>
                                    <p className="text-center text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-gray-300">
                                        Heart disease remains one of the leading causes of mortality
                                        worldwide. Understanding its risk factors, symptoms, and
                                        preventive measures is crucial for maintaining cardiovascular
                                        health.
                                    </p>
                                </div>
                            </section>

                            <section className="py-16">
                                <div className="container mx-auto px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto" ref={mainContentRef}>
                                        <div className="space-y-8">
                                            <HeartDiseaseInfo />
                                        </div>
                                        <div className="w-full min-h-[400px]">
                                            <HeartDiseaseChart />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;