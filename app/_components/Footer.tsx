import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Partners", href: "#" }
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Help Center", href: "#" }
    ],
    legal: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
      { label: "Accessibility", href: "#" }
    ]
  };
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Information */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="text-2xl font-bold text-primary-600">Edu<span className="text-foreground">Pulse</span></span>
            </a>
            <p className="text-foreground/70 mb-6 max-w-md">
              EduPulse is transforming education through personalized, AI-powered learning experiences that help students achieve their full potential.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="text-primary-600 mr-3" />
                <a href="mailto:info@edupulse.com" className="text-foreground/70 hover:text-primary-600 transition-colors">
                  info@edupulse.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-primary-600 mr-3" />
                <a href="tel:+11234567890" className="text-foreground/70 hover:text-primary-600 transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="text-primary-600 mr-3 mt-1" />
                <span className="text-foreground/70">
                  123 Education Drive, Suite 456<br />
                  San Francisco, CA 94105
                </span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-foreground/70 hover:text-primary-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-foreground/70 hover:text-primary-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-foreground/70 hover:text-primary-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-10 mt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {currentYear} EduPulse, Inc. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                aria-label={link.label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;