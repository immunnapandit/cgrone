/* `name` is the key the /api/contact endpoint reads off the submitted form,
   so these must stay in step with the validation there. Phone is the only
   optional one.

   `label` is now rendered as a VISIBLE label above each field, where it used
   to double as the placeholder inside it. That changes what the words have to
   be: "Your Name" and "Enter Email" are prompts, which is how a placeholder
   talks, and they read as instructions when they sit above the field as a
   heading for it. A label names the thing. */
export const contactFields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
  { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
];
