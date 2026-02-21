import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Truck,
  PhoneCall,
  FileText,
  ShieldCheck,
  BarChart3,
  Clock,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: number]: React.ElementType } = {
  0: Truck,
  1: PhoneCall,
  2: FileText,
  3: ShieldCheck,
  4: BarChart3,
  5: Clock,
};

const Services = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
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

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 80, rotateX: 15, opacity: 0 },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.1 + index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%', // Trigger later
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
    <section id="services" ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
            {content.services.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {content.services.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {content.services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.items.map((service, index) => {
            const Icon = iconMap[index] || Truck;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#141414] rounded-2xl p-8 border border-[#2a2a2a] hover:border-[#edb88b]/30 hover:shadow-[0_0_30px_rgba(237,184,139,0.1)] transition-all duration-300 hover:-translate-y-2"
                style={{
                  opacity: 0,
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#edb88b]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#edb88b] group-hover:rotate-[360deg] transition-all duration-500">
                  <Icon className="w-7 h-7 text-[#edb88b] group-hover:text-black transition-colors" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-white mb-4">
                  {service.title}
                </h3>

                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-gray-400 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-[#edb88b] rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
