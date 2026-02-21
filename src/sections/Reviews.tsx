import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % content.reviews.items.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + content.reviews.items.length) % content.reviews.items.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentReview = content.reviews.items[currentIndex];

  return (
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
            {content.reviews.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {content.reviews.title}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#edb88b] rounded-full flex items-center justify-center animate-float z-10">
            <Quote className="w-8 h-8 text-black" />
          </div>

          <div className="bg-[#141414] rounded-2xl p-8 md:p-12 border border-[#2a2a2a] pt-16">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#edb88b] text-[#edb88b]"
                  style={{ animation: `scale-in 0.3s ease-out ${i * 0.05}s both` }}
                />
              ))}
            </div>

            <p
              className="text-center text-gray-300 text-lg md:text-xl leading-relaxed mb-8 transition-opacity duration-500"
              style={{ opacity: isAnimating ? 0 : 1 }}
            >
              &ldquo;{currentReview.text}&rdquo;
            </p>

            <div
              className="text-center transition-opacity duration-500"
              style={{ opacity: isAnimating ? 0 : 1 }}
            >
              <p className="font-display font-bold text-lg text-white">
                {currentReview.author}
              </p>
              <p className="text-[#edb88b] text-sm">{currentReview.role}</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center border border-[#2a2a2a] hover:border-[#edb88b] hover:bg-[#edb88b] transition-all duration-300 group"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </button>

            <div className="flex gap-2">
              {content.reviews.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#edb88b] w-8'
                      : 'bg-[#2a2a2a] hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center border border-[#2a2a2a] hover:border-[#edb88b] hover:bg-[#edb88b] transition-all duration-300 group"
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
