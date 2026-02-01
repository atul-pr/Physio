import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';

export default function HeroSlider({ slides = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotate every 3 seconds
    useEffect(() => {
        if (!isPaused && slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 3000);

            return () => clearInterval(timer);
        }
    }, [currentIndex, isPaused, slides.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // If no slides, show default gradient
    if (slides.length === 0) {
        return (
            <div className="hero-slider-empty">
                <div className="hero-bg"></div>
            </div>
        );
    }

    return (
        <div
            className="hero-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="hero-slider-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundImage: `url(${slides[currentIndex]?.imageUrl?.startsWith('http')
                            ? slides[currentIndex].imageUrl
                            : `http://localhost:5000${slides[currentIndex]?.imageUrl}`})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Overlay for better text visibility */}
                    <div className="hero-slider-overlay"></div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Only show if more than 1 slide */}
            {slides.length > 1 && (
                <>
                    <button
                        className="hero-slider-arrow hero-slider-arrow-left"
                        onClick={goToPrevious}
                        aria-label="Previous slide"
                    >
                        ‹
                    </button>
                    <button
                        className="hero-slider-arrow hero-slider-arrow-right"
                        onClick={goToNext}
                        aria-label="Next slide"
                    >
                        ›
                    </button>

                    {/* Dots Navigation */}
                    <div className="hero-slider-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`hero-slider-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
