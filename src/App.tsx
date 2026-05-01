import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const TREATMENTS = [
  {
    title: 'Smile Makeover',
    description:
      'A comprehensive plan combining multiple cosmetic procedures to achieve the smile you have always wanted. Tailored entirely to your facial structure and aesthetic goals.',
    duration: 'Multi-session',
  },
  {
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement using titanium implants that fuse naturally with the jawbone. Indistinguishable from natural teeth in both appearance and function.',
    duration: 'Single or full arch',
  },
  {
    title: 'Porcelain Veneers',
    description:
      'Ultra-thin ceramic shells bonded to the front surface of teeth. Instantly corrects discolouration, chips, gaps, and minor misalignment with lasting results.',
    duration: 'Two appointments',
  },
  {
    title: 'Teeth Whitening',
    description:
      'Professional-grade whitening using clinically proven compounds to lift deep staining and restore natural brightness without sensitivity or compromise.',
    duration: 'Single session',
  },
];

const TESTIMONIALS = [
  {
    name: 'Catherine M.',
    line: 'My smile looks completely natural. No one guesses I had work done.',
  },
  {
    name: 'James R.',
    line: 'The implant process was smoother than I ever expected. Wish I did it sooner.',
  },
  {
    name: 'Priya S.',
    line: 'From consultation to final result, every step felt considered and personal.',
  },
  {
    name: 'David L.',
    line: 'Years of hiding my teeth. Now I smile without thinking about it.',
  },
];

const BEFORE_AFTER = [
  {
    before: 'Severe discolouration and misalignment',
    after: 'Full smile restoration with veneers',
    treatment: 'Porcelain Veneers',
  },
  {
    before: 'Missing posterior teeth affecting bite',
    after: 'Full function restored with implants',
    treatment: 'Dental Implants',
  },
  {
    before: 'Uneven spacing and surface staining',
    after: 'Comprehensive smile transformation',
    treatment: 'Smile Makeover',
  },
];

const PRICING = [
  {
    name: 'Consultation',
    price: '\u00A3150',
    note: 'Fully redeemable against treatment',
    features: [
      'Full oral assessment',
      'Digital smile preview',
      'Personalised treatment plan',
      '30 minute appointment',
    ],
    featured: false,
  },
  {
    name: 'Veneers',
    price: 'From \u00A3850',
    note: 'Per tooth',
    features: [
      'Porcelain or composite',
      'Colour matching included',
      'Two-year guarantee',
      'Aftercare plan',
    ],
    featured: true,
  },
  {
    name: 'Implants',
    price: 'From \u00A32,400',
    note: 'Per implant',
    features: [
      'Titanium implant',
      'Crown included',
      'Lifetime structural guarantee',
      'Bone graft if required',
    ],
    featured: false,
  },
];

const TRUST_CARDS = [
  {
    title: 'Natural Aesthetics',
    description:
      'Results designed to complement your features, not override them. The finest work goes unnoticed.',
  },
  {
    title: 'Long-Term Durability',
    description:
      'Premium materials and meticulous technique ensure restorations that last decades, not years.',
  },
  {
    title: 'Patient-First Care',
    description:
      'Transparent pricing, honest timelines, and a clinical approach built around your comfort and goals.',
  },
  {
    title: 'Clinical Precision',
    description:
      'Every procedure is planned digitally and executed with exacting attention to proportion and symmetry.',
  },
];

