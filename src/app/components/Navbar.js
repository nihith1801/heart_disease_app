"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Link,
    Button
} from "@nextui-org/react";

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

export default function AppNavbar() {
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "EDA Analysis", path: "/eda" },
        { name: "Predictive Analysis", path: "/predictive" },
        { name: "About", path: "/about" },
    ];

    return (
        <Navbar
            disableAnimation
            isBordered
            className="bg-neutral-950 border-b border-neutral-800 fixed top-0 w-full"
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
                {menuItems.slice(0, 3).map((item, index) => (
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

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/about" className="text-white/90 hover:text-white">
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-neutral-950 mt-16">
                {menuItems.map((item, index) => (
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
}