import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CheckIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${className}`}
        >
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
};

const CheckFilled = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${className}`}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const ProgressBar = ({ duration }) => {
    return (
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-lime-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                    duration: duration / 1000,
                    ease: "linear",
                    repeat: Infinity
                }}
            />
        </div>
    );
};

const LoaderCore = ({ loadingStates, value = 0, duration }) => {
    return (
        <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0);

                return (
                    <motion.div
                        key={index}
                        className="text-left flex gap-2 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: opacity, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-6">
                            {index > value && <CheckIcon className="text-white dark:text-white" />}
                            {index <= value && (
                                <CheckFilled
                                    className={`text-white ${
                                        value === index ? "text-lime-500 opacity-100" : ""
                                    }`}
                                />
                            )}
                        </div>
                        <div className="flex-1">
              <span
                  className={`text-white ${value === index ? "text-lime-500 opacity-100" : ""}`}
              >
                {loadingState.text}
              </span>
                            {value === index && (
                                <div className="mt-2">
                                    <ProgressBar duration={duration} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
                                    loadingStates,
                                    loading,
                                    duration = 2000,
                                    loop = true,
                                }) => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentState((prevState) =>
                loop
                    ? prevState === loadingStates.length - 1
                        ? 0
                        : prevState + 1
                    : Math.min(prevState + 1, loadingStates.length - 1)
            );
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentState, loading, loop, loadingStates.length, duration]);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-neutral-950/80"
                >
                    <div className="h-96 relative">
                        <LoaderCore
                            value={currentState}
                            loadingStates={loadingStates}
                            duration={duration}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MultiStepLoader;