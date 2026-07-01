import React, { useState, useEffect } from 'react';
import { 
  Building2, CheckCircle2, MapPin, Phone, Award, 
  TrendingUp, Users, ShieldCheck, Factory, 
  HardHat, ChevronDown, MessageCircle, Menu, 
  X, ArrowRight, Download, Check, Sparkles, Zap
} from 'lucide-react';

// --- DATA CONSTANTS ---

const BRAND_COLORS = {
  whiteBg: '#FFFFFF',
  panelLight: '#F8FAFC',
  accentRed: '#E31837',
  neonRedGlow: 'rgba(227, 24, 55, 0.05)',
  neutralDark: '#0F172A',
  neutralMuted: '#64748B'
};

// Reusable SVG components for generic icons (MOVED ABOVE BENEFITS ARRAY)
// Fixing the initialization order so they are not evaluated as 'undefined' when constructing the array.
const Globe = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Star = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const BENEFITS = [
  { icon: Award, title: "Dealer Growth Kit", desc: "Receive branded merchandise, marketing materials, and utility items that enhance shop visibility and strengthen brand association." },
  { icon: Users, title: "Counter Meet Support", desc: "Indus conducts influencer meets at your outlet to create awareness, generate demand, and support sales growth." },
  { icon: TrendingUp, title: "On-Ground Sales Support & Lead Generation", desc: "Dedicated field support and qualified lead generation help increase conversions and drive secondary sales." },
  { icon: Award, title: "Gold Schemes Directly Linked to Performance", desc: "Rewarding dealer performance with premium incentives that recognize growth, achievement, and business success." },
  { icon: Globe, title: "Domestic & International Dealer Trips", desc: "Exclusive travel experiences with the Managing Director, enabling networking with leading dealers and celebrating success." },
  { icon: Factory, title: "Mobile Tech Van Support", desc: "India's first mobile testing laboratory, conducted near your shop to build customer confidence and drive conversions." },
  { icon: Sparkles, title: "Strong Shop Promotion & Branding Support", desc: "From signboards to complete shop branding, we help improve visibility, credibility, and customer recall for your shop." },
  { icon: Star, title: "Exclusive Access to Celebrity Launch Events", desc: "Special invitations to celebrity launches and exclusive events that foster recognition, networking, and stronger relationships." },
  { icon: Building2, title: "Annual Dealer Meets at Luxury Resorts - With Families", desc: "Premium family-inclusive dealer meets that celebrate partnerships, strengthen relationships, and create lasting memories." }
];

const MANUFACTURING_STAGES = [
  {
    id: 0,
    title: "Raw Materials to Molten Iron",
    desc: "Selective low sulphur, low phosphorus sponge iron pellets and recycled green steel is used to produce molten steel by adding quality micro elements in stage one.",
    image: "About us 1.png",
    icon: HardHat
  },
  {
    id: 1,
    title: "Molten Iron to Primary Steel",
    desc: "This molten steel is casted into quality Billets through South India's first BULLET CASTER and rolled in the state of art rolling mill into rods of required diameters.",
    image: "About us 2.png",
    icon: Factory
  },
  {
    id: 2,
    title: "Thermo Mechanical Treatment",
    desc: "The hot rolled bars released from rolling mill are passed through a technological innovative tmt box with a combination of pipe and nozzle system. It cools down the outer core rapidly and self tempering happens where the heat from the core passes to the bar surface to harden the TMT bar outer core. Finally atmospheric cooling ensure the austenitic core turns as ferrite-pearlite structure. This make Indus TMT more ductile and with higher tensile strength.",
    image: "About us 3.png",
    icon: Zap
  }
];