const FAQS = [
  {
    question: 'Is the treatment painful?',
    answer:
      'All procedures are performed under local anaesthetic. Patients report minimal discomfort during treatment. Post-procedure sensitivity, if any, typically resolves within a few days.',
  },
  {
    question: 'How safe are dental implants and veneers?',
    answer:
      'Both procedures have excellent safety records when performed by an experienced practitioner. Titanium implants have been used for decades with success rates above 95%. Porcelain veneers are a conservative treatment that preserves most of your natural tooth structure.',
  },
  {
    question: 'How long do veneers and implants last?',
    answer:
      'Porcelain veneers typically last between 10 and 20 years with proper care. Dental implants are designed to be a permanent solution and carry a lifetime structural guarantee. Regular maintenance appointments significantly extend the lifespan of any restoration.',
  },
  {
    question: 'What does treatment cost and do you offer payment plans?',
    answer:
      'Costs vary by treatment. Consultations are \u00A3150, fully redeemable against any treatment. Interest-free finance is available on treatments over \u00A3500, subject to credit approval. Our patient coordinator will walk you through all available options at your consultation.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Whitening requires no recovery. Veneer patients return to normal activity the same day. Implant patients typically resume normal routines within 24 to 48 hours, with full integration over the following weeks.',
  },
];

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0c0c0d]/95 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo('#hero')}
          className="font-playfair text-[#f2f2f2] text-lg font-semibold tracking-wide hover:text-white transition-colors"
        >
          Dr. Hale
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-[#9a9a9a] hover:text-[#f2f2f2] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-5 py-2.5 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold rounded-sm hover:bg-white transition-colors duration-200 tracking-wide"
          >
            Book Consultation
          </button>
        </div>

        <button
          className="lg:hidden text-[#9a9a9a] hover:text-[#f2f2f2] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#141416]/98 backdrop-blur-md border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => {
                scrollTo(l.href);
                setOpen(false);
              }}
              className="text-[#9a9a9a] hover:text-[#f2f2f2] text-sm font-medium tracking-wide text-left transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollTo('#contact');
              setOpen(false);
            }}
            className="mt-2 px-5 py-3 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold rounded-sm hover:bg-white transition-colors tracking-wide"
          >
            Book Consultation
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, #1e1e1f 0%, #0c0c0d 60%, #080809 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(20,20,22,0.8) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(168,176,184,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(217,217,217,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-8">
          Cosmetic &amp; Restorative Dentistry
        </p>

        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8 shine-text">
          Precision Dentistry.
          <br />
          <em className="not-italic text-[#d9d9d9]">Confidence Refined.</em>
        </h1>

        <p className="text-[#9a9a9a] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
          Advanced cosmetic and restorative treatments designed for natural, long-lasting results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-all duration-200 hover:scale-[1.02]"
          >
            Book Consultation
          </button>
          <button
            onClick={() => scrollTo('#treatments')}
            className="px-8 py-4 border border-white/[0.15] text-[#d9d9d9] text-sm font-medium tracking-widest uppercase rounded-sm hover:border-white/30 hover:text-white transition-all duration-200"
          >
            View Treatments
          </button>
        </div>
      </div>

    </section>
  );
}

