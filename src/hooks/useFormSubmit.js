import { useCallback, useRef, useState } from "react";

/* Shared submit handling for the contact and newsletter forms.
 *
 * Returns a `status` of "idle" | "sending" | "sent" | "error". The endpoints
 * answer with { ok: true } or { error: "..." }; the error text is written for
 * the visitor, so it is shown as-is rather than replaced with a generic
 * message that would hide "please enter a valid email address".
 */
export default function useFormSubmit(endpoint, { resetAfter = 5000 } = {}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const timer = useRef(null);

  const submit = useCallback(
    async (event, { onSuccess } = {}) => {
      event.preventDefault();
      if (status === "sending") return;

      const form = event.currentTarget;
      const payload = Object.fromEntries(new FormData(form));

      clearTimeout(timer.current);
      setStatus("sending");
      setError("");

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(data.error || "Something went wrong.");

        setStatus("sent");
        form.reset();
        onSuccess?.();
      } catch (err) {
        setStatus("error");
        // A failed fetch (offline, blocked) has no server message of its own.
        setError(err.message === "Failed to fetch" ? "Network error. Please try again." : err.message);
      }

      timer.current = setTimeout(() => setStatus("idle"), resetAfter);
    },
    [endpoint, resetAfter, status]
  );

  return { status, error, submit };
}