const TERRITORY_REGIONS = {
  "Karnataka": [
    { city: "Bengaluru Metropolitan Region", status: "Active Expansion" },
    { city: "Mysuru & South Karnataka", status: "Available" },
    { city: "Hubli-Dharwad & North Karnataka", status: "Available" },
    { city: "Tumkur", status: "Active Search" },
    { city: "Other Regions", status: "Available" }
  ],
  "Tamil Nadu": [
    { city: "Chennai & Surrounding", status: "Available" },
    { city: "Coimbatore Industrial Belt", status: "Active Expansion" },
    { city: "Madurai & South", status: "Active Search" },
    { city: "Salem Region", status: "Available" },
    { city: "Other Regions", status: "Available" }
  ]
};

const ELIGIBLE_LEFT = [
  { title: "Minimum Sales Volume", desc: "Average steel sales of at least 25 tons per month over the last 6 months." },
  { title: "Business Type", desc: "Multi-brand TMT dealers and building material dealers are eligible to apply." },
  { title: "Shop Size & Infrastructure", desc: "Minimum 600 sq. ft. shop with adequate storage and accessibility for heavy vehicles." },
  { title: "Stock Holding Capacity", desc: "Ability to maintain a minimum live stock of 20 tons with proper storage facilities." }
];

const ELIGIBLE_RIGHT = [
  { title: "Financial Discipline & Payment Capability", desc: "Consistent payment cycle of up to 15 days with existing brands and willingness to make advance payments during the initial association period (6 months)." },
  { title: "Location Requirements", desc: "Shop must be located on a main or motorable road, accessible by 16-20 ton lorries, and not inside narrow lanes." },
  { title: "GST Registration", desc: "Valid GST registration with timely compliance and filing records." },
  { title: "Dealer Verification Parameters", desc: "Purchase invoices, sales records, GST documents, and financial proofs may be required for verification." }
];

const ONBOARDING_TIMELINE = [
  { step: "01", title: "Prospectus Intake", duration: "Day 1", desc: "Submit verified business credentials via the secure B2B gateway." },
  { step: "02", title: "Enterprise Verification", duration: "Day 2-3", desc: "Financial check and corporate background review by our treasury team." },
  { step: "03", title: "Territory Allocation", duration: "Day 4", desc: "Direct mapping of exclusive territory boundaries and pricing structure." },
  { step: "04", title: "Sovereign Agreement", duration: "Day 7", desc: "Legal execution of the regional distribution contract." },
  { step: "05", title: "Logistics Setup & Launch", duration: "Day 10", desc: "Dispatch of foundational inventory, marketing kits, and sales training." }
];

const FAQS = [
  { q: "Do I need to pay any deposit to become an Indus dealer?", a: "No. Indus does not require any security deposit or dealership fee." },
  { q: "Will I get credit from the first load?", a: "No. Dealers are required to make advance payments during the initial association period. Credit eligibility will be evaluated later by our credit team based on business performance and payment discipline." },
  { q: "Can I continue selling other steel brands along with Indus?", a: "Yes. Indus does not require exclusive dealership. Multi-brand dealers are welcome." },
  { q: "Can I become an Indus dealer if I also sell cement, pipes, hardware, or other building materials?", a: "Yes. Dealers handling allied building materials are eligible to apply." },
  { q: "What is the minimum sales volume required to become an Indus dealer?", a: "The dealer should have an average steel sales volume of at least 25 tons per month over the last 6 months." },
  { q: "What documents are required during dealer verification?", a: "Sale records, GST documents, and financial proofs may be required for verification." },
  { q: "Is GST registration mandatory?", a: "Yes. A valid and active GST registration is mandatory." },
  { q: "What is the minimum stock holding requirement?", a: "Dealers should be capable of maintaining a minimum live stock of 20 tons of TMT steel." },
  { q: "Does Indus provide marketing and branding support?", a: "Yes. Indus provides shop branding, signboards, wall paintings, and various promotional activities based on eligibility." },
  { q: "Does Indus help generate sales and leads?", a: "Yes. Dedicated field teams support site visits, influencer engagement, and lead generation activities." },
  { q: "Does Indus conduct events for dealers?", a: "Yes. Indus regularly conducts dealer meets, counter meets, and exclusive events for dealer partners." },
  { q: "Are there any reward programs for dealers?", a: "Yes. Dealers may be eligible for performance-linked rewards, recognition programs, and exclusive experiences." },
  { q: "Does Indus organize dealer trips?", a: "Yes. High-performing dealers may qualify for domestic and international dealer trips." },
  { q: "Does Indus provide technical support at site?", a: "Yes. Indus operates India's first mobile testing laboratory capable of conducting steel tests directly at site." },
  { q: "How long does the dealer approval process take?", a: "Dealer applications are reviewed after verification of business, infrastructure, financial discipline, and market potential. The approval timeline may vary depending on the verification process." },
  { q: "Can a new business apply for an Indus dealership?", a: "Yes. However, preference is given to experienced steel dealers, and additional payment conditions will apply for newer businesses." }
];

