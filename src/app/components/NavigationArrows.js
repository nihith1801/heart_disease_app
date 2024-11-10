import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NavigationArrows = ({ prevPage, nextPage, prevLabel, nextLabel }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 z-20">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between items-center">
                    {prevPage && (
                        <Link
                            href={prevPage}
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            <span className="font-medium">{prevLabel}</span>
                        </Link>
                    )}

                    {nextPage && (
                        <Link
                            href={nextPage}
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <span className="font-medium">{nextLabel}</span>
                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationArrows;