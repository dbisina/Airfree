'use client';
import { useState } from 'react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { ok: boolean; error?: string; note?: string };
      if (data.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <section className="bg-[#060f1e] border-t border-white/[0.06] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 lg:gap-24">
          {/* Left */}
          <RevealOnScroll className="flex-1">
            <SectionLabel className="text-white/40 mb-3">Intelligence Brief</SectionLabel>
            <h2 className="font-serif text-white leading-tight" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Stay Ahead of the Spatial Industry
            </h2>
            <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-sm">
              Occasional updates on geospatial technology, project insights, and industry intelligence. No spam.
            </p>
          </RevealOnScroll>

          {/* Right */}
          <RevealOnScroll delay={0.1} className="flex-1 max-w-md w-full">
            {status === 'success' ? (
              <div className="border border-white/10 bg-white/[0.04] px-6 py-5">
                <p className="font-mono text-[0.65rem] tracking-widest uppercase text-brand-blue mb-1">Subscribed</p>
                <p className="text-sm text-white/60">You&apos;re on the list. We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@organisation.com"
                  className="flex-1 border border-white/15 bg-white/[0.04] text-white placeholder:text-white/25 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="shrink-0 px-6 py-3 bg-brand-blue text-white text-[0.62rem] font-bold tracking-[0.16em] uppercase border border-brand-blue hover:bg-[#3a72a0] hover:border-[#3a72a0] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]"
                >
                  {status === 'loading' ? '…' : 'Subscribe'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
            )}
            <p className="text-[0.58rem] font-mono tracking-widest text-white/20 uppercase mt-3">
              Unsubscribe at any time · No third-party sharing
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
