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
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
        }
        
        .review-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.05), transparent);
          transition: left 0.5s ease;
        }
        
        .review-card:hover::before {
          left: 100%;
        }
        
        .review-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15), 0 0 0 2px rgba(14, 165, 233, 0.2);
          border-color: rgba(14, 165, 233, 0.4);
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
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.25rem;
        }
        
        .review-google-icon svg {
          height: 16px;
          width: auto;
          opacity: 0.7;
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
                                        <svg width="16" height="16" viewBox="0 0 48 48">
                                            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                                            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                                            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                                            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                                        </svg>
                                        <span style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500' }}>Google</span>
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
