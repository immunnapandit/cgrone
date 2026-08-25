/* `name` is the key the /api/contact endpoint reads off the submitted form,
   so these must stay in step with the validation there. Phone is the only
   optional one. */
export const contactFields = [
  { name: "name", label: "Your Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Enter Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
  { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
];
