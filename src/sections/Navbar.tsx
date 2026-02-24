import { useState, useEffect } from "react";
import { Menu, X, Phone, Edit } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navigate = useNavigate();
  const viewAdminPanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Top Left Corner */}
          <div className="z-20 flex items-center">
            <img
              src="/images/c_logo.png"
              alt="Bahati Dispatching Services"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative font-medium text-sm transition-colors duration-300 group ${
                  isScrolled
                    ? "text-gray-300 hover:text-[#edb88b]"
                    : "text-white/90 hover:text-[#edb88b]"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#edb88b] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Phone & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-300 hover:text-[#edb88b]"
                  : "text-white/90 hover:text-[#edb88b]"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{content.contact.phone}</span>
            </a>
            <button
              onClick={viewAdminPanel}
              className="btn-primary text-sm py-3 px-6"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#141414] shadow-xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-custom py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-gray-300 hover:text-[#edb88b] font-medium py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-[#edb88b] font-medium py-2"
            >
              <Phone className="w-4 h-4" />
              <span>{content.contact.phone}</span>
            </a>
            <button onClick={viewAdminPanel} className="btn-primary mt-2">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
