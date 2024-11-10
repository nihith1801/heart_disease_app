import React, { useState, useEffect } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LinkPreview = ({
                                children,
                                url,
                                className,
                                width = 200,
                                height = 125,
                                quality = 50,
                                layout = "fixed",
                                isStatic = false,
                                imageSrc = "",
                                isInternalRoute = false,
                                previewImage = "/api/placeholder/400/320"
                            }) => {
    const [src, setSrc] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (isInternalRoute) {
            // Use placeholder or static preview for internal routes
            setSrc(previewImage);
        } else if (!isStatic) {
            const params = encode({
                url,
                screenshot: true,
                meta: false,
                embed: "screenshot.url",
                colorScheme: "dark",
                "viewport.isMobile": true,
                "viewport.deviceScaleFactor": 1,
                "viewport.width": width * 3,
                "viewport.height": height * 3,
            });
            setSrc(`https://api.microlink.io/?${params}`);
        } else {
            setSrc(imageSrc);
        }
    }, [url, isStatic, imageSrc, width, height, isInternalRoute, previewImage]);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);
    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (event) => {
        const targetRect = event.target.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
        x.set(offsetFromCenter);
    };

    return (
        <>
            {isMounted && src && (
                <div className="hidden">
                    <Image
                        src={src}
                        width={width}
                        height={height}
                        quality={quality}
                        alt="hidden preview"
                        priority
                    />
                </div>
            )}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={setOpen}
            >
                <HoverCardPrimitive.Trigger asChild>
                    <Link
                        href={url}
                        onMouseMove={handleMouseMove}
                        className={cn(
                            "inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors",
                            className
                        )}
                    >
                        {children}
                    </Link>
                </HoverCardPrimitive.Trigger>

                <AnimatePresence>
                    {isOpen && (
                        <HoverCardPrimitive.Content
                            className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
                            side="top"
                            align="center"
                            sideOffset={10}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                                style={{ x: translateX }}
                            >
                                <div className="relative">
                                    <Image
                                        src={src}
                                        width={width}
                                        height={height}
                                        quality={quality}
                                        className="rounded-lg object-cover"
                                        alt="preview"
                                        priority
                                    />
                                    {isInternalRoute && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium">
                                            {url.replace("/", "").toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </HoverCardPrimitive.Content>
                    )}
                </AnimatePresence>
            </HoverCardPrimitive.Root>
        </>
    );
};