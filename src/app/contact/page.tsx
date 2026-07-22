'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Check } from 'lucide-react';

const Instagram = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isSupabaseConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('inquiries').insert([
          {
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone || null,
            message: formData.message,
          }
        ]);

        if (error) throw error;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again or message us directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent("Hi Wajose! I have an inquiry about your products.");
  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254737680201'}?text=${whatsappMessage}`;

  return (
    <>
      <Navbar />

      <main className={styles.main} style={{ paddingTop: '160px' }}>
        <div className="container">
          <div className={styles.grid}>
            {/* Info Side */}
            <div className={styles.infoSide}>
              <span className={styles.tagline}>Get In Touch</span>
              <h1 className={styles.title}>We&apos;d Love to Hear From You</h1>
              <p className={styles.description}>
                Have a question about sizes, styles, or want to make a custom inquiry? 
                Reach out to us! The easiest way to order is via WhatsApp, or drop us a message here.
              </p>

              <div className={styles.contactDetails}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.detailCard}>
                  <div className={`${styles.iconWrapper} ${styles.whatsappIcon}`}>
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3>WhatsApp Direct (0737 680 201)</h3>
                    <p>Instant answers & quick orders</p>
                    <span className={styles.linkText}>Chat with us now</span>
                  </div>
                </a>

                <div className={styles.detailCard}>
                  <div className={styles.iconWrapper}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3>Email Support</h3>
                    <p>wajoseeldoret@gmail.com</p>
                    <span>Typically responds within 24 hours</span>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3>Location</h3>
                    <p>Eldoret, Kenya 🇰🇪</p>
                    <span>Countrywide delivery available</span>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconWrapper}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3>Inquiry Hours</h3>
                    <p>Monday - Saturday</p>
                    <span>9:00 AM - 7:00 PM (EAT)</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className={styles.socialsSection}>
                <h3>Follow Our Styles</h3>
                <div className={styles.socialIcons}>
                  <a href="https://instagram.com/wajose" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://facebook.com/wajose" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="https://twitter.com/wajose" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className={styles.formSide}>
              <div className={styles.formCard}>
                {success ? (
                  <div className={styles.successState}>
                    <div className={styles.successCheck}>
                      <Check size={40} />
                    </div>
                    <h2>Inquiry Sent Successfully!</h2>
                    <p>
                      Thank you for reaching out. We have received your message and will get back to you shortly.
                    </p>
                    <button onClick={() => setSuccess(false)} className="btn btn-primary">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Send Us a Message</h2>
                    <p className={styles.formSub}>Fill out the form below and we will get back to you.</p>

                    {errorMsg && (
                      <div className={styles.errorMessage}>
                        {errorMsg}
                      </div>
                    )}

                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="wajoseeldoret@gmail.com"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="phone">Phone Number (WhatsApp Preferred)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0737 680 201"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about the sizes or styles you are interested in..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                      style={{ width: '100%' }}
                    >
                      {loading ? 'Sending...' : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
