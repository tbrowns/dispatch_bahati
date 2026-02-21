import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Ken Burns effect
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'expo.out' }
      );

      // Tagline animation
      gsap.fromTo(
        taglineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'expo.out' }
      );

      // Title clip reveal animation
      gsap.fromTo(
        titleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, delay: 0.8, ease: 'power4.out' }
      );

      // Description fade up
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 1.2, ease: 'expo.out' }
      );

      // CTA button bounce in
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 1.4, ease: 'elastic.out(1, 0.5)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero-truck.jpg"
          alt="Trucking logistics"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-[#edb88b] font-medium text-sm md:text-base tracking-widest uppercase mb-4"
              style={{ opacity: 0 }}
            >
              {content.hero.tagline}
            </p>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ opacity: 0 }}
            >
              {content.hero.title.split('.').map((part, i, arr) => (
                <span key={i}>
                  {part.trim()}
                  {i < arr.length - 1 && (
                    <>
                      {i === 0 ? <span className="text-[#edb88b]">.</span> : '.'}
                      <br />
                    </>
                  )}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              style={{ opacity: 0 }}
            >
              {content.hero.description}
            </p>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              onClick={scrollToContact}
              className="btn-primary group animate-pulse-glow"
              style={{ opacity: 0 }}
            >
              {content.hero.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right side - decorative elements */}
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              {/* Floating stats cards */}
              <div className="absolute -top-10 -left-20 bg-[#141414]/80 backdrop-blur-md rounded-xl p-4 border border-[#2a2a2a] animate-float">
                <p className="text-[#edb88b] font-bold text-2xl">24/7</p>
                <p className="text-gray-400 text-sm">Support</p>
              </div>
              <div
                className="absolute -bottom-10 -right-10 bg-[#141414]/80 backdrop-blur-md rounded-xl p-4 border border-[#2a2a2a] animate-float"
                style={{ animationDelay: '1s' }}
              >
                <p className="text-[#edb88b] font-bold text-2xl">98%</p>
                <p className="text-gray-400 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
};

export default Hero;
