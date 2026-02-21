import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  { feature: 'Forced Dispatch', us: false, others: true },
  { feature: 'Hidden Fees', us: false, others: true },
  { feature: '24/7 Support', us: true, others: false },
  { feature: 'Rate Negotiation', us: true, others: false },
  { feature: 'Paperwork Handling', us: true, others: false },
];

const WhyChooseUs = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%', // Trigger later
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Features stagger animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(
            feature,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.5 + index * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%', // Trigger later
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
    <section id="about" ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden border border-[#2a2a2a]"
            style={{ opacity: 0 }}
          >
            <img
              src="/images/why-choose-us.jpg"
              alt="Professional trucking fleet"
              className="w-full h-[400px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
              <p className="font-display font-bold text-3xl text-[#edb88b]">500+</p>
              <p className="text-gray-400 text-sm">Trucks Dispatched</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
              {content.whyChooseUs.subtitle}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {content.whyChooseUs.title.split('—').map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <span className="text-[#edb88b]">—</span>}
                </span>
              ))}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {content.whyChooseUs.description}
            </p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {content.whyChooseUs.features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => { featuresRef.current[index] = el; }}
                  className="flex gap-4"
                  style={{ opacity: 0 }}
                >
                  <div className="w-8 h-8 bg-[#edb88b]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-display font-bold text-[#edb88b] text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-[#141414] rounded-xl p-6 border border-[#2a2a2a]">
              <h4 className="font-display font-bold text-lg text-white mb-4">
                Bahati vs Others
              </h4>
              <div className="space-y-3">
                {comparisonData.map((item) => (
                  <div
                    key={item.feature}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-300">{item.feature}</span>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#edb88b] font-medium">Bahati</span>
                        {item.us ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Others</span>
                        {item.others ? (
                          <Check className="w-4 h-4 text-red-500" />
                        ) : (
                          <X className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