function TreatmentCard({
  title,
  description,
  duration,
}: {
  title: string;
  description: string;
  duration: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      onClick={() => scrollTo('#contact')}
      className={`group cursor-pointer border border-white/[0.08] bg-[#141416] rounded-sm p-8 hover:border-white/20 hover:bg-[#1a1a1c] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{
        transition:
          'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background-color 0.3s',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <h3 className="font-playfair text-xl font-semibold text-[#f2f2f2] group-hover:text-white transition-colors">
          {title}
        </h3>
        <span className="text-[10px] font-medium text-[#9a9a9a] tracking-widest uppercase border border-white/[0.08] px-2 py-1 rounded-sm whitespace-nowrap ml-4">
          {duration}
        </span>
      </div>
      <p className="text-[#9a9a9a] text-sm font-light leading-relaxed mb-6">{description}</p>
      <span className="text-[#d9d9d9] text-xs font-medium tracking-widest uppercase group-hover:text-white transition-colors">
        Enquire &rarr;
      </span>
    </div>
  );
}

function Treatments() {
  const { ref, visible } = useInView();
  return (
    <section id="treatments" className="bg-[#0c0c0d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text max-w-xl">
            Treatments Built Around You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.title} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({
  before,
  after,
  treatment,
  delay,
}: {
  before: string;
  after: string;
  treatment: string;
  delay: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`border border-white/[0.08] bg-[#0c0c0d] rounded-sm overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-48 bg-[#141416] flex items-center justify-center border-b border-white/[0.08]">
        <div className="absolute inset-0 flex">
          <div
            className="flex-1 flex items-center justify-center text-center px-4"
            style={{ background: 'linear-gradient(135deg, #0e0e10 0%, #1a1a1c 100%)' }}
          >
            <div>
              <p className="text-[#9a9a9a] text-[9px] font-medium tracking-widest uppercase mb-2">
                Before
              </p>
              <p className="text-[#9a9a9a] text-xs font-light leading-snug">{before}</p>
            </div>
          </div>
          <div className="w-px bg-white/[0.08]" />
          <div
            className="flex-1 flex items-center justify-center text-center px-4"
            style={{ background: 'linear-gradient(135deg, #1a1a1c 0%, #222224 100%)' }}
          >
            <div>
              <p className="text-[#d9d9d9] text-[9px] font-medium tracking-widest uppercase mb-2">
                After
              </p>
              <p className="text-[#d9d9d9] text-xs font-light leading-snug">{after}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-[10px] font-medium text-[#9a9a9a] tracking-widest uppercase">
          {treatment}
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({
  name,
  line,
  delay,
}: {
  name: string;
  line: string;
  delay: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`border border-white/[0.08] bg-[#0c0c0d] rounded-sm p-6 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-[#d9d9d9] text-sm font-light leading-relaxed mb-5 italic">
        &ldquo;{line}&rdquo;
      </p>
      <p className="text-[#9a9a9a] text-xs font-medium tracking-wide">{name}</p>
    </div>
  );
}

function SocialProof() {
  const { ref, visible } = useInView();

  return (
    <section id="results" className="bg-[#141416] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            Patient Outcomes
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text max-w-xl">
            Results That Speak
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {BEFORE_AFTER.map((r, i) => (
            <BeforeAfterCard key={i} {...r} delay={i * 100} />
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-20">
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-12 text-center">
            What Patients Say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useInView();
  return (
    <section id="about" className="bg-[#0c0c0d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
              About the Practitioner
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text mb-8 leading-tight">
              Dr. Sebastian Hale
            </h2>
            <p className="text-[#a8b0b8] text-base font-light leading-[1.8] mb-6">
              With over 15 years of focused practice in cosmetic and restorative dentistry, Dr. Hale
              has developed a clinical approach defined by precision, restraint, and a commitment to
              outcomes that complement the individual rather than override them.
            </p>
            <p className="text-[#a8b0b8] text-base font-light leading-[1.8] mb-10">
              Every treatment plan is designed with a single principle: that the finest results are
              those that go unnoticed. Natural aesthetics, lasting function, and a patient experience
              built on transparency.
            </p>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3.5 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-all duration-200"
            >
              Book Consultation
            </button>
          </div>

          <div className="relative">
            <div
              className="w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/[0.08] relative"
              style={{
                background: 'linear-gradient(160deg, #1e1e20 0%, #141416 40%, #0e0e10 100%)',
              }}
            >
              <svg
                viewBox="0 0 400 533"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stopColor="#1e1e20" />
                    <stop offset="50%" stopColor="#141416" />
                    <stop offset="100%" stopColor="#0e0e10" />
                  </linearGradient>
                  <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a2a2e" />
                    <stop offset="100%" stopColor="#1a1a1c" />
                  </linearGradient>
                  <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8e8e8" />
                    <stop offset="100%" stopColor="#d0d0d0" />
                  </linearGradient>
                  <radialGradient id="faceGlow" cx="0.5" cy="0.35" r="0.5">
                    <stop offset="0%" stopColor="#d4b896" />
                    <stop offset="100%" stopColor="#c4a07a" />
                  </radialGradient>
                  <linearGradient id="fadeBottom" x1="0" y1="0.7" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0c0c0d" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0c0c0d" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <rect width="400" height="533" fill="url(#bg)" />
                {/* Shoulders and coat */}
                <path d="M100,533 L100,380 Q100,340 140,320 L180,300 Q200,290 220,300 L260,320 Q300,340 300,380 L300,533 Z" fill="url(#coatGrad)" />
                {/* Shirt collar V */}
                <path d="M175,300 L200,360 L225,300" fill="url(#shirtGrad)" />
                {/* Neck */}
                <rect x="178" y="260" width="44" height="50" rx="8" fill="#c4a07a" />
                {/* Head */}
                <ellipse cx="200" cy="210" rx="65" ry="80" fill="url(#faceGlow)" />
                {/* Hair */}
                <path d="M135,195 Q135,120 200,115 Q265,120 265,195 Q265,155 240,145 Q200,135 160,145 Q135,155 135,195 Z" fill="#2c2c2e" />
                {/* Eyes */}
                <ellipse cx="175" cy="210" rx="8" ry="4" fill="#1a1a1c" />
                <ellipse cx="225" cy="210" rx="8" ry="4" fill="#1a1a1c" />
                {/* Eyebrows */}
                <path d="M160,198 Q175,193 190,198" stroke="#3a3a3c" strokeWidth="2" fill="none" />
                <path d="M210,198 Q225,193 240,198" stroke="#3a3a3c" strokeWidth="2" fill="none" />
                {/* Nose */}
                <path d="M197,220 L193,245 L207,245 L203,220" stroke="#b08a60" strokeWidth="1" fill="none" />
                {/* Mouth - subtle smile */}
                <path d="M185,260 Q200,270 215,260" stroke="#a07050" strokeWidth="1.5" fill="none" />
                {/* Ears */}
                <ellipse cx="135" cy="215" rx="8" ry="14" fill="#c4a07a" />
                <ellipse cx="265" cy="215" rx="8" ry="14" fill="#c4a07a" />
                {/* Fade overlay at bottom */}
                <rect width="400" height="533" fill="url(#fadeBottom)" />
                {/* Name and credentials */}
                <text x="32" y="490" fontFamily="serif" fontSize="20" fontWeight="600" fill="#f2f2f2">Dr. Sebastian Hale</text>
                <text x="32" y="512" fontFamily="sans-serif" fontSize="11" fill="#9a9a9a" letterSpacing="1">BDS, MFDS RCSEd, MClinDent</text>
              </svg>
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-sm border border-white/[0.06]"
              style={{ background: 'linear-gradient(135deg, #141416, #1a1a1c)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  note,
  features,
  featured,
  delay,
}: {
  name: string;
  price: string;
  note: string;
  features: string[];
  featured: boolean;
  delay: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`relative border rounded-sm p-8 transition-all duration-700 ${
        featured ? 'border-white/20 bg-[#1e1e20]' : 'border-white/[0.08] bg-[#0c0c0d]'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {featured && (
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
      <p className="text-[#9a9a9a] text-xs font-medium tracking-widest uppercase mb-6">{name}</p>
      <div className="mb-2">
        <span className="font-playfair text-4xl font-semibold text-[#f2f2f2]">{price}</span>
      </div>
      <p className="text-[#9a9a9a] text-xs mb-8">{note}</p>
      <ul className="space-y-3 mb-10">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#d9d9d9] shrink-0" />
            <span className="text-[#a8b0b8] text-sm font-light">{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => scrollTo('#contact')}
        className={`w-full py-3.5 text-sm font-semibold tracking-widest uppercase rounded-sm transition-all duration-200 ${
          featured
            ? 'bg-[#f2f2f2] text-[#0c0c0d] hover:bg-white'
            : 'border border-white/[0.12] text-[#d9d9d9] hover:border-white/25 hover:text-white'
        }`}
      >
        Book Consultation
      </button>
    </div>
  );
}

function Pricing() {
  const { ref, visible } = useInView();
  return (
    <section id="pricing" className="bg-[#141416] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            Transparent Pricing
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text max-w-xl">
            Clear Costs, No Surprises
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING.map((p, i) => (
            <PricingCard key={p.name} {...p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`border border-white/[0.08] bg-[#141416] rounded-sm p-8 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-playfair text-lg font-semibold text-[#f2f2f2] mb-3">{title}</h3>
      <p className="text-[#9a9a9a] text-sm font-light leading-relaxed">{description}</p>
    </div>
  );
}

function Trust() {
  const { ref, visible } = useInView();
  return (
    <section className="bg-[#0c0c0d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            Our Commitment
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text max-w-xl">
            Clinical Precision. Trusted Results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUST_CARDS.map((card, i) => (
            <TrustCard key={card.title} {...card} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { ref, visible } = useInView();

  const toggle = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="bg-[#0c0c0d] py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            Common Questions
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-white/[0.08] rounded-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-7 py-5 text-left group"
                onClick={() => toggle(i)}
              >
                <span className="text-[#f2f2f2] text-sm font-medium pr-6 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <span className="text-[#9a9a9a] shrink-0 transition-transform duration-300">
                  {openIdx === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIdx === i ? '200px' : '0',
                  opacity: openIdx === i ? 1 : 0,
                }}
              >
                <div className="px-7 pb-6">
                  <p className="text-[#9a9a9a] text-sm font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, visible } = useInView();
  return (
    <section className="bg-[#141416] py-28 px-6">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text mb-6">
          Start Your Transformation
        </h2>
        <p className="text-[#9a9a9a] text-base font-light leading-relaxed max-w-lg mx-auto mb-10">
          Every journey begins with a conversation. Reserve your consultation and take the first step toward the results you deserve.
        </p>
        <button
          onClick={() => scrollTo('#contact')}
          className="px-10 py-4 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-all duration-200 hover:scale-[1.02]"
        >
          Book Consultation
        </button>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, visible } = useInView();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    treatment: '',
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#0c0c0d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[#9a9a9a] text-xs font-medium tracking-[0.25em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-semibold text-[#f2f2f2] shine-text mb-8 leading-tight">
              Book Your Consultation
            </h2>
            <p className="text-[#a8b0b8] text-base font-light leading-relaxed mb-12">
              Every journey begins with a conversation. Reserve your consultation and receive a
              personalised assessment and treatment plan from Dr. Hale.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Location', value: '12 Harley Street, London, W1G 9PQ' },
                { label: 'Hours', value: 'Monday to Friday, 8:30am to 6:00pm' },
                { label: 'Phone', value: '+44 20 7946 0958' },
                { label: 'Email', value: 'consult@drhale.co.uk' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-[#d9d9d9] text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/[0.08] bg-[#141416] rounded-sm p-8 lg:p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10l4.5 4.5L16 6"
                      stroke="#d9d9d9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-[#f2f2f2] mb-3">
                  Request Received
                </h3>
                <p className="text-[#9a9a9a] text-sm font-light leading-relaxed max-w-xs">
                  Thank you for reaching out. A member of the team will be in contact within one
                  business day to confirm your appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#0c0c0d] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0c0c0d] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
                      placeholder="+44..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0d] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-2">
                    Treatment of Interest
                  </label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0d] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0c0c0d]">
                      Select a treatment
                    </option>
                    <option value="smile-makeover" className="bg-[#0c0c0d]">
                      Smile Makeover
                    </option>
                    <option value="implants" className="bg-[#0c0c0d]">
                      Dental Implants
                    </option>
                    <option value="veneers" className="bg-[#0c0c0d]">
                      Porcelain Veneers
                    </option>
                    <option value="whitening" className="bg-[#0c0c0d]">
                      Teeth Whitening
                    </option>
                    <option value="other" className="bg-[#0c0c0d]">
                      Other / Not Sure
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#9a9a9a] text-[10px] font-medium tracking-widest uppercase mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#0c0c0d] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    placeholder="Tell us anything you would like us to know before your visit."
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 shrink-0 rounded-sm border border-white/[0.15] bg-[#0c0c0d] appearance-none checked:bg-[#f2f2f2] checked:border-[#f2f2f2] transition-colors cursor-pointer relative
                    [&:checked::after]:content-[''] [&:checked::after]:absolute [&:checked::after]:left-[5px] [&:checked::after]:top-[2px] [&:checked::after]:w-[5px] [&:checked::after]:h-[9px] [&:checked::after]:border-r-2 [&:checked::after]:border-b-2 [&:checked::after]:border-[#0c0c0d] [&:checked::after]:rotate-45"
                  />
                  <span className="text-[#9a9a9a] text-xs font-light leading-relaxed group-hover:text-[#a8b0b8] transition-colors">
                    I consent to Dr. Hale&apos;s practice storing my details to arrange my consultation. Your data is handled in confidence and never shared with third parties.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading || !consent}
                  className="w-full py-4 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Book Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollToTop() {
  const scrolled = useScrolled(400);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-10 h-10 bg-[#1a1a1c] border border-white/[0.1] rounded-sm flex items-center justify-center text-[#9a9a9a] hover:text-[#f2f2f2] hover:border-white/20 transition-all duration-300 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0c0c0d] border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-playfair text-[#f2f2f2] text-base font-semibold">Dr. Hale</p>
        <p className="text-[#9a9a9a] text-xs text-center">
          &copy; {new Date().getFullYear()} Dr. Sebastian Hale. All rights reserved. Regulated by
          the GDC.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Use'].map((t) => (
            <button
              key={t}
              className="text-[#9a9a9a] hover:text-[#d9d9d9] text-xs transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Treatments />
      <SocialProof />
      <About />
      <Pricing />
      <Trust />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}
