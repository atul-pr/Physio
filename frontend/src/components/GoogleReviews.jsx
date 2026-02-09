import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Real Google reviews from Dr. Jeram Bhandva
const reviews = [
    {
        id: 1,
        name: "Sarthak Patil",
        rating: 5,
        date: "2 weeks ago",
        text: "Dr. Jeram was a game-changer for my left shoulder discomfort. Even though it was for a limited period time, from the first session, he pinpointed the issue and designed a personalized regimen of drills and exercises that provided immense relief.",
        avatar: "SP",
    },
    {
        id: 2,
        name: "Rajan Sharma",
        rating: 5,
        date: "2 months ago",
        text: "Highly Recommended to anyone for knee pain. I was suffering from knee pain and was very concerned about my condition. Visiting to Dr. Jeram was the best decision, from the very first consultation, he was incredibly patient, understanding the situation of clients, and reassuring. He explained the issue clearly, what to do and not and created the proper treatment plan. Thanks to his expert guidance and effective treatment, I have seen a remarkable recovery.",
        avatar: "RS",
    },
    {
        id: 3,
        name: "Sunny Upadhyay",
        rating: 5,
        date: "4 months ago",
        text: "Highly Recommended. Excellent Treatment for Facial Palsy. I was suffering from facial palsy and was extremely worried about my condition. Dr. Jeram's treatment approach and care helped me achieve significant improvement.",
        avatar: "SU",
    },
    {
        id: 4,
        name: "Simran Khan",
        rating: 5,
        date: "4 months ago",
        text: "I underwent a knee joint replacement surgery, after which my doctor advised me to take physiotherapy. It's been over a month now that I've been taking physiotherapy sessions from Mr. Jeram Bhandava and I must say he is excellent at his work. Professional, compassionate, and knowledgeable care helped me achieve my recovery goals.",
        avatar: "SK",
    },
    {
        id: 5,
        name: "Masterfly",
        rating: 5,
        date: "4 months ago",
        text: "I consulted Dr. Jeram for persistent neck and back pain, and I am very satisfied with the treatment. The doctor took time to carefully examine and understand the issue in detail, which gave me a lot of confidence. His treatment approach helped alleviate my pain and improved my quality of life.",
        avatar: "MF",
    },
    {
        id: 6,
        name: "Dinesh Dash",
        rating: 5,
        date: "1 month ago",
        text: "I recently had the opportunity to avail physiotherapy services from Dr. Jairam Bhandava for my wife, Padmavati Nayak. We were extremely satisfied with the excellent service and treatment provided by him. She felt comfortable and cared for during her treatment.",
        avatar: "DD",
    },
    {
        id: 7,
        name: "Amal Kumar Chatterjee",
        rating: 5,
        date: "5 months ago",
        text: "Dr Jeram Bhandava is a great and experienced Physiotherapist. He has all the required equipments and behavior is very friendly and gentle. I got very good relief from his treatment and guidance. I will recommend him 100%.",
        avatar: "AC",
    },
    {
        id: 8,
        name: "Mayuri Jadhav",
        rating: 5,
        date: "4 months ago",
        text: "I visited Dr. Jeram for muscle spasm. He is an experienced Physiotherapist. He has all the required equipments and clinic is spacious for physio related activities. Very professional and caring approach to treatment.",
        avatar: "MJ",
    },
    {
        id: 9,
        name: "Sk Nurul",
        rating: 5,
        date: "6 months ago",
        text: "I had been struggling with Back & Shoulder pain for weeks, and after visiting Dr. Jeram, I finally found relief. Their approach is not only professional but also incredibly caring and patient-friendly. He explains every step of the therapy in a way that's easy to understand.",
        avatar: "SN",
    }
];

const spring = { type: "spring", stiffness: 100, damping: 20 };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

function StarRating({ rating }) {
    return (
        <div className="review-stars">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
            ))}
        </div>
    );
}

