import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const stepImages = ['/images/step-1.jpg', '/images/step-2.jpg', '/images/step-3.jpg'];

const HowItWorks = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%', // Trigger later
            toggleActions: 'play none none none',
          },
        }
      );

      // Progress line animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { x: -100, rotateY: 25, opacity: 0 },
            {
              x: 0,
              rotateY: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.5 + index * 0.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%', // Trigger later
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
            Simple Process
          </p>
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-5xl font-bold text-white"
            style={{ opacity: 0 }}
          >
            {content.howItWorks.title}
          </h2>
        </div>

        {/* Progress Line (Desktop) */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#2a2a2a] -translate-y-1/2" />
          <div
            ref={progressRef}
            className="absolute top-1/2 left-0 h-1 bg-[#edb88b] -translate-y-1/2 origin-left"
            style={{ width: '66%', transform: 'scaleX(0)' }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {content.howItWorks.steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
              style={{ opacity: 0, perspective: '1000px' }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-2 w-16 h-16 bg-[#edb88b] rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(237,184,139,0.3)] group-hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-2xl text-black">
                  {step.number}
                </span>
              </div>

              {/* Card */}
              <div className="bg-[#141414] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#edb88b]/30 transition-all duration-300 hover:-translate-y-2 pt-12">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={stepImages[index]}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            {content.hero.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
