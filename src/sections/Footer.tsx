import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  const { content } = useContent();
  const footerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Border draw animation
      gsap.fromTo(
        borderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Columns stagger animation
      columnsRef.current.forEach((col, index) => {
        if (col) {
          gsap.fromTo(
            col,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" ref={footerRef} className="bg-[#0a0a0a] pt-20 pb-8">
      <div className="container-custom">
        {/* Top Border */}
        <div
          ref={borderRef}
          className="h-px bg-gradient-to-r from-transparent via-[#edb88b] to-transparent mb-16 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div
            ref={(el) => { columnsRef.current[0] = el; }}
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#edb88b] rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-black">B</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                BAHATI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {content.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-[#141414] rounded-lg flex items-center justify-center border border-[#2a2a2a] hover:bg-[#edb88b] hover:border-[#edb88b] transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            ref={(el) => { columnsRef.current[1] = el; }}
            style={{ opacity: 0 }}
          >
            <h4 className="font-display font-bold text-lg text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[#edb88b] hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            ref={(el) => { columnsRef.current[2] = el; }}
            style={{ opacity: 0 }}
          >
            <h4 className="font-display font-bold text-lg text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {content.services.items.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <span className="text-gray-400 text-sm">{service.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            ref={(el) => { columnsRef.current[3] = el; }}
            style={{ opacity: 0 }}
          >
            <h4 className="font-display font-bold text-lg text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-[#edb88b] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-[#edb88b]" />
                  {content.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-[#edb88b] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-[#edb88b]" />
                  {content.contact.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[#edb88b] flex-shrink-0 mt-0.5" />
                  <span>{content.contact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} BAHATI DISPATCHING SERVICES. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-[#edb88b] text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#edb88b] text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
