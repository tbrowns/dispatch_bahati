import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

      // FAQ items stagger animation
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            item,
            { x: isLeft ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-[#edb88b] font-medium text-sm tracking-widest uppercase mb-4">
            {content.faq.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {content.faq.title}
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {content.faq.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="bg-[#141414] rounded-xl overflow-hidden border border-[#2a2a2a]"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1c1c1c] transition-colors"
              >
                <span className="font-display font-bold text-lg text-white pr-4">
                  {item.question}
                </span>
                <div
                  className={`w-8 h-8 bg-[#edb88b] rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-black" />
                  ) : (
                    <Plus className="w-4 h-4 text-black" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
