import {
  FaCertificate,
  FaBalanceScale,
  FaClipboardCheck,
  FaUserShield,
  FaFileSignature,
  FaUserTie,
  FaLock,
  FaKey,
  FaFolderOpen,
  FaShieldAlt,
  FaSitemap,
  FaDatabase,
} from "react-icons/fa";

/* Verbatim from src/assets/Documents/Professional_Standards_Industry_Network.docx */
export const professionalStandards = {
  eyebrow: "Professional Standards & Industry Network",
  heading: "Experience. Professional practice. Trusted partnerships.",
  intro:
    "International immigration and global mobility require more than knowledge of individual visa programmes. They require structured processes, professional judgement, confidentiality and access to the right specialists at the right stage.",
  body: "With extensive experience across immigration, global mobility and international business, we have developed our practice around professional standards designed to protect client interests and deliver a consistent, transparent service.",
  approach: [
    { icon: FaCertificate, text: "Membership of relevant professional and industry organisations" },
    { icon: FaBalanceScale, text: "Collaboration with appropriately regulated immigration and legal professionals" },
    { icon: FaClipboardCheck, text: "Established processes for client onboarding and case management" },
    { icon: FaUserShield, text: "Secure handling of confidential client information and documentation" },
    { icon: FaFileSignature, text: "Clear engagement terms, responsibilities and communication protocols" },
    { icon: FaUserTie, text: "Access to specialist professionals where a matter requires regulated advice" },
  ],
  network: {
    title: "Our Professional Network",
    text: "Our international network brings together professionals across immigration, law, accounting, taxation, corporate services and global mobility. This allows us to coordinate the different elements of a client's international plans rather than treating immigration as an isolated service.",
  },
  commitment: {
    title: "Our Commitment",
    text: "We believe clients should know who is responsible for their matter, what expertise is being provided and where regulated professional advice is required. Our objective is to provide a professional, transparent and well-structured environment where clients and businesses can confidently plan their international mobility and expansion.",
  },
  closing:
    "Professional experience. Structured processes. The right expertise — connected around your goals.",
};

/* Verbatim from src/assets/Documents/Security_Privacy_Professional_Standards.docx */
export const securityPrivacy = {
  eyebrow: "Security, Privacy & Professional Standards",
  /* The document says "confidentiality and information security"; this had
     been shortened to just confidentiality, dropping half of what the section
     then goes on to evidence with six measures. */
  heading:
    "Client confidentiality and information security are fundamental to the way we operate.",
  intro:
    "Our systems are built around recognised professional best practices, with a focus on secure information handling, controlled access and clear accountability across every client engagement.",
  measures: [
    { icon: FaLock, text: "Secure client onboarding and document handling" },
    { icon: FaKey, text: "Controlled access to sensitive information" },
    { icon: FaFolderOpen, text: "Professional document management and storage" },
    { icon: FaShieldAlt, text: "Secure communication and information sharing" },
    { icon: FaSitemap, text: "Structured case management and accountability" },
    { icon: FaDatabase, text: "Strong data protection and privacy practices" },
  ],
  note: "Where specialist legal, immigration, accounting or technology services are required, we work with appropriately qualified professional organisations and service providers.",
  closing:
    "Our objective is simple: protect client information, maintain professional standards and provide a secure, structured environment for every engagement.",
};
