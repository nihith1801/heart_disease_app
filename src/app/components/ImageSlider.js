import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Lottie from "lottie-react";
import { Image } from "@nextui-org/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSlider = () => {
    const [lottieData, setLottieData] = useState({});

    const slides = [
        {
            id: 1,
            type: "lottie",
            media: "/images/heart3.json",
            caption: "",
            description: "",
        },
        {
            id: 2,
            type: "lottie",
            media: "/images/heart1.json",
            caption: "",
            description: "",
        },
        {
            id: 3,
            type: "lottie",
            media: "/images/heart2.json",
            caption: "",
            description: "",
        }
    ];

    useEffect(() => {
        const fetchLottieData = async () => {
            const lottieSlides = slides.filter(slide => slide.type === "lottie");
            const data = {};

            for (const slide of lottieSlides) {
                try {
                    const response = await fetch(slide.media);
                    const json = await response.json();
                    data[slide.id] = json;
                } catch (error) {
                    console.error(`Error loading Lottie animation for slide ${slide.id}:`, error);
                }
            }

            setLottieData(data);
        };

        fetchLottieData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ]
    };

    const renderMedia = (slide) => {
        if (slide.type === "image") {
            return (
                <Image
                    isBlurred
                    src={slide.media}
                    alt={slide.caption}
                    className="object-cover w-full h-full"
                    classNames={{
                        wrapper: "w-full h-full",
                    }}
                />
            );
        } else if (slide.type === "lottie" && lottieData[slide.id]) {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-3/4">
                        <Lottie
                            animationData={lottieData[slide.id]}
                            loop={true}
                            autoplay={true}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-neutral-600">Loading...</div>
                </div>
            );
        }
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                            {renderMedia(slide)}
                            {/* Gradient overlay only for images */}
                            {slide.type === "image" && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <h3 className={`text-2xl md:text-4xl font-bold mb-2 ${
                                    slide.type === "image" ? "text-white" : "text-foreground"
                                }`}>
                                    {slide.caption}
                                </h3>
                                <p className={`text-lg md:text-xl ${
                                    slide.type === "image" ? "text-white/90" : "text-foreground/80"
                                }`}>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MediaSlider;