export default function GoogleReviews() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visibleReviews = isMobile ? 1 : 3;
    const maxIndex = reviews.length - visibleReviews;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    // Auto-play functionality - slides every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, [activeIndex, maxIndex]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .reviews-section {
          padding: 5rem 1.5rem;
          background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        
        .reviews-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent);
        }
        
        .reviews-container {
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .reviews-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .reviews-title {
          font-family: 'Crimson Pro', serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #0c4a6e;
          margin: 0 0 0.75rem 0;
        }
        
        .reviews-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.125rem;
          color: #64748b;
          margin: 0;
        }
        
        .google-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          border: 1px solid rgba(14, 165, 233, 0.1);
        }
        
        .google-icon {
          font-size: 1.5rem;
        }
        
        .google-rating {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .google-rating-stars {
          color: #fbbf24;
          font-size: 1.1rem;
          letter-spacing: 2px;
        }
        
        .google-rating-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #64748b;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
          min-height: 350px;
        }
        
        .review-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.1);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
          border-color: rgba(14, 165, 233, 0.3);
        }
        
        .review-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .review-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .review-author {
          flex: 1;
        }
        
        .review-name {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: #0c4a6e;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }
        
        .review-date {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 0;
        }
        
        .review-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 1rem;
        }
        
        .star {
          color: #e2e8f0;
          font-size: 1.1rem;
        }
        
        .star.filled {
          color: #fbbf24;
        }
        
        .review-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        
        .review-google-icon {
          margin-top: 1rem;
          text-align: right;
        }
        
        .review-google-icon img {
          height: 20px;
          opacity: 0.6;
        }
        
        .reviews-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        
        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #0ea5e9;
          background: white;
          color: #0ea5e9;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-btn:hover {
          background: #0ea5e9;
          color: white;
        }
        
        .nav-dots {
          display: flex;
          gap: 0.5rem;
        }
        
        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e2e8f0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-dot.active {
          background: #0ea5e9;
          width: 24px;
          border-radius: 5px;
        }
        
        .reviews-cta {
          text-align: center;
          margin-top: 2.5rem;
        }
        
        .review-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }
        
        .review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
        }
        
        @media (max-width: 1024px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .reviews-section {
            padding: 3rem 1rem;
          }
          
          .reviews-grid {
            grid-template-columns: 1fr;
            min-height: 400px;
          }
          
          .review-card {
            padding: 1.5rem;
          }
        }
      `}</style>

            <section className="reviews-section">
                <div className="reviews-container">
                    <motion.div
                        className="reviews-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {},
                        }}
                    >
                        <motion.div className="google-badge" variants={fadeInUp} transition={spring}>
                            <span className="google-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </span>
                            <div className="google-rating">
                                <span className="google-rating-stars">★★★★★</span>
                                <span className="google-rating-text">5.0 Rating on Google</span>
                            </div>
                        </motion.div>

                        <motion.h2 className="reviews-title" variants={fadeInUp} transition={spring}>
                            What Our Patients Say
                        </motion.h2>
                        <motion.p className="reviews-subtitle" variants={fadeInUp} transition={spring}>
                            Real experiences from our valued patients
                        </motion.p>
                    </motion.div>

                    <div className="reviews-grid">
                        <AnimatePresence mode="wait">
                            {reviews.slice(activeIndex, activeIndex + visibleReviews).map((review, i) => (
                                <motion.a
                                    key={`${review.id}-${activeIndex}`}
                                    href={review.reviewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="review-card"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="review-header">
                                        <div className="review-avatar">{review.avatar}</div>
                                        <div className="review-author">
                                            <h4 className="review-name">{review.name}</h4>
                                            <p className="review-date">{review.date}</p>
                                        </div>
                                    </div>
                                    <StarRating rating={review.rating} />
                                    <p className="review-text">{review.text}</p>
                                    <div className="review-google-icon">
                                        <svg width="60" height="20" viewBox="0 0 272 92" opacity="0.5">
                                            <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
                                            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                                            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
                                            <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.10-11.65l-22.49.01z" />
                                        </svg>
                                    </div>
                                </motion.a>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="reviews-navigation">
                        <button className="nav-btn" onClick={prevSlide} aria-label="Previous reviews">←</button>
                        <div className="nav-dots">
                            {[...Array(maxIndex + 1)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`nav-dot ${activeIndex === i ? "active" : ""}`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>
                        <button className="nav-btn" onClick={nextSlide} aria-label="Next reviews">→</button>
                    </div>

                    <motion.div
                        className="reviews-cta"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={spring}
                    >
                        <a
                            href="https://www.google.com/search?si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUdeCIXZV1S5KPkdzT4gCqvGFear0BTdPOUKAzz1UWRo4CkqOG2j6UM3mebMQ8LiCeGqLxOE5AUhEl_Ew6xhrEIPJu4D_x1J7n27ThSNx_Y3Mn6ciw%3D%3D&q=Dr+Jeram+Bhandva+Reviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="review-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            See All Reviews on Google
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
