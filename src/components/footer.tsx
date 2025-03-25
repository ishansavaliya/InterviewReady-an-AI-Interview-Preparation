/**
 * Footer Component
 * Site-wide footer with navigation links, about information,
 * services, and social media connections
 */

import React from "react";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import Lucide icons
import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { MainRoutes } from "@/lib/helpers";

/**
 * Props for the SocialLink component
 * @property href - Social media profile URL
 * @property icon - Social media icon component
 * @property hoverColor - Tailwind color class for hover state
 */
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

/**
 * SocialLink Component
 * Renders a social media link with icon and hover effect
 */
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:${hoverColor}`}
    >
      {icon}
    </a>
  );
};

/**
 * Props for the FooterLink component
 * @property to - Internal route path
 * @property children - Link text content
 */
interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

/**
 * FooterLink Component
 * Renders a navigation link with hover effects
 */
const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="hover:underline text-gray-300 hover:text-gray-100"
      >
        {children}
      </Link>
    </li>
  );
};

/**
 * Footer Component
 * Main footer component with four sections:
 * - Quick navigation links
 * - About information
 * - Services list
 * - Contact details and social media
 */
export const Footer = () => {
  return (
    <div className="w-full bg-black text-gray-300 hover:text-gray-100 py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p>
              We are committed to helping you unlock your full potential with
              AI-powered tools. Our platform offers a wide range of resources to
              improve your interview skills and chances of success.
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul>
              <FooterLink to="/services">Interview Preparation</FooterLink>
              <FooterLink to="/services">Career Coaching</FooterLink>
              <FooterLink to="/services">Resume Building</FooterLink>
            </ul>
          </div>

          {/* Contact and Social Media Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="mb-4">ADIT College, V.V Nagar,Anand 388120</p>
            <div className="flex gap-4">
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook size={24} />}
                hoverColor="text-blue-500"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter size={24} />}
                hoverColor="text-blue-400"
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram size={24} />}
                hoverColor="text-pink-500"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={<Linkedin size={24} />}
                hoverColor="text-blue-700"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
