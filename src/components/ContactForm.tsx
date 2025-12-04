import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = 'service_hexkq1i';
    const TEMPLATE_ID = 'template_nl4on9x';
    const PUBLIC_KEY = 'DS6KqTYT2acZNCzG_';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('submitting');

        try {
            await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                formRef.current,
                PUBLIC_KEY
            );
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 text-left"
        >
            <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white transition-all"
                    placeholder="John Doe"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white transition-all"
                    placeholder="john@example.com"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white transition-all resize-none"
                    placeholder="Your message here..."
                />
            </div>

            <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-accent text-slate-900 hover:bg-accent-hover'
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
                {status === 'idle' && (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
                {status === 'submitting' && (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                )}
                {status === 'success' && (
                    <>
                        Sent Successfully <CheckCircle size={18} />
                    </>
                )}
                {status === 'error' && (
                    <>
                        Failed. Try Again. <AlertCircle size={18} />
                    </>
                )}
            </button>
        </motion.form>
    );
};

export default ContactForm;
