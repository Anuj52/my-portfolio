import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// EmailJS identifiers (same values as before - they are public by design, used from the browser)
const SERVICE_ID = 'service_hexkq1i';
const TEMPLATE_ID = 'template_nl4on9x';
const PUBLIC_KEY = 'DS6KqTYT2acZNCzG_';

const FIELD_CLASS =
  'w-full rounded-card border border-line-strong bg-raised px-4 py-3 text-fg outline-none transition placeholder:text-subtle focus:border-action focus:ring-2 focus:ring-action/30';
const LABEL_CLASS = 'mb-2 block text-sm font-medium text-muted';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const buttonStyle =
    status === 'success'
      ? 'bg-success text-on-accent'
      : status === 'error'
        ? 'bg-alert text-on-accent'
        : 'btn-primary';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={LABEL_CLASS}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          value={formState.name}
          onChange={handleChange}
          className={FIELD_CLASS}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASS}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={formState.email}
          onChange={handleChange}
          className={FIELD_CLASS}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className={`${FIELD_CLASS} resize-none`}
          placeholder="Tell me about the opportunity or just say hi..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className={`btn w-full disabled:cursor-not-allowed disabled:opacity-80 ${buttonStyle}`}
      >
        {status === 'idle' && (
          <>
            Send message <Send size={18} aria-hidden="true" />
          </>
        )}
        {status === 'submitting' && (
          <>
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent"
            />
            Sending...
          </>
        )}
        {status === 'success' && (
          <>
            Sent successfully <CheckCircle2 size={18} aria-hidden="true" />
          </>
        )}
        {status === 'error' && (
          <>
            Something went wrong - try again <AlertCircle size={18} aria-hidden="true" />
          </>
        )}
      </button>

      {/* Announces the result to screen readers */}
      <p role="status" aria-live="polite" className="sr-only">
        {status === 'success' && 'Your message was sent.'}
        {status === 'error' && 'Your message could not be sent. Please try again.'}
      </p>
    </form>
  );
}
