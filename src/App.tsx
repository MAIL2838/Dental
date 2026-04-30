import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

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

const RESULTS = [
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
    price: '£95',
    note: 'Redeemable against treatment',
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
    price: 'From £850',
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
    price: 'From £2,400',
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

const FAQS = [
  {
    question: 'How long do veneers last?',
    answer:
      'Porcelain veneers typically last between 10 and 20 years with proper care. Regular maintenance appointments and avoiding excessive force on the teeth significantly extend their lifespan.',
  },
  {
    question: 'Is the treatment painful?',
    answer:
      'All procedures are performed under local anaesthetic. Patients report minimal discomfort during treatment. Post-procedure sensitivity, if any, typically resolves within a few days.',
  },
  {
    question: 'How soon can I see results?',
    answer:
      'Whitening results are visible immediately following treatment. Veneers and implants require a short fabrication period, but the transformation is visible at your fitting appointment.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. Interest-free finance is available on treatments over £500, subject to credit approval. Our patient coordinator will walk you through all available options at your consultation.',
  },
  {
    question: 'What is involved in a smile makeover?',
    answer:
      'A smile makeover begins with a comprehensive consultation to assess your goals, dental health, and facial proportions. A bespoke plan is then designed combining whichever treatments will achieve your ideal outcome.',
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#d9d9d9] to-transparent mx-auto" />
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

function ResultCard({
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

function Results() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESULTS.map((r, i) => (
            <ResultCard key={i} {...r} delay={i * 100} />
          ))}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-[#1a1a1c]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="10" r="5" stroke="#d9d9d9" strokeWidth="1.5" fill="none" />
                    <path
                      d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
                      stroke="#d9d9d9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="font-playfair text-2xl font-semibold text-[#f2f2f2] mb-2">
                  Dr. Sebastian Hale
                </p>
                <p className="text-[#9a9a9a] text-sm tracking-wide mb-6">
                  BDS, MFDS RCSEd, MClinDent
                </p>
                <div className="w-12 h-px bg-white/10 mb-6" />
                <p className="text-[#9a9a9a] text-xs tracking-widest uppercase">
                  15+ Years in Cosmetic Dentistry
                </p>
              </div>
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

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { ref, visible } = useInView();

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
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-[#f2f2f2] text-sm font-medium pr-6 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <span className="text-[#9a9a9a] shrink-0">
                  {openIdx === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-7 pb-6">
                  <p className="text-[#9a9a9a] text-sm font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#141416] py-28 px-6">
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

          <div className="border border-white/[0.08] bg-[#0c0c0d] rounded-sm p-8 lg:p-10">
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
                      className="w-full bg-[#141416] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
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
                      className="w-full bg-[#141416] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
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
                    className="w-full bg-[#141416] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors"
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
                    className="w-full bg-[#141416] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#141416]">
                      Select a treatment
                    </option>
                    <option value="smile-makeover" className="bg-[#141416]">
                      Smile Makeover
                    </option>
                    <option value="implants" className="bg-[#141416]">
                      Dental Implants
                    </option>
                    <option value="veneers" className="bg-[#141416]">
                      Porcelain Veneers
                    </option>
                    <option value="whitening" className="bg-[#141416]">
                      Teeth Whitening
                    </option>
                    <option value="other" className="bg-[#141416]">
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
                    className="w-full bg-[#141416] border border-white/[0.08] rounded-sm px-4 py-3 text-[#f2f2f2] text-sm placeholder-[#9a9a9a]/40 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    placeholder="Tell us anything you would like us to know before your visit."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#f2f2f2] text-[#0c0c0d] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Book Consultation'}
                </button>
                <p className="text-[#9a9a9a] text-[11px] text-center">
                  Your details are handled in confidence and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
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
      <Results />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
