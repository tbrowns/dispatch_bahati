import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: number]: React.ElementType } = {
  0: User,
  1: Users,
  2: Sparkles,
};

const WhoWeServe = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
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

      // Cards 3D rise animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 100, rotateX: 30, opacity: 0 },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.2 + index * 0.15,
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
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
            {content.whoWeServe.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {content.whoWeServe.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {content.whoWeServe.description}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.whoWeServe.clients.map((client, index) => {
            const Icon = iconMap[index] || User;
            return (
              <div
                key={client.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#141414] rounded-2xl p-8 border border-[#2a2a2a] hover:border-[#edb88b] hover:shadow-[0_0_30px_rgba(237,184,139,0.2)] transition-all duration-500 hover:-translate-y-3"
                style={{
                  opacity: 0,
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-[#edb88b] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:border-2 group-hover:border-[#edb88b] transition-all duration-500">
                  <Icon className="w-8 h-8 text-black group-hover:text-[#edb88b] transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-[#edb88b] transition-colors">
                  {client.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {client.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {client.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-[#edb88b] rounded-full flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
