import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MapPin, UserCheck, BadgeCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: React.ElementType } = {
  'Experienced Dispatchers': Users,
  'Nationwide Load Coverage': MapPin,
  'Dedicated Dispatcher': UserCheck,
  'Transparent Pricing': BadgeCheck,
};

const TrustBar = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { rotateY: -90, opacity: 0 },
            {
              rotateY: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%', // Trigger later on desktop
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
    <section ref={sectionRef} className="relative z-20 -mt-16 pb-16">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.trustBar.items.map((item, index) => {
            const Icon = iconMap[item.title] || BadgeCheck;
            return (
              <div
                key={item.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#141414] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#edb88b]/30 hover:shadow-[0_0_30px_rgba(237,184,139,0.1)] transition-all duration-300 hover:-translate-y-2"
                style={{
                  opacity: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="w-12 h-12 bg-[#edb88b]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#edb88b] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#edb88b] group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
