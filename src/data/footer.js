import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

/* `href` turns the card into a real tel:/mailto: link — the address has
   none, so it stays plain text. */
export const footerContactInfo = [
  { icon: FaPhoneAlt, label: "Call Us Anytime", value: "+91 458 654 528", href: "tel:+91458654528" },
  { icon: FaEnvelope, label: "Send Mail", value: "srikanth@cgrone.com", href: "mailto:srikanth@cgrone.com" },
  { icon: FaMapMarkerAlt, label: "Our Address", value: "13005 Greenville, USA" },
];

export const footerServices = [
  { label: "Cross-Border Expansion: India → UK", href: "/services/india-uk-expansion" },
  { label: "India–Canada Business Expansion", href: "/services/india-canada-business-expansion" },
  { label: "India–Canada Corporate Expansion & Mobility", href: "/services/india-canada-corporate-mobility" },
  { label: "India–Canada Business Launch & Immigration", href: "/services/india-canada-business-launch" },
  { label: "Global Mobility", href: "/#global-mobility" },
];

export const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About CGR ONE", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Professional Standards", href: "/about#professional-standards" },
  { label: "Security & Privacy", href: "/about#security-privacy" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact Us", href: "/#contact" },
];

export const footerSocialIcons = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];