// --- ULTRA-PREMIUM LIGHT MINIMALIST FORM ---
const LuxuryLeadForm = ({ buttonText = "Apply for Dealership", id = "lead-form" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const fetchLocationData = async (pin) => {
    setIsPincodeLoading(true);
    setPincodeError('');
    setCity('');
    setState('');
    setAreas([]);
    setSelectedArea('');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data[0].Status === 'Success') {
        const postOffices = data[0].PostOffice;
        const office = postOffices[0];
        setCity(office.District);
        setState(office.State);
        
        // Extract areas
        const fetchedAreas = postOffices.map(po => po.Name);
        setAreas(fetchedAreas);
        if (fetchedAreas.length > 0) {
          setSelectedArea(fetchedAreas[0]);
        }
      } else {
        setPincodeError('Invalid Pincode. Please check again.');
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setPincodeError('Failed to verify pincode. Enter manually if needed.');
    } finally {
      setIsPincodeLoading(false);
    }
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Ensure only numbers
    setPincode(val);
    
    if (val.length === 6) {
      fetchLocationData(val);
    } else {
      setCity('');
      setState('');
      setAreas([]);
      setSelectedArea('');
      setPincodeError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[450px] bg-white border border-slate-200 shadow-2xl rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E31837]/5 to-transparent pointer-events-none"></div>
        <div className="w-20 h-20 bg-[#E31837]/10 border border-[#E31837]/30 rounded-full flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-[#E31837]" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Application Logged</h3>
        <p className="text-slate-500 text-base leading-relaxed max-w-sm">
          Your credentials have bypassed the queue. A Senior Commercial Director will initiate contact with your office within 12 hours.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="p-8 md:p-10 bg-white border border-slate-200/80 shadow-[0_30px_70px_rgba(0,0,0,0.06)] rounded-xl relative">
      <div className="absolute -top-px left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E31837] to-transparent"></div>
      
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E31837] animate-ping"></span>
          <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">Executive Registry</span>
        </div>
        <h3 className="text-3xl font-black tracking-tight text-slate-900">Apply for Partnership</h3>
        <p className="text-slate-500 text-sm mt-2">Submit preliminary commercial records for prioritized evaluation.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input required type="text" id={`${id}-name`} className="peer w-full bg-slate-50 border border-slate-200 focus:border-[#E31837] focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded" placeholder="Full Name" />
            <label htmlFor={`${id}-name`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">Full Name *</label>
          </div>
          <div className="relative">
            <input required type="tel" id={`${id}-phone`} className="peer w-full bg-slate-50 border border-slate-200 focus:border-[#E31837] focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded" placeholder="Mobile Number" />
            <label htmlFor={`${id}-phone`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">Mobile *</label>
          </div>
        </div>

        <div className="relative">
          <input required type="text" id={`${id}-company`} className="peer w-full bg-slate-50 border border-slate-200 focus:border-[#E31837] focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded" placeholder="Company Name" />
          <label htmlFor={`${id}-company`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">Registered Firm Name *</label>
        </div>

        {/* Dynamic Location Lookup Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input required type="text" maxLength="6" id={`${id}-pincode`} value={pincode} onChange={handlePincodeChange} className={`peer w-full bg-slate-50 border ${pincodeError ? 'border-red-400' : 'border-slate-200'} focus:border-[#E31837] focus:bg-white p-3 pr-10 text-sm text-slate-900 outline-none transition-colors rounded`} placeholder="6-Digit Pincode" />
            <label htmlFor={`${id}-pincode`} className={`absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold ${pincodeError ? 'text-red-500' : 'text-slate-500'} peer-focus:text-[#E31837] transition-all`}>My Shop Pincode *</label>
            {isPincodeLoading && (
              <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-slate-300 border-t-[#E31837] rounded-full animate-spin"></div>
            )}
            {!isPincodeLoading && city && !pincodeError && (
              <CheckCircle2 className="absolute right-3 top-3.5 w-4 h-4 text-emerald-500" />
            )}
            {pincodeError && <span className="absolute -bottom-5 left-1 text-[10px] text-red-500">{pincodeError}</span>}
          </div>
          
          <div className="relative">
             {areas.length > 0 ? (
                <select required value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="peer w-full bg-emerald-50/50 border border-emerald-200 focus:border-emerald-500 focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded appearance-none cursor-pointer">
                  {areas.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
             ) : (
                <input type="text" disabled className="peer w-full bg-slate-100 border border-slate-200 p-3 text-sm text-slate-400 outline-none transition-colors rounded cursor-not-allowed" placeholder="Area / Locality" />
             )}
            <label className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500">Area (Auto) *</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="relative">
            <input required type="text" readOnly value={city} id={`${id}-city`} className="peer w-full bg-slate-100 border border-slate-200 p-3 text-sm text-slate-600 outline-none rounded" placeholder="City" />
            <label htmlFor={`${id}-city`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">City (Auto) *</label>
          </div>
          <div className="relative">
            <input required type="text" readOnly value={state} id={`${id}-state`} className="peer w-full bg-slate-100 border border-slate-200 p-3 text-sm text-slate-600 outline-none rounded" placeholder="State" />
            <label htmlFor={`${id}-state`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">State (Auto) *</label>
          </div>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="relative">
    <select
      name="businessType"
      required
      defaultValue=""
      className="peer w-full bg-slate-50 border border-slate-200 focus:border-[#E31837] focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded appearance-none"
    >
      <option value="">Select Business Type</option>
      <option value="retailer">Retailer</option>
      <option value="dealer">Dealer</option>
      <option value="distributor">Distributor</option>
      <option value="contractor">Contractor</option>
      <option value="entrepreneur">New Entrepreneur</option>
      <option value="other">Other</option>
    </select>

    <label className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500">
      Business Type *
    </label>
  </div>
</div>
           <div className="relative">
            <input type="text" id={`${id}-gst`} className="peer w-full bg-slate-50 border border-slate-200 focus:border-[#E31837] focus:bg-white p-3 text-sm text-slate-900 outline-none transition-colors rounded" placeholder="GST Number (Optional)" />
            <label htmlFor={`${id}-gst`} className="absolute left-3 -top-2.5 bg-white px-1 text-[11px] font-bold text-slate-500 peer-focus:text-[#E31837] transition-all">GST Number</label>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full mt-8 bg-[#E31837] hover:bg-[#c6112d] active:scale-[0.98] text-white font-extrabold py-4 px-6 transition-all duration-300 flex items-center justify-between group rounded-lg shadow-lg shadow-red-500/10">
        <span className="tracking-widest uppercase text-xs">Become an Indus TMT Dealer Now</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </button>

      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" /> Secure Corporate Link</span>
        <span>ISO 27001 Compliant</span>
      </div>
    </form>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); 
  const [selectedTerritoryState, setSelectedTerritoryState] = useState("Karnataka");
  const [activeStage, setActiveStage] = useState(0); // State for Manufacturing Stages Slider
  
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitFormSubmitted, setExitFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseLeave = (e) => {
      if (e.clientY < 5) {
        const shown = sessionStorage.getItem('exitModalShown');
        if (!shown) {
          setShowExitModal(true);
          sessionStorage.setItem('exitModalShown', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToForm = () => {
    document.getElementById('application-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

const triggerBrochureDownload = () => {
  const link = document.createElement('a');
  link.href = '/Indus-Catalog.pdf';
  link.download = 'Indus-Catalog.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  
  return (
    <div className="font-sans text-slate-700 bg-white selection:bg-[#E31837] selection:text-white antialiased overflow-x-hidden">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      })}} />

      {/* --- FLOATING HEADER --- */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo Aligned Center vertically with Nav */}
          <div className="flex items-center">
            <img 
              src="Indus-logo.svg" 
              alt="Indus TMT Logo" 
              className="h-14 md:h-20 lg:h-24 w-auto object-contain" 
            />
          </div>

          {/* Desktop Navigation Aligned Right */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">Why Distributors Choose Us</a>
            <a href="#eligible" onClick={(e) => scrollToSection(e, 'eligible')} className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">Eligible Segments</a>
            <a href="#territories" onClick={(e) => scrollToSection(e, 'territories')} className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-[#E31837] transition-colors flex items-center gap-2 cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Open Territories
            </a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">FAQS</a>
            <button onClick={scrollToForm} className="bg-[#E31837] hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-widest px-6 py-3 transition-all duration-300 rounded shadow-md ml-2 cursor-pointer">
              Request Partnership
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button className="lg:hidden text-slate-900 hover:text-[#E31837] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
             <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="text-slate-800 text-xs font-bold uppercase tracking-widest cursor-pointer">Why Distributors Choose Us</a>
             <a href="#eligible" onClick={(e) => scrollToSection(e, 'eligible')} className="text-slate-800 text-xs font-bold uppercase tracking-widest cursor-pointer">Eligible Segments</a>
             <a href="#territories" onClick={(e) => scrollToSection(e, 'territories')} className="text-[#E31837] text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Open Territories
             </a>
             <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-slate-800 text-xs font-bold uppercase tracking-widest cursor-pointer">FAQS</a>
             <button onClick={() => { setIsMenuOpen(false); scrollToForm(); }} className="bg-[#E31837] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 mt-4 w-full rounded cursor-pointer">
               Request Partnership
             </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION (FIXED PADDING & ALIGNMENT) --- */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        {/* Abstract Fine Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E31837]/3 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="flex flex-col pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 backdrop-blur-md mb-8 self-start shadow-sm">
                <Sparkles className="w-4 h-4 text-[#E31837]" />
                <span className="text-slate-600 text-[10px] font-bold tracking-[0.25em] uppercase">Private Staging Platform 2026</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                Become an Authorized <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31837] to-red-800">Indus TMT Dealer</span>
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
                Expand your business with one of South India's trusted TMT steel brands. Offer premium-grade Fe-550D TMT bars preferred by builders, contractors, and infrastructure projects across the region.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={scrollToForm} className="bg-[#E31837] hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300 flex items-center justify-center group rounded shadow-lg shadow-red-500/10">
                  Join the Indus Dealer Network <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <a href="tel:+919242777777" className="bg-[#0F172A] hover:bg-[#1e293b] text-white font-black uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300 flex items-center justify-center rounded shadow-lg">
                  <Phone className="w-4 h-4 mr-2" /> Speak with a Dealer Expert
                </a>
              </div>
            </div>

            <div className="w-full" id="application-form-section">
              <LuxuryLeadForm buttonText="Acquire Partnership Package" id="hero-register" />
            </div>

          </div>
        </div>
      </section>

      {/* --- WHY DISTRIBUTORS PREFER INDUS TMT --- */}
      <section id="benefits" className="py-28 bg-[#FAFAFA] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31837]"></span>
              <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">Partnership Beyond Schemes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Why Leading Dealers Choose Indus</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              We believe in building enduring partnerships with our dealers. Our approach is founded on trust, mutual recognition, and consistent delivery extending far beyond conventional incentive schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg p-8 transition-all duration-300 rounded-xl relative group">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31837] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-12 h-12 rounded-lg bg-[#E31837]/5 flex items-center justify-center mb-6 border border-slate-200/60 group-hover:bg-[#E31837] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5 text-slate-800 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{benefit.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- GEOGRAPHIC TERRITORY BOARD --- */}
      <section id="territories" className="py-28 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 mb-4 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-emerald-600 text-xs font-bold tracking-[0.2em] uppercase">Live Allocation Map</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Open Territories for Dealership</h2>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-8">
                Explore real-time sector status across expansion markets in Southern India. We authorize exclusive monopolies per zip code cluster. We are currently actively expanding our elite network across all major districts of Karnataka and Tamil Nadu.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                    onClick={() => setSelectedTerritoryState('Karnataka')}
                    className={`px-6 py-3 font-bold rounded text-sm transition-all shadow-sm ${selectedTerritoryState === 'Karnataka' ? 'bg-[#E31837] text-white' : 'bg-slate-50 border border-slate-200 text-slate-800 hover:border-slate-300'}`}
                >
                  KARNATAKA SECTOR
                </button>
                <button 
                    onClick={() => setSelectedTerritoryState('Tamil Nadu')}
                    className={`px-6 py-3 font-bold rounded text-sm transition-all shadow-sm ${selectedTerritoryState === 'Tamil Nadu' ? 'bg-[#E31837] text-white' : 'bg-slate-50 border border-slate-200 text-slate-800 hover:border-slate-300'}`}
                >
                  TAMIL NADU SECTOR
                </button>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-10 shadow-xl relative">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-150">
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Regional Cluster Registry</span>
                  <span className="text-xs font-mono text-[#E31837] uppercase">{selectedTerritoryState} SECTOR</span>
                </div>

                <div className="space-y-4">
                  {TERRITORY_REGIONS[selectedTerritoryState].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200/60 rounded">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-slate-900 text-sm">{item.city}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-sm ${item.status.includes('Closed') ? 'bg-red-50 text-red-600 border border-red-200' : item.status.includes('Limited') ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <button onClick={scrollToForm} className="w-full bg-slate-900 hover:bg-[#E31837] text-white font-black uppercase tracking-widest text-xs py-3.5 px-6 transition-all rounded shadow">
                    RESERVE YOUR SLOT IN {selectedTerritoryState.toUpperCase()} TODAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US / MANUFACTURING STAGES (REPLACES OLD MASTERCLASS) --- */}
      <section id="about" className="py-28 border-t border-slate-100 bg-[#FAFAFA] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <div className="w-6 h-[1px] bg-[#E31837]"></div>
              <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">About Us</span>
              <div className="w-6 h-[1px] bg-[#E31837]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">Successful Since 1996</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light mb-8">
              We began our journey in 1996 with a vision to convert the blueprint of dreams into structures. Our state-of-art manufacturing unit at Hosur near Attibelle(Kn) well equipped with advanced computer controlled, mechanical & automated machinery combined with our innovations, commitment & reliability has delivered consistent & best quality steel much above BIS. We have been considered as No.1 brand in Karnataka by Individual building owners, bar benders, mason, contractors, structural engineers, architects & dealers as they are very happy with INDUS 555-D TMT.
            </p>
            <button onClick={triggerBrochureDownload} className="inline-flex items-center text-slate-900 font-bold tracking-widest text-xs uppercase hover:text-[#E31837] transition-all group border border-slate-300 bg-white px-6 py-3.5 rounded shadow-sm">
              <Download className="w-4 h-4 mr-2" /> Download Corporate Profile Document
            </button>
          </div>

          <div className="mt-20">
            <h3 className="text-3xl font-black text-center text-slate-900 mb-10">TMT Manufacturing Stages</h3>

            {/* Sync 2: Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {MANUFACTURING_STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 ${
                    activeStage === idx
                      ? 'border-[#E31837] bg-red-50 text-[#E31837] shadow-md scale-[1.02]'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:shadow-sm hover:text-slate-700'
                  }`}
                >
                  <stage.icon className={`w-8 h-8 mb-4 transition-colors ${activeStage === idx ? 'text-[#E31837]' : 'text-slate-400'}`} />
                  <h6 className={`font-bold text-sm tracking-wide text-center transition-colors ${activeStage === idx ? 'text-slate-900' : 'text-slate-600'}`}>
                    {stage.title}
                  </h6>
                </button>
              ))}
            </div>

            {/* Sync 1: Content Area */}
            <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-xl min-h-[450px] lg:min-h-[350px]">
              {MANUFACTURING_STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`absolute inset-0 w-full h-full p-8 md:p-12 transition-all duration-700 ease-in-out flex flex-col lg:flex-row items-center gap-10 ${
                    activeStage === idx ? 'opacity-100 translate-x-0 relative z-10' : 'opacity-0 translate-x-10 pointer-events-none absolute z-0'
                  }`}
                >
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">{stage.desc}</h4>
                  </div>
                  <div className="lg:w-1/2 w-full h-64 lg:h-full relative rounded-xl overflow-hidden shadow-inner bg-slate-100">
                     <img src={stage.image} alt={stage.title} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- WHO CAN APPLY SECTOR --- */}
      <section id="eligible" className="py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="flex flex-col">
              <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase mb-4 block self-start">Dealer Profile</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Eligible Commercial Segments</h2>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10">
                We select and approve high-growth entities with verified operational lines and substantial storage facilities.
              </p>

              <div className="space-y-5">
                {ELIGIBLE_LEFT.map((item, idx) => (
                  <div key={idx} className="p-6 md:p-8 bg-slate-50/50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:pt-[216px]">
              <div className="bg-slate-50/30 border border-slate-200 p-8 md:p-10 rounded-2xl shadow-sm">
                <span className="bg-[#E31837] text-white text-[11px] font-bold tracking-widest uppercase px-2 py-1 inline-block mb-8 rounded-sm">Dealer Verification Parameters</span>
                
                <div className="space-y-8">
                  {ELIGIBLE_RIGHT.map((item, idx) => (
                    <div key={idx} className="flex">
                      <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mr-5">
                        <Check className="w-6 h-6 text-[#E31837]" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- TIMELINE METRIC FLOW --- */}
      <section className="py-28 bg-[#FAFAFA] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Onboarding Path</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Operational Launch Sequencing</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              We expedite dealer licensing. Transition from registration to commercial logistics launch in 5 transparent operational phases.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[50px] left-10 right-10 h-[1px] bg-slate-200 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {ONBOARDING_TIMELINE.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-lg hover:border-slate-300 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-black text-[#E31837]">{item.step}</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-50 px-3 py-1 border border-slate-200 rounded-sm">{item.duration}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white border border-slate-200 px-8 py-5 rounded-xl max-w-2xl shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                “Our merchant commitment isn't just basic material supply. We design demand-generation protocols to drive sales volume directly for your warehouse.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- TRUST STATEMENT --- */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31837]"></span>
            <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">Trust Statement</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-2 max-w-4xl mx-auto">
            Built on Trust. Driven by Performance.
          </h2>
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Focused on Dealer Success</h3>
          <p className="text-lg font-bold text-[#E31837] tracking-widest uppercase mb-12">"INDUS INSIDE, PEACE OF MIND OUTSIDE"</p>

          <div className="pt-12 border-t border-slate-150 flex flex-wrap justify-center gap-6">
             <div className="px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm tracking-widest uppercase font-black shadow-sm flex items-center gap-2">
               <Award className="w-5 h-5 text-[#E31837]"/> ISO 9001:2015
             </div>
             <div className="px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm tracking-widest uppercase font-black shadow-sm flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-[#E31837]"/> BIS STANDARD IS 1786
             </div>
             <div className="px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm tracking-widest uppercase font-black shadow-sm flex items-center gap-2">
               <Zap className="w-5 h-5 text-[#E31837]"/> FE-550D HIGH-DUCTILITY
             </div>
          </div>
        </div>
      </section>

      {/* --- PRESETS & ACCORDION FAQS --- */}
      <section id="faq" className="py-28 bg-[#FAFAFA] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Institutional FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Dealership Protocols</h2>
          </div>

          <div className="border-t border-slate-200 space-y-2">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-7 flex justify-between items-center text-left hover:text-[#E31837] transition-colors group"
                >
                  <span className="text-lg md:text-xl font-bold tracking-tight text-slate-800 group-hover:text-[#E31837] transition-colors pr-6">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openFaq === idx ? 'rotate-180 text-[#E31837]' : 'text-slate-400'}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-550 ease-in-out ${openFaq === idx ? 'max-h-[300px] pb-7 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 leading-relaxed font-light text-base">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            <div className="md:col-span-7 lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <img src="Indus-logo.svg" alt="Indus TMT Logo" className="h-16 lg:h-20 w-auto object-contain" />
              </div>
              <p className="text-slate-500 font-light text-sm leading-relaxed max-w-sm mb-8">
                Pioneering regional structural reinforcement structures since 1996. We fabricate the high ductility steel that anchors commercial futures.
              </p>
            </div>
            
            <div className="md:col-span-5 lg:col-span-4">
              <h4 className="text-slate-800 text-xs font-bold tracking-[0.2em] uppercase mb-8">Corporate Operations</h4>
              <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                <li>Industrial Estate Cluster</li>
                <li>Bangalore, Karnataka</li>
                <li>India - 560001</li>
                <li className="pt-4 text-slate-900 font-black tracking-normal lowercase">enquiry@indussteels.com</li>
                <li className="text-slate-900 font-black tracking-normal lowercase">+91 9242777777</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-[9px] font-bold tracking-[0.3em] uppercase text-slate-400">
            <p>&copy; {new Date().getFullYear()} INDUS TMT INDUSTRIES LIMITED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-700 transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Terms of Operations</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ACTIONS --- */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a href="https://wa.me/919242777777" target="_blank" rel="noreferrer" className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* --- EXIT INTENT POPUP --- */}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 p-8 max-w-lg w-full rounded-2xl relative shadow-2xl">
            <button 
              onClick={() => setShowExitModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!exitFormSubmitted ? (
              <div>
                <span className="text-[#E31837] text-xs font-bold tracking-widest uppercase block mb-2">Priority Call Reservation</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Request a Rapid Callback</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Not ready to submit a full prospectus? Leave your contact details below to secure a brief callback window with our regional expansion director.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setExitFormSubmitted(true); }} className="space-y-4">
                  <input required type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-900 outline-none rounded focus:border-[#E31837] focus:bg-white" />
                  <input required type="tel" placeholder="Mobile Contact Number" className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-900 outline-none rounded focus:border-[#E31837] focus:bg-white" />
                  <button type="submit" className="w-full bg-[#E31837] hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs py-3.5 px-4 transition-colors rounded shadow-md">
                    Lock-In Callback Window
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Callback Secured</h4>
                <p className="text-slate-500 text-sm">We will contact you within the next operational dispatch cycle.</p>
                <button onClick={() => setShowExitModal(false)} className="mt-6 text-xs text-[#E31837] uppercase tracking-widest font-bold">Close Window</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
