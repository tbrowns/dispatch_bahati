import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Trigger later
            toggleActions: 'play none none none',
          },
        }
      );

      // Image parallax slide
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#141414]" />

      {/* Content */}
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
              {content.cta.subtitle}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {content.cta.title.split('?')[0]}?
              <span className="text-[#edb88b]">{content.cta.title.split('?')[1] || ''}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              {content.cta.description}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-[#edb88b]/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#edb88b]" />
                </div>
                <span className="text-sm">{content.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-[#edb88b]/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#edb88b]" />
                </div>
                <span className="text-sm">{content.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-[#edb88b]/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#edb88b]" />
                </div>
                <span className="text-sm">{content.contact.hours}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary group animate-pulse-glow"
              >
                {content.cta.primaryCta}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="btn-secondary"
              >
                <Phone className="mr-2 w-5 h-5" />
                {content.cta.secondaryCta}
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="relative hidden lg:block"
            style={{ opacity: 0 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#2a2a2a]">
              <img
                src="/images/cta-truck.jpg"
                alt="Truck on highway at sunset"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-[#141414] rounded-xl p-6 border border-[#2a2a2a]">
              <p className="font-display font-bold text-4xl text-[#edb88b]">98%</p>
              <p className="text-gray-400 text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#edb88b]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#edb88b]/5 rounded-full blur-2xl" />
    </section>
  );
};

export default CTA;
