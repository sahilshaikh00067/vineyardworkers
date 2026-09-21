import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ==========================================================================
   VINEYARD WORKER'S OF CHRIST CHURCH — Premium Website v2 (single file)
   Stack: React + Tailwind CSS (koi extra package nahi)
   Theme: Midnight Navy + Ivory + Champagne Gold + Stained-glass glow
   ========================================================================== */

/* ------------------------------ CONFIG ---------------------------------- */
const CONFIG = {
  name: "MANYX FINANCIAL SERVICES PRIVATE LIMITED",
  tagline: "Rooted in Christ. Growing in Love.",
  pastor: "Pastor David Samuel",
  phone: "+91 98765 43210",
  phone2: "+91 91234 56780",
  email: "info@vineyardworkerschurch.org",
  address: "Plot 21, Grace Lane, Andheri East, Mumbai, Maharashtra - 400069",
  whatsapp: "919876543210",
  serviceDay: 0,
  serviceHour: 10,
  serviceMinute: 0,
};

/* ------------------------------ IMAGES ---------------------------------- */
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const IDS = {
  church: "1438232992991-995b7058bbb3",
  cathedral: "1473177104440-ffee2f376098",
  worship: "1476234251651-f353703a034d",
  bible: "1504052434569-70ad5836ab65",
  community: "1511632765486-a01980e01a18",
  friends: "1522202176988-66273c2fd55f",
  cross: "1510936111840-65e151ad71bb",
  vineyard: "1474722883778-792e7990302f",
  vineyard2: "1560493676-04071c5f467b",
  sunset: "1490730141103-6cac27aaab94",
  pray: "1544027993-37dbfe43562a",
  kids: "1503454537195-1dcabb73ffb9",
  crowd: "1529070538774-1843cb3265df",
  altar: "1507692049790-de58290a4334",
  window: "1478147427282-58a87a120781",
  pews: "1445445290350-18a3b86e0b5a",
  hands: "1519491050282-cf00c82424b4",
  steeple: "1455849318743-b2233052fcff",
  mountain: "1506905925346-21bda4d32df4",
  field: "1500382017468-9049fed747ef",
  choir: "1516450360452-9312f5e86fc7",
  family: "1541364983171-a8ba01e95cfc",
};
const IMG = Object.fromEntries(Object.entries(IDS).map(([k, v]) => [k, u(v)]));
IMG.pastor = u("1500648767791-00dcc994a43e", 900);
IMG.p1 = u("1507003211169-0a1dd7228f2d", 300);
IMG.p2 = u("1494790108377-be9c29b29330", 300);
IMG.p3 = u("1500648767791-00dcc994a43e", 300);
IMG.p4 = u("1438761681033-6461ffad8d80", 300);

/* ------------------------------ VIDEOS ---------------------------------- */
// src = direct .mp4  |  yt = YouTube video ID
const V1 = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const V2 = "https://www.w3schools.com/html/mov_bbb.mp4";
const V3 = "https://www.w3schools.com/html/movie.mp4";
const VIDEOS = [
  { title: "Abide in the Vine", who: "Pastor David Samuel", dur: "42:10", cat: "Sermons", poster: IMG.bible, src: V1, yt: "" },
  { title: "Faith That Moves Mountains", who: "Guest Speaker", dur: "35:48", cat: "Sermons", poster: IMG.mountain, src: V2, yt: "" },
  { title: "Sunday Praise Medley", who: "Worship Team", dur: "18:22", cat: "Worship", poster: IMG.worship, src: V3, yt: "" },
  { title: "A Night of Worship", who: "Choir & Band", dur: "28:15", cat: "Worship", poster: IMG.crowd, src: V1, yt: "" },
  { title: "From Darkness to Light", who: "Grace Thomas", dur: "06:40", cat: "Testimonies", poster: IMG.p2, src: V2, yt: "" },
  { title: "God Healed Our Family", who: "The Peter Family", dur: "08:05", cat: "Testimonies", poster: IMG.family, src: V3, yt: "" },
];
const VIDEO_TABS = ["All", "Sermons", "Worship", "Testimonies"];

/* ------------------------------ DATA ------------------------------------ */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Give", href: "#give" },
  { label: "Contact", href: "#contact" },
];

const SLIDES = [
  { img: IMG.church, title: "A Place to Belong, a Faith to Grow", text: "Step into a church family where every heart finds a home and every life finds purpose in Jesus Christ." },
  { img: IMG.worship, title: "Worship in Spirit and in Truth", text: "Lift your voice with us as we celebrate the goodness of God through praise, music and prayer." },
  { img: IMG.altar, title: "Hear the Word, Live the Word", text: "Bible-centered teaching that strengthens your faith and equips you for everyday life." },
  { img: IMG.community, title: "Serve, Love and Transform", text: "Together we carry the light of Christ into our homes, our city and our world." },
  { img: IMG.window, title: "Every Sunday, a New Beginning", text: "Join us this Sunday. Come as you are, leave with hope." },
];

const STATS = [
  { end: 500, suffix: "+", label: "Church Members" },
  { end: 15, suffix: "+", label: "Years of Ministry" },
  { end: 12, suffix: "", label: "Active Ministries" },
  { end: 1000, suffix: "+", label: "Lives Touched" },
];

const SERVICES = [
  { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
  { day: "Wednesday", name: "Bible Study", time: "7:00 PM" },
  { day: "Friday", name: "Prayer Night", time: "7:30 PM" },
  { day: "Saturday", name: "Youth Fellowship", time: "5:00 PM" },
];

const MINISTRIES = [
  { title: "Worship & Praise", icon: "music", img: IMG.choir, text: "Choir, band and worship leaders leading the church into God's presence." },
  { title: "Youth Ministry", icon: "users", img: IMG.friends, text: "A vibrant community where young people grow in faith and purpose." },
  { title: "Children's Ministry", icon: "star", img: IMG.kids, text: "Sunday school, stories and songs that plant Jesus' love in little hearts." },
  { title: "Prayer Ministry", icon: "heart", img: IMG.pray, text: "Intercessors who stand in the gap for families, city and nation." },
  { title: "Bible Study", icon: "book", img: IMG.bible, text: "Small groups and midweek studies that make Scripture clear and practical." },
  { title: "Women's Fellowship", icon: "heart", img: IMG.p4, text: "Encouragement, mentoring and friendship for women of every season." },
  { title: "Men's Fellowship", icon: "users", img: IMG.crowd, text: "Brothers building each other up as husbands, fathers and leaders." },
  { title: "Outreach & Charity", icon: "cross", img: IMG.community, text: "Feeding, visiting and serving the needy in the name of Christ." },
];

const VERSES = [
  { t: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit.", r: "John 15:5" },
  { t: "The Lord is my shepherd; I shall not want.", r: "Psalm 23:1" },
  { t: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", r: "Matthew 11:28" },
  { t: "I can do all things through Christ which strengtheneth me.", r: "Philippians 4:13" },
  { t: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil.", r: "Jeremiah 29:11" },
];

const inDays = (n, h = 18, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(h, m, 0, 0);
  return d;
};
const nextService = () => {
  const now = new Date();
  const d = new Date(now);
  d.setHours(CONFIG.serviceHour, CONFIG.serviceMinute, 0, 0);
  d.setDate(now.getDate() + ((CONFIG.serviceDay - now.getDay() + 7) % 7));
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7);
  return d;
};

const EVENTS = [
  { title: "Night of Worship", cat: "Worship", date: inDays(9, 18), img: IMG.crowd, text: "An evening of uninterrupted praise, testimonies and prayer." },
  { title: "Youth Conference", cat: "Youth", date: inDays(18, 9), img: IMG.friends, text: "Two days of teaching, games and life-changing encounters." },
  { title: "Family Fellowship Day", cat: "Community", date: inDays(27, 10), img: IMG.vineyard, text: "Games, food and fellowship for every family in the church." },
  { title: "Christmas Carol Service", cat: "Celebration", date: inDays(45, 18, 30), img: IMG.window, text: "Carols, candlelight and the story of Christ's birth." },
];

const GALLERY = [
  { img: IMG.church, cat: "Sanctuary", r: "aspect-[3/4]" },
  { img: IMG.worship, cat: "Worship", r: "aspect-square" },
  { img: IMG.kids, cat: "Kids", r: "aspect-[4/3]" },
  { img: IMG.cathedral, cat: "Sanctuary", r: "aspect-[4/3]" },
  { img: IMG.pray, cat: "Worship", r: "aspect-[3/4]" },
  { img: IMG.community, cat: "Community", r: "aspect-square" },
  { img: IMG.vineyard, cat: "Nature", r: "aspect-[3/4]" },
  { img: IMG.crowd, cat: "Worship", r: "aspect-[4/3]" },
  { img: IMG.window, cat: "Sanctuary", r: "aspect-square" },
  { img: IMG.friends, cat: "Community", r: "aspect-[4/3]" },
  { img: IMG.family, cat: "Kids", r: "aspect-[3/4]" },
  { img: IMG.sunset, cat: "Nature", r: "aspect-[4/3]" },
  { img: IMG.altar, cat: "Sanctuary", r: "aspect-[3/4]" },
  { img: IMG.choir, cat: "Worship", r: "aspect-square" },
  { img: IMG.field, cat: "Nature", r: "aspect-square" },
  { img: IMG.hands, cat: "Community", r: "aspect-[3/4]" },
];
const GAL_TABS = ["All", "Worship", "Sanctuary", "Community", "Kids", "Nature"];

const STRIP = [IMG.church, IMG.steeple, IMG.worship, IMG.pews, IMG.kids, IMG.altar, IMG.crowd, IMG.window, IMG.vineyard2, IMG.hands];
const STRIP2 = [IMG.cathedral, IMG.pray, IMG.friends, IMG.mountain, IMG.choir, IMG.community, IMG.cross, IMG.family, IMG.sunset, IMG.bible];

const TESTIMONIALS = [
  { name: "Grace Thomas", role: "Member since 2012", img: IMG.p2, text: "This church became my family. Every Sunday I leave with a lighter heart and a stronger faith." },
  { name: "Samuel Peter", role: "Youth Leader", img: IMG.p1, text: "The youth ministry helped me find my calling. The love and guidance here are truly genuine." },
  { name: "Ruth David", role: "Prayer Team", img: IMG.p4, text: "I have seen prayers answered here in ways I never imagined. God is truly at work in this place." },
  { name: "Daniel Joseph", role: "New Member", img: IMG.p3, text: "From my first visit I felt welcomed. The teaching is deep, practical and full of grace." },
];

const FAQS = [
  ["What time are the Sunday services?", "Our Sunday Morning Worship begins at 10:00 AM. Please arrive 10 minutes early so we can welcome you."],
  ["What should I wear?", "Come as you are. You will see everything from formal wear to casual clothes. What matters is that you are here."],
  ["Is there something for my children?", "Yes. Our Children's Ministry runs during the Sunday service with age-based classes, songs and stories in a safe environment."],
  ["How can I request prayer?", "Use the prayer request form in the Contact section, or message us on WhatsApp. Our prayer team responds with care."],
  ["How can I give or support the church?", "Visit the Give section and send us a message. Our church office will share the giving details with you."],
];

const LEGAL = {
  privacy: {
    title: "Privacy Policy",
    updated: "21 September 2026",
    sections: [
      ["1. Introduction", `${CONFIG.name} ("we", "our", "us") respects your privacy. This policy explains what information we collect through this website, how we use it and the choices you have.`],
      ["2. Information We Collect", "We collect information you choose to give us, such as your name, phone number, email address and message when you send a prayer request, enquiry or giving intent. We may also collect basic technical data such as browser type and pages visited to improve the website."],
      ["3. How We Use Your Information", "We use your information to respond to your requests, pray with you, share church updates you asked for, organise events and improve our website. We do not sell your personal information."],
      ["4. WhatsApp and Third-Party Services", "When you submit a form, your message may open in WhatsApp so you can send it to our church office. WhatsApp, embedded maps and videos are provided by third parties and are governed by their own privacy policies."],
      ["5. Cookies", "This website may use cookies or similar technologies to keep the site working properly and to understand general usage. You can control cookies through your browser settings."],
      ["6. Data Security", "We take reasonable steps to protect your information. However, no method of transmission over the internet is completely secure, so we cannot guarantee absolute security."],
      ["7. Children's Privacy", "We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child has shared information with us, please contact us and we will remove it."],
      ["8. Your Rights", "You may ask us to access, correct or delete the personal information we hold about you by contacting us at the details below."],
      ["9. Changes to This Policy", "We may update this policy from time to time. The latest version will always be available on this website with the updated date."],
      ["10. Contact Us", `${CONFIG.name}, ${CONFIG.address}. Phone: ${CONFIG.phone}. Email: ${CONFIG.email}.`],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "21 September 2026",
    sections: [
      ["1. Acceptance of Terms", `By using the website of ${CONFIG.name}, you agree to these Terms & Conditions. If you do not agree, please do not use the website.`],
      ["2. Use of the Website", "You agree to use this website only for lawful purposes and in a way that does not harm others or disrupt the site. You must not misuse forms, attempt unauthorised access or post offensive or misleading content."],
      ["3. Content and Ownership", "All text, images, videos, logos and design on this website belong to the church or are used with permission. You may not copy, sell or reuse them without written consent, except for personal, non-commercial sharing of sermons and events."],
      ["4. Prayer Requests and Enquiries", "Prayer requests and messages you send are voluntary. We will handle them with care and respect, but we cannot promise a specific reply time or outcome."],
      ["5. Giving and Offerings", "Any giving intent sent through this website is a voluntary gift. Final giving details are shared directly by the church office. Please verify all payment details with the office before sending money."],
      ["6. Events and Services", "Dates, times and programmes may change without notice. Please check with us if you are planning to attend a particular event."],
      ["7. Third-Party Links and Media", "This website may link to or embed third-party content such as maps, videos and social media. We are not responsible for their content or practices."],
      ["8. Disclaimer", "Content on this website is shared for spiritual encouragement and information. It is provided as is, without warranties of any kind. It is not a substitute for professional medical, legal, financial or counselling advice."],
      ["9. Limitation of Liability", "To the fullest extent permitted by law, the church and its team are not liable for any loss or damage arising from the use of this website."],
      ["10. Governing Law", "These terms are governed by the laws of India. Any dispute will be subject to the courts of Mumbai, Maharashtra."],
      ["11. Contact Us", `Questions about these terms? Contact ${CONFIG.name}, ${CONFIG.address}. Phone: ${CONFIG.phone}. Email: ${CONFIG.email}.`],
    ],
  },
};

/* ------------------------------ ICONS ----------------------------------- */
const PATHS = {
  play: "M8 5v14l11-7z",
  left: "M15 18l-6-6 6-6",
  right: "M9 18l6-6-6-6",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  clock: "M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6",
  up: "M18 15l-6-6-6 6",
  down: "M6 9l6 6 6-6",
  arrow: "M5 12h14M12 5l7 7-7 7",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14zM20 17v4H6.5A2.5 2.5 0 014 18.5",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  instagram: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM16 11.4a4 4 0 11-7.9 1.2 4 4 0 017.9-1.2zM17.5 6.5h.01",
  youtube: "M22.5 6.4a2.8 2.8 0 00-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 00-2 2C1 8.1 1 12 1 12s0 3.9.5 5.6a2.8 2.8 0 002 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 002-2c.5-1.7.5-5.6.5-5.6s0-3.9-.5-5.6zM9.7 15.5v-7l6 3.5z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  check: "M20 6L9 17l-5-5",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h8",
};
const Icon = ({ name, className = "w-5 h-5", fill = false }) => (
  <svg viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);
const Cross = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" />
  </svg>
);

/* ------------------------------ HELPERS --------------------------------- */
const GOLD_GRAD = "bg-gradient-to-r from-[#f0dc9e] via-[#c9a24b] to-[#9a7628]";
const GOLD_TEXT = `${GOLD_GRAD} bg-clip-text text-transparent`;
const pad = (n) => String(n).padStart(2, "0");

const Img = ({ src, alt = "", className = "", ...rest }) => {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (err) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#1c2c66] via-[#101c44] to-[#0a1330] flex items-center justify-center`} role="img" aria-label={alt}>
        <Cross className="w-10 h-10 text-[#c9a24b]/40" />
      </div>
    );
  }
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} onLoad={() => setLoaded(true)} className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} {...rest} />
  );
};

const Reveal = ({ children, delay = 0, dir = "up", className = "" }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const from = { up: "translate-y-12", left: "-translate-x-12", right: "translate-x-12", zoom: "scale-90" }[dir];
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-[1100ms] ease-out ${v ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${from}`} ${className}`}>
      {children}
    </div>
  );
};

const Counter = ({ end, suffix = "", duration = 2200 }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

function useCountdown(target) {
  const calc = () => {
    const d = Math.max(0, target.getTime() - Date.now());
    return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line
  }, [target]);
  return t;
}
function useNextService() {
  const target = useMemo(() => nextService(), []);
  return { target, t: useCountdown(target) };
}

const SectionTitle = ({ title, sub, dark = false }) => (
  <Reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
    <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight ${dark ? "text-white" : "text-[#0a1330]"}`}>{title}</h2>
    <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a24b]" />
      <Cross className="w-4 h-4 text-[#c9a24b]" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a24b]" />
    </div>
    {sub && <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-white/65" : "text-[#0a1330]/65"}`}>{sub}</p>}
  </Reveal>
);

/* ------------------------------ STYLES ---------------------------------- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',system-ui,sans-serif;background:#f8f4ea;color:#0a1330;overflow-x:hidden;-webkit-font-smoothing:antialiased}
    .font-display{font-family:'Playfair Display',Georgia,serif}
    ::selection{background:#c9a24b;color:#0a1330}
    ::-webkit-scrollbar{width:9px}::-webkit-scrollbar-track{background:#0a1330}
    ::-webkit-scrollbar-thumb{background:linear-gradient(#e9cf8a,#c9a24b);border-radius:9px}

    @keyframes kenburns{from{transform:scale(1)}to{transform:scale(1.16) translate(-1.5%,-1%)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes progress{from{width:0}to{width:100%}}
    @keyframes ringfill{from{stroke-dashoffset:125.66}to{stroke-dashoffset:0}}
    @keyframes tick{from{transform:translateY(-30%);opacity:0}to{transform:none;opacity:1}}
    @keyframes glow{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.9;transform:scale(1.2)}}
    @keyframes spinSlow{to{transform:rotate(360deg)}}
    @keyframes shine{from{transform:translateX(-120%) skewX(-20deg)}to{transform:translateX(260%) skewX(-20deg)}}
    @keyframes pulseRing{0%{transform:scale(.9);opacity:.7}100%{transform:scale(1.9);opacity:0}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.15)}}

    .anim-kenburns{animation:kenburns 9s ease-out forwards}
    .anim-fadeup{animation:fadeUp 1s cubic-bezier(.2,.7,.2,1) both}
    .anim-float{animation:float 5s ease-in-out infinite}
    .anim-marquee{animation:marquee 55s linear infinite}
    .anim-marquee-rev{animation:marquee 60s linear infinite reverse}
    .marquee-wrap:hover .anim-marquee,.marquee-wrap:hover .anim-marquee-rev{animation-play-state:paused}
    .anim-progress{animation-name:progress;animation-timing-function:linear;animation-fill-mode:forwards}
    .anim-ringfill{animation-name:ringfill;animation-timing-function:linear;animation-fill-mode:forwards}
    .anim-tick{animation:tick .5s ease both}
    .anim-glow{animation:glow 3.5s ease-in-out infinite}
    .anim-spin-slow{animation:spinSlow 40s linear infinite}
    .anim-pulse-ring{animation:pulseRing 2.4s ease-out infinite}
    .anim-fadein{animation:fadeIn .5s ease both}
    .anim-blob{animation:blob 12s ease-in-out infinite}
    .btn-shine{position:relative;overflow:hidden}
    .btn-shine::after{content:"";position:absolute;top:0;left:0;width:40%;height:100%;background:rgba(255,255,255,.4);transform:translateX(-120%) skewX(-20deg)}
    .btn-shine:hover::after{animation:shine .9s ease}
    @media (prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
    }
  `}</style>
);

/* ------------------------------ PRELOADER ------------------------------- */
const Preloader = ({ show }) => (
  <div className={`fixed inset-0 z-[100] flex ${show ? "" : "pointer-events-none"}`}>
    <div className={`w-1/2 h-full bg-[#0a1330] transition-transform duration-[1200ms] ease-in-out ${show ? "" : "-translate-x-full"}`} />
    <div className={`w-1/2 h-full bg-[#0a1330] transition-transform duration-[1200ms] ease-in-out ${show ? "" : "translate-x-full"}`} />
    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#c9a24b]/30 blur-2xl anim-glow" />
        <Cross className="relative w-16 h-16 text-[#e9cf8a] anim-float" />
      </div>
      <h2 className="mt-8 font-display text-2xl sm:text-3xl tracking-[0.15em] text-white/90 text-center px-6">Vineyard Worker's of Christ Church</h2>
      <div className="mt-6 w-52 h-px bg-white/10 overflow-hidden">
        <div className={`h-full ${GOLD_GRAD} anim-progress`} style={{ animationDuration: "1.8s" }} />
      </div>
    </div>
  </div>
);

/* ------------------------------ HEADER ---------------------------------- */
const Header = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* top bar */}
        <div className={`hidden md:block overflow-hidden bg-[#060b20] border-b border-white/10 transition-all duration-500 ${scrolled ? "max-h-0" : "max-h-12"}`}>
          <div className="max-w-7xl mx-auto px-5 h-11 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-6">
              <a href={`tel:${CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#e9cf8a] transition"><Icon name="phone" className="w-3.5 h-3.5 text-[#c9a24b]" />{CONFIG.phone}</a>
              <a href={`mailto:${CONFIG.email}`} className="flex items-center gap-2 hover:text-[#e9cf8a] transition"><Icon name="mail" className="w-3.5 h-3.5 text-[#c9a24b]" />{CONFIG.email}</a>
            </div>
            <p className="hidden lg:flex items-center gap-2"><Icon name="pin" className="w-3.5 h-3.5 text-[#c9a24b]" />{CONFIG.address}</p>
          </div>
        </div>

        <div className={`transition-all duration-500 ${scrolled ? "py-3 bg-[#0a1330]/90 backdrop-blur-xl border-b border-[#c9a24b]/25 shadow-[0_10px_40px_rgba(0,0,0,.35)]" : "py-4 sm:py-5 bg-transparent"}`}>
          <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group" aria-label={CONFIG.name}>
              <span className={`w-11 h-11 rounded-full ${GOLD_GRAD} flex items-center justify-center text-[#0a1330] shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000`}>
                <Cross className="w-5 h-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg sm:text-xl font-semibold text-white">Vineyard Worker's</span>
                <span className="block text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#e9cf8a]">of Christ Church</span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="relative text-sm text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 hover:after:w-full after:bg-[#c9a24b] after:transition-all after:duration-300">{n.label}</a>
              ))}
            </nav>

            <a href="#give" className={`hidden lg:inline-flex btn-shine items-center gap-2 rounded-full ${GOLD_GRAD} px-6 py-2.5 text-sm font-semibold text-[#0a1330] hover:shadow-[0_0_30px_rgba(201,162,75,.5)] hover:scale-105 transition-all duration-300`}>
              <Icon name="heart" className="w-4 h-4" /> Give
            </a>

            <button onClick={() => setOpen(!open)} className="lg:hidden w-11 h-11 rounded-full border border-[#c9a24b]/50 flex items-center justify-center text-[#e9cf8a] hover:bg-[#c9a24b]/10 transition" aria-label="Toggle menu" aria-expanded={open}>
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div className={`lg:hidden fixed inset-0 z-40 bg-[#0a1330]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-5 transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {NAV.map((n, i) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }} className={`font-display text-3xl text-white hover:text-[#e9cf8a] transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>{n.label}</a>
        ))}
      </div>
    </>
  );
};

/* ------------------------------ HERO ------------------------------------ */
const SLIDE_MS = 7000;
const Hero = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const next = useCallback(() => setI((p) => (p + 1) % n), [n]);
  const prev = () => setI((p) => (p - 1 + n) % n);
  const { t } = useNextService();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#0a1330] pt-36 pb-40" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* stained glass glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="anim-blob absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#8f1d3a]/40 blur-[130px]" />
        <div className="anim-blob absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-[#2b4fa8]/40 blur-[140px]" style={{ animationDelay: "-4s" }} />
        <div className="anim-blob absolute -bottom-40 left-1/3 w-[460px] h-[460px] rounded-full bg-[#c9a24b]/20 blur-[130px]" style={{ animationDelay: "-8s" }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#e9cf8a 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
        {/* text */}
        <div key={i} className="order-2 lg:order-1 text-center lg:text-left">
          <div className="anim-fadeup inline-flex items-center gap-3 rounded-full border border-[#c9a24b]/40 bg-white/5 backdrop-blur px-4 py-2 text-xs sm:text-sm text-[#e9cf8a]" style={{ animationDelay: ".1s" }}>
            <Cross className="w-3.5 h-3.5" /> {CONFIG.tagline}
          </div>
          <h1 className="anim-fadeup mt-6 font-display text-4xl sm:text-6xl xl:text-7xl font-semibold leading-[1.05] text-white" style={{ animationDelay: ".25s" }}>{SLIDES[i].title}</h1>
          <p className="anim-fadeup mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-white/70" style={{ animationDelay: ".45s" }}>{SLIDES[i].text}</p>
          <div className="anim-fadeup mt-9 flex flex-wrap justify-center lg:justify-start gap-4" style={{ animationDelay: ".65s" }}>
            <a href="#events" className={`btn-shine inline-flex items-center gap-2 rounded-full ${GOLD_GRAD} px-8 py-3.5 font-semibold text-[#0a1330] hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,75,.55)] transition-all duration-300`}>
              Plan Your Visit <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="#sermons" className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 backdrop-blur px-7 py-3.5 font-medium text-white hover:bg-white/15 hover:border-[#c9a24b] transition-all duration-300">
              <span className="relative flex w-8 h-8 items-center justify-center rounded-full bg-[#c9a24b] text-[#0a1330]">
                <span className="absolute inset-0 rounded-full border border-[#c9a24b] anim-pulse-ring" />
                <Icon name="play" className="w-3.5 h-3.5 ml-0.5" fill />
              </span>
              Watch Sermons
            </a>
          </div>

          {/* controls */}
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-5">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center hover:bg-[#c9a24b] hover:text-[#0a1330] hover:border-[#c9a24b] transition-all" aria-label="Previous slide"><Icon name="left" /></button>
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 44 44" className="w-14 h-14 -rotate-90" aria-hidden="true">
                <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,.18)" strokeWidth="2" fill="none" />
                <circle key={i} onAnimationEnd={next} cx="22" cy="22" r="20" stroke="#e9cf8a" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="125.66" strokeDashoffset="125.66" className="anim-ringfill" style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-white">{pad(i + 1)}</span>
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center hover:bg-[#c9a24b] hover:text-[#0a1330] hover:border-[#c9a24b] transition-all" aria-label="Next slide"><Icon name="right" /></button>
          </div>
        </div>

        {/* arch slider */}
        <div className="order-1 lg:order-2 relative mx-auto w-full max-w-sm sm:max-w-md">
          <div className="absolute -inset-5 rounded-t-full border border-dashed border-[#c9a24b]/50 anim-spin-slow" aria-hidden="true" />
          <div className="relative aspect-[3/4] rounded-t-full rounded-b-[2.5rem] overflow-hidden border-2 border-[#c9a24b] shadow-[0_40px_100px_rgba(0,0,0,.6)]">
            {SLIDES.map((s, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-[1400ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
                <Img src={s.img} alt={s.title} loading="eager" className={`w-full h-full object-cover ${idx === i ? "anim-kenburns" : ""}`} />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1330]/80 via-transparent to-transparent" />
          </div>

          {/* floating countdown card */}
          <div className="absolute -bottom-6 -left-4 sm:-left-12 rounded-2xl bg-white text-[#0a1330] shadow-2xl px-5 py-4 anim-float">
            <p className="text-xs text-[#0a1330]/60">Next service in</p>
            <p className="font-display text-2xl font-semibold tabular-nums">{t.d}d : {pad(t.h)}h : {pad(t.m)}m : {pad(t.s)}s</p>
          </div>
          <div className={`absolute top-10 -right-3 sm:-right-10 rounded-2xl ${GOLD_GRAD} text-[#0a1330] px-5 py-3 shadow-2xl`}>
            <p className="font-display text-2xl font-semibold leading-none">Sundays</p>
            <p className="text-sm font-medium">10:00 AM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ SERVICE BAND ---------------------------- */
const TimeBox = ({ v, l }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-[64px] h-[78px] sm:w-24 sm:h-28 rounded-2xl bg-white/[0.06] border border-[#c9a24b]/40 flex items-center justify-center overflow-hidden">
      <span key={v} className="anim-tick font-display text-4xl sm:text-5xl font-semibold text-[#e9cf8a]">{pad(v)}</span>
      <div className="absolute inset-x-0 top-1/2 h-px bg-black/40" />
    </div>
    <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60">{l}</span>
  </div>
);

const ServiceBand = () => {
  const { target, t } = useNextService();
  return (
    <div className="relative z-30 -mt-24 max-w-6xl mx-auto px-5">
      <Reveal dir="zoom">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#14245a] to-[#0a1330] border border-[#c9a24b]/40 shadow-[0_30px_90px_rgba(10,19,48,.5)] p-6 sm:p-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">Our Next Gathering Begins In</h2>
            <p className="mt-2 text-sm text-white/55">{target.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}, {target.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <div className="mt-6 flex justify-center lg:justify-start gap-3 sm:gap-4">
              <TimeBox v={t.d} l="Days" /><TimeBox v={t.h} l="Hours" /><TimeBox v={t.m} l="Mins" /><TimeBox v={t.s} l="Secs" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {SERVICES.map((s) => (
              <div key={s.day} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 hover:border-[#c9a24b] hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
                <p className="text-xs text-[#e9cf8a]">{s.day}</p>
                <p className="font-display text-xl sm:text-2xl text-white mt-1 leading-tight">{s.name}</p>
                <p className="mt-2 text-sm text-white/70 flex items-center gap-2"><Icon name="clock" className="w-4 h-4 text-[#c9a24b]" />{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

/* ------------------------------ ABOUT ----------------------------------- */
const Tile = ({ src, h, arch = false }) => (
  <div className={`group relative ${h} overflow-hidden border border-[#c9a24b]/40 shadow-xl ${arch ? "rounded-t-full rounded-b-3xl" : "rounded-3xl"}`}>
    <Img src={src} alt="Church" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1330]/40 to-transparent" />
  </div>
);

const About = () => (
  <section id="about" className="relative py-24 sm:py-32 bg-[#f8f4ea] overflow-hidden">
    <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#c9a24b]/15 blur-[100px]" aria-hidden="true" />
    <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
      <Reveal dir="left" className="grid grid-cols-2 gap-4 max-w-lg mx-auto w-full">
        <div className="space-y-4"><Tile src={IMG.cathedral} h="h-72 sm:h-80" arch /><Tile src={IMG.kids} h="h-44 sm:h-52" /></div>
        <div className="space-y-4 pt-12"><Tile src={IMG.pray} h="h-44 sm:h-52" /><Tile src={IMG.vineyard} h="h-72 sm:h-80" /></div>
      </Reveal>

      <div>
        <Reveal><h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#0a1330]">A Church Planted by God, Watered by Prayer</h2></Reveal>
        <Reveal delay={150}>
          <p className="mt-6 text-[#0a1330]/70 text-lg leading-relaxed">Jesus said, "I am the vine, you are the branches." At Vineyard Worker's of Christ Church we are workers in His vineyard, called to love God, serve people and bear lasting fruit. Whether you are new to faith or have walked with Christ for years, there is a seat for you here.</p>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[["Our Mission", "To share the gospel of Jesus Christ and raise disciples who transform lives."], ["Our Vision", "A united family of believers shining the light of Christ in every home."]].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white border border-[#c9a24b]/30 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#c9a24b] transition-all duration-500">
                <h3 className="font-display text-2xl font-semibold text-[#0a1330]">{t}</h3>
                <p className="mt-2 text-sm text-[#0a1330]/65 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={350}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl sm:text-5xl font-semibold text-[#9a7628]"><Counter end={s.end} suffix={s.suffix} /></p>
                <p className="mt-1 text-xs sm:text-sm text-[#0a1330]/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ------------------------------ PASTOR ---------------------------------- */
const Pastor = () => (
  <section className="relative py-24 sm:py-28 bg-[#efe7d3] overflow-hidden">
    <Cross className="absolute -left-10 top-10 w-64 h-64 text-[#c9a24b]/10" />
    <div className="relative max-w-6xl mx-auto px-5 grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
      <Reveal dir="left" className="relative mx-auto w-full max-w-xs">
        <div className="absolute -inset-3 rounded-t-full border border-[#c9a24b]/60" aria-hidden="true" />
        <div className="relative aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl group">
          <Img src={IMG.pastor} alt={CONFIG.pastor} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms]" />
        </div>
      </Reveal>
      <Reveal dir="right">
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0a1330]">A Message from Our Pastor</h2>
        <p className="mt-6 font-display italic text-2xl sm:text-3xl leading-snug text-[#0a1330]/85">"Church is not a building we visit. It is a family we belong to. Wherever you are on your journey, you are loved, you are wanted and there is a place for you here."</p>
        <p className="mt-6 text-[#0a1330]/70 leading-relaxed">We are praying that you will meet Jesus in a fresh way and find lasting friendships in this community.</p>
        <div className="mt-8 flex items-center gap-4">
          <span className={`h-px w-14 ${GOLD_GRAD}`} />
          <div>
            <p className="font-display text-2xl text-[#0a1330]">{CONFIG.pastor}</p>
            <p className="text-sm text-[#9a7628]">Senior Pastor</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------ MINISTRIES ------------------------------ */
const Ministries = () => (
  <section id="ministries" className="relative py-24 sm:py-32 bg-[#0a1330] overflow-hidden">
    <div className="absolute top-20 -left-40 w-[460px] h-[460px] rounded-full bg-[#8f1d3a]/25 blur-[130px] anim-blob" aria-hidden="true" />
    <div className="absolute bottom-0 -right-40 w-[460px] h-[460px] rounded-full bg-[#2b4fa8]/30 blur-[130px] anim-blob" aria-hidden="true" />
    <div className="relative max-w-7xl mx-auto px-5">
      <SectionTitle dark title="Ways to Grow and Serve" sub="Find your place in the vineyard. There is a ministry for every age and every calling." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MINISTRIES.map((m, k) => (
          <Reveal key={m.title} delay={(k % 4) * 120}>
            <article className="group h-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-[#c9a24b] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(201,162,75,.18)] transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <Img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1300ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1330] to-transparent" />
                <span className={`absolute -bottom-5 left-5 w-12 h-12 rounded-2xl ${GOLD_GRAD} text-[#0a1330] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                  <Icon name={m.icon} className="w-5 h-5" />
                </span>
              </div>
              <div className="p-6 pt-9">
                <h3 className="font-display text-2xl font-semibold text-white">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{m.text}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm text-[#e9cf8a] group-hover:gap-3 transition-all">Join <Icon name="arrow" className="w-4 h-4" /></a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------ IMAGE STRIPS ---------------------------- */
const StripRow = ({ list, rev }) => {
  const row = [...list, ...list];
  return (
    <div className="marquee-wrap overflow-hidden py-2">
      <div className={`${rev ? "anim-marquee-rev" : "anim-marquee"} flex w-max gap-4`}>
        {row.map((src, k) => (
          <div key={k} className="group w-56 sm:w-72 h-40 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#c9a24b]/30">
            <Img src={src} alt="Church life" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Strips = () => (
  <section className="relative py-20 sm:py-24 bg-[#f8f4ea] overflow-hidden">
    <SectionTitle title="Life at the Vineyard" sub="Worship, fellowship, children and creation. This is the everyday story of our church." />
    <StripRow list={STRIP} />
    <StripRow list={STRIP2} rev />
  </section>
);

/* ------------------------------ VIDEOS ---------------------------------- */
const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return;
    const on = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [video, onClose]);
  if (!video) return null;
  return (
    <div className="anim-fadein fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-[#0a1330] text-white flex items-center justify-center transition" aria-label="Close video"><Icon name="close" /></button>
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video rounded-2xl overflow-hidden border border-[#c9a24b]/50 bg-black shadow-[0_0_80px_rgba(201,162,75,.2)]">
          {video.yt ? (
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.yt}?autoplay=1`} title={video.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          ) : (
            <video className="w-full h-full" src={video.src} controls autoPlay playsInline />
          )}
        </div>
        <p className="mt-4 text-center font-display text-2xl text-white">{video.title}</p>
      </div>
    </div>
  );
};

const Sermons = () => {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("All");
  const close = useCallback(() => setActive(null), []);
  const list = VIDEOS.filter((v) => tab === "All" || v.cat === tab);

  return (
    <section id="sermons" className="relative py-24 sm:py-32 bg-[#060b20] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <SectionTitle dark title="Watch and Be Encouraged" sub="Missed a service? Catch up on sermons, worship and testimonies anytime." />

        <Reveal dir="zoom">
          <div className="group relative h-[400px] sm:h-[560px] rounded-[2rem] overflow-hidden border border-[#c9a24b]/40 shadow-[0_30px_100px_rgba(0,0,0,.7)]">
            <video className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" src={V1} poster={IMG.worship} autoPlay muted loop playsInline />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b20] via-[#0a1330]/40 to-[#0a1330]/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <button onClick={() => setActive(VIDEOS[0])} className={`relative w-24 h-24 rounded-full ${GOLD_GRAD} text-[#0a1330] flex items-center justify-center hover:scale-110 transition-transform duration-500`} aria-label="Play featured service">
                <span className="absolute inset-0 rounded-full border-2 border-[#e9cf8a] anim-pulse-ring" />
                <span className="absolute inset-0 rounded-full border-2 border-[#e9cf8a] anim-pulse-ring" style={{ animationDelay: "1.2s" }} />
                <Icon name="play" className="w-9 h-9 ml-1" fill />
              </button>
              <h3 className="mt-8 font-display text-4xl sm:text-6xl font-semibold text-white">Experience Sunday Worship</h3>
              <p className="mt-3 max-w-xl text-white/75">Watch highlights from our latest service and feel the presence of God.</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {VIDEO_TABS.map((tb) => (
            <button key={tb} onClick={() => setTab(tb)} className={`rounded-full px-6 py-2.5 text-sm font-medium border transition-all duration-300 ${tab === tb ? `${GOLD_GRAD} text-[#0a1330] border-transparent shadow-[0_0_25px_rgba(201,162,75,.4)]` : "border-white/20 text-white/70 hover:border-[#c9a24b] hover:text-white"}`}>{tb}</button>
          ))}
        </div>

        <div key={tab} className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v, k) => (
            <button key={v.title} onClick={() => setActive(v)} style={{ animationDelay: `${k * 100}ms` }} className="anim-fadeup group w-full text-left rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-[#c9a24b] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(201,162,75,.15)] transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <Img src={v.poster} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#c9a24b] text-[#0a1330] flex items-center justify-center scale-90 group-hover:scale-110 transition-transform duration-500"><Icon name="play" className="w-6 h-6 ml-0.5" fill /></span>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">{v.dur}</span>
                <span className="absolute top-3 left-3 rounded-full bg-[#0a1330]/80 border border-[#c9a24b]/40 px-3 py-1 text-xs text-[#e9cf8a]">{v.cat}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-white group-hover:text-[#e9cf8a] transition-colors">{v.title}</h3>
                <p className="mt-1 text-sm text-white/55">{v.who}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <VideoModal video={active} onClose={close} />
    </section>
  );
};

/* ------------------------------ VERSE ----------------------------------- */
const VERSE_MS = 8000;
const VerseSection = () => {
  const [i, setI] = useState(0);
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-[#8f1d3a] via-[#4a0f2a] to-[#14245a]">
      <Cross className="absolute -right-10 -top-10 w-72 h-72 text-white/[0.06] anim-spin-slow" />
      <Cross className="absolute -left-16 -bottom-16 w-80 h-80 text-white/[0.05]" />
      <div className="relative max-w-4xl mx-auto px-5 text-center">
        <div key={i} className="anim-fadein min-h-[240px] sm:min-h-[210px] flex flex-col items-center justify-center">
          <p className="font-display italic text-3xl sm:text-5xl leading-snug text-white">"{VERSES[i].t}"</p>
          <p className={`mt-6 font-display text-2xl ${GOLD_TEXT}`}>{VERSES[i].r}</p>
        </div>
        <div className="mt-8 mx-auto max-w-xs h-[3px] bg-white/15 rounded-full overflow-hidden">
          <div key={i} onAnimationEnd={() => setI((p) => (p + 1) % VERSES.length)} className={`anim-progress h-full ${GOLD_GRAD}`} style={{ animationDuration: `${VERSE_MS}ms` }} />
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          {VERSES.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Verse ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-[#e9cf8a]" : "w-3 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ EVENTS ---------------------------------- */
const EventCard = ({ e, k }) => {
  const t = useCountdown(e.date);
  return (
    <Reveal delay={(k % 2) * 140}>
      <article className="group h-full flex flex-col sm:flex-row rounded-3xl overflow-hidden bg-white border border-[#c9a24b]/30 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#c9a24b] transition-all duration-500">
        <div className="relative sm:w-2/5 h-52 sm:h-auto overflow-hidden shrink-0">
          <Img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1300ms]" />
          <div className={`absolute top-4 left-4 rounded-2xl ${GOLD_GRAD} text-[#0a1330] px-4 py-2 text-center leading-none shadow-xl`}>
            <p className="font-display text-3xl font-bold">{e.date.getDate()}</p>
            <p className="text-xs font-semibold mt-1">{e.date.toLocaleString(undefined, { month: "short" })}</p>
          </div>
        </div>
        <div className="p-6 flex-1">
          <span className="inline-block rounded-full bg-[#0a1330]/5 border border-[#c9a24b]/40 px-3 py-1 text-xs text-[#9a7628]">{e.cat}</span>
          <h3 className="mt-3 font-display text-3xl font-semibold text-[#0a1330]">{e.title}</h3>
          <p className="mt-2 text-sm text-[#0a1330]/65 leading-relaxed">{e.text}</p>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([key, lab]) => (
              <div key={key} className="rounded-xl bg-[#0a1330] py-2">
                <p className="font-display text-2xl text-[#e9cf8a] leading-none tabular-nums">{pad(t[key])}</p>
                <p className="text-[10px] text-white/50 mt-1">{lab}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const Events = () => (
  <section id="events" className="relative py-24 sm:py-32 bg-[#f8f4ea]">
    <div className="max-w-7xl mx-auto px-5">
      <SectionTitle title="Upcoming Events" sub="Mark your calendar and bring your family and friends." />
      <div className="grid lg:grid-cols-2 gap-6">{EVENTS.map((e, k) => <EventCard key={e.title} e={e} k={k} />)}</div>
    </div>
  </section>
);

/* ------------------------------ GALLERY --------------------------------- */
const Gallery = () => {
  const [tab, setTab] = useState("All");
  const [sel, setSel] = useState(null);
  const list = GALLERY.filter((g) => tab === "All" || g.cat === tab);

  useEffect(() => {
    if (sel === null) return;
    const on = (e) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowRight") setSel((p) => (p + 1) % list.length);
      if (e.key === "ArrowLeft") setSel((p) => (p - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [sel, list.length]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#efe7d3]">
      <div className="max-w-7xl mx-auto px-5">
        <SectionTitle title="Moments of Grace" sub="A glimpse into worship, fellowship and life together." />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {GAL_TABS.map((tb) => (
            <button key={tb} onClick={() => { setTab(tb); setSel(null); }} className={`rounded-full px-6 py-2.5 text-sm font-medium border transition-all duration-300 ${tab === tb ? "bg-[#0a1330] text-[#e9cf8a] border-[#0a1330] shadow-lg" : "border-[#0a1330]/25 text-[#0a1330]/70 hover:border-[#c9a24b] hover:text-[#0a1330]"}`}>{tb}</button>
          ))}
        </div>

        <div key={tab} className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {list.map((g, k) => (
            <button key={g.img + k} onClick={() => setSel(k)} style={{ animationDelay: `${k * 60}ms` }} className={`anim-fadeup group relative mb-3 sm:mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl sm:rounded-3xl border border-[#c9a24b]/30 ${g.r}`} aria-label={`Open photo ${k + 1}`}>
              <Img src={g.img} alt={`${g.cat} gallery`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1330]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
                <span className="text-xs text-[#e9cf8a] rounded-full bg-black/40 px-3 py-1">{g.cat}</span>
                <Cross className="w-5 h-5 text-[#e9cf8a]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {sel !== null && list[sel] && (
        <div className="anim-fadein fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSel(null)} role="dialog" aria-modal="true">
          <button onClick={() => setSel(null)} className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-[#0a1330] text-white flex items-center justify-center transition" aria-label="Close"><Icon name="close" /></button>
          <button onClick={(e) => { e.stopPropagation(); setSel((sel - 1 + list.length) % list.length); }} className="absolute left-3 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-[#0a1330] text-white flex items-center justify-center transition" aria-label="Previous"><Icon name="left" /></button>
          <button onClick={(e) => { e.stopPropagation(); setSel((sel + 1) % list.length); }} className="absolute right-3 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-[#0a1330] text-white flex items-center justify-center transition" aria-label="Next"><Icon name="right" /></button>
          <Img key={list[sel].img} src={list[sel].img} alt="Selected" onClick={(e) => e.stopPropagation()} className="anim-fadein max-h-[85vh] max-w-[90vw] sm:max-w-[80vw] rounded-2xl border border-[#c9a24b]/50 object-contain" />
        </div>
      )}
    </section>
  );
};

/* ------------------------------ GIVE ------------------------------------ */
const Give = () => {
  const amounts = [500, 1000, 2500, 5000];
  const [amt, setAmt] = useState(1000);
  const [custom, setCustom] = useState("");
  const [purpose, setPurpose] = useState("Tithes & Offerings");
  const final = custom ? Number(custom) : amt;
  const purposes = ["Tithes & Offerings", "Building Fund", "Outreach & Charity", "Youth & Children"];

  const go = () => {
    const text = `🙏 Giving intent\nAmount: ₹${final || 0}\nPurpose: ${purpose}\nPlease share the giving details.`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <section id="give" className="relative py-24 sm:py-32 bg-[#0a1330] overflow-hidden">
      <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.field})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1330] via-[#0a1330]/85 to-[#0a1330]" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-5">
        <SectionTitle dark title="Sow into the Vineyard" sub="Your generosity helps us worship, serve the needy and share the gospel. Every gift is a seed." />
        <Reveal dir="zoom">
          <div className="rounded-[2rem] border border-[#c9a24b]/40 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-10">
            <p className="text-sm text-white/60 mb-3">Choose an amount</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {amounts.map((a) => (
                <button key={a} onClick={() => { setAmt(a); setCustom(""); }} className={`rounded-2xl py-4 font-display text-2xl border transition-all duration-300 ${!custom && amt === a ? `${GOLD_GRAD} text-[#0a1330] border-transparent scale-105 shadow-[0_0_30px_rgba(201,162,75,.4)]` : "border-white/20 text-white hover:border-[#c9a24b]"}`}>₹{a}</button>
              ))}
            </div>
            <input value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Or enter another amount (₹)" className="mt-4 w-full rounded-2xl bg-black/30 border border-white/20 px-5 py-4 text-white placeholder-white/40 outline-none focus:border-[#c9a24b] focus:ring-2 focus:ring-[#c9a24b]/30 transition" />
            <p className="text-sm text-white/60 mt-7 mb-3">Purpose</p>
            <div className="flex flex-wrap gap-3">
              {purposes.map((p) => (
                <button key={p} onClick={() => setPurpose(p)} className={`rounded-full px-5 py-2.5 text-sm border transition-all duration-300 ${purpose === p ? "bg-[#c9a24b] text-[#0a1330] border-[#c9a24b]" : "border-white/20 text-white/70 hover:border-[#c9a24b] hover:text-white"}`}>{p}</button>
              ))}
            </div>
            <button onClick={go} className={`btn-shine mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full ${GOLD_GRAD} py-4 font-semibold text-[#0a1330] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(201,162,75,.5)] transition-all duration-300`}>
              <Icon name="heart" className="w-5 h-5" /> Give ₹{final || 0} via WhatsApp
            </button>
            <p className="mt-4 text-center text-xs text-white/50">Our church office will reply with the giving details. Please verify all payment details with the office.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------ TESTIMONIALS ---------------------------- */
const T_MS = 6000;
const Testimonials = () => {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-24 sm:py-32 bg-[#f8f4ea] overflow-hidden">
      <Cross className="absolute right-0 top-0 w-72 h-72 text-[#c9a24b]/10" />
      <div className="relative max-w-4xl mx-auto px-5">
        <SectionTitle title="Stories of Faith" sub="Hear from the people who call this church home." />
        <div key={i} className="anim-fadein text-center">
          <p className="font-display italic text-2xl sm:text-4xl leading-snug text-[#0a1330]">"{t.text}"</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c9a24b]"><Img src={t.img} alt={t.name} className="w-full h-full object-cover" /></div>
            <div className="text-left">
              <p className="font-display text-2xl text-[#0a1330]">{t.name}</p>
              <p className="text-sm text-[#9a7628]">{t.role}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto max-w-[200px] h-[3px] bg-[#0a1330]/10 rounded-full overflow-hidden">
          <div key={i} onAnimationEnd={() => setI((p) => (p + 1) % TESTIMONIALS.length)} className={`anim-progress h-full ${GOLD_GRAD}`} style={{ animationDuration: `${T_MS}ms` }} />
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-[#c9a24b]" : "w-3 bg-[#0a1330]/25 hover:bg-[#0a1330]/50"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ FAQ ------------------------------------- */
const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-24 sm:py-28 bg-[#efe7d3]">
      <div className="max-w-3xl mx-auto px-5">
        <SectionTitle title="New Here? Start Here" sub="Answers to the questions we hear most from first-time visitors." />
        <div className="space-y-3">
          {FAQS.map(([q, a], k) => (
            <Reveal key={q} delay={k * 80}>
              <div className={`rounded-2xl bg-white border transition-all duration-500 ${open === k ? "border-[#c9a24b] shadow-xl" : "border-[#c9a24b]/25"}`}>
                <button onClick={() => setOpen(open === k ? -1 : k)} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5" aria-expanded={open === k}>
                  <span className="font-display text-xl sm:text-2xl text-[#0a1330]">{q}</span>
                  <Icon name="down" className={`w-5 h-5 shrink-0 text-[#9a7628] transition-transform duration-500 ${open === k ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${open === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-6 text-[#0a1330]/70 leading-relaxed"><span className="block pb-6">{a}</span></p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ CONTACT --------------------------------- */
const Contact = ({ openLegal }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text = `🙏 Prayer / Enquiry\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
    setForm({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const field = "w-full rounded-xl bg-white/[0.06] border border-white/15 px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#c9a24b] focus:ring-2 focus:ring-[#c9a24b]/30 transition";
  const info = [
    { icon: "pin", t: "Visit Us", d: CONFIG.address },
    { icon: "phone", t: "Call Us", d: `${CONFIG.phone}  |  ${CONFIG.phone2}` },
    { icon: "mail", t: "Email Us", d: CONFIG.email },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0a1330] overflow-hidden">
      <div className="absolute -top-20 -right-40 w-[460px] h-[460px] rounded-full bg-[#2b4fa8]/30 blur-[130px] anim-blob" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5">
        <SectionTitle dark title="We Would Love to Pray with You" sub="Share your prayer request or ask us anything. Our team will get back to you soon." />
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal dir="left" className="space-y-5">
            {info.map((c) => (
              <div key={c.t} className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-[#c9a24b] hover:translate-x-2 transition-all duration-500">
                <span className={`w-14 h-14 shrink-0 rounded-2xl ${GOLD_GRAD} text-[#0a1330] flex items-center justify-center group-hover:rotate-12 transition-transform`}><Icon name={c.icon} className="w-6 h-6" /></span>
                <div><p className="font-display text-2xl text-white">{c.t}</p><p className="text-sm text-white/65 break-words">{c.d}</p></div>
              </div>
            ))}
            <div className="h-64 rounded-3xl overflow-hidden border border-[#c9a24b]/30">
              <iframe title="Church location" className="w-full h-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`} />
            </div>
          </Reveal>

          <Reveal dir="right">
            <form onSubmit={submit} className="rounded-3xl border border-[#c9a24b]/30 bg-white/[0.05] backdrop-blur p-6 sm:p-9 space-y-4">
              <h3 className="font-display text-3xl text-white">Send a Prayer Request</h3>
              <input required value={form.name} onChange={set("name")} placeholder="Your name" className={field} />
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.phone} onChange={set("phone")} placeholder="Phone number" type="tel" className={field} />
                <input value={form.email} onChange={set("email")} placeholder="Email (optional)" type="email" className={field} />
              </div>
              <textarea required value={form.message} onChange={set("message")} rows={5} placeholder="How can we pray for you?" className={`${field} resize-none`} />
              <button type="submit" className={`btn-shine w-full inline-flex items-center justify-center gap-2 rounded-full ${GOLD_GRAD} py-3.5 font-semibold text-[#0a1330] hover:shadow-[0_0_40px_rgba(201,162,75,.5)] hover:scale-[1.02] transition-all duration-300`}>
                <Icon name="send" className="w-5 h-5" /> Send Request
              </button>
              <p className="text-xs text-white/50 text-center">
                By sending, you agree to our{" "}
                <button type="button" onClick={() => openLegal("privacy")} className="underline text-[#e9cf8a]">Privacy Policy</button> and{" "}
                <button type="button" onClick={() => openLegal("terms")} className="underline text-[#e9cf8a]">Terms &amp; Conditions</button>.
              </p>
              {sent && <p className="anim-fadein flex items-center justify-center gap-2 text-[#e9cf8a] text-sm"><Icon name="check" className="w-4 h-4" /> Thank you. We are praying with you.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ LEGAL MODAL ----------------------------- */
const LegalModal = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;
    const on = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [type, onClose]);
  if (!type) return null;
  const d = LEGAL[type];
  return (
    <div className="anim-fadein fixed inset-0 z-[95] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={d.title}>
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#f8f4ea] text-[#0a1330] border border-[#c9a24b]/50 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 px-6 sm:px-9 py-5 bg-[#0a1330] text-white">
          <div className="flex items-center gap-3">
            <span className={`w-11 h-11 rounded-full ${GOLD_GRAD} text-[#0a1330] flex items-center justify-center`}><Icon name={type === "privacy" ? "shield" : "file"} className="w-5 h-5" /></span>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl">{d.title}</h3>
              <p className="text-xs text-white/55">Last updated: {d.updated}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-[#0a1330] flex items-center justify-center transition" aria-label="Close"><Icon name="close" /></button>
        </div>
        <div className="overflow-y-auto px-6 sm:px-9 py-7 space-y-6">
          {d.sections.map(([h, p]) => (
            <div key={h}>
              <h4 className="font-display text-xl sm:text-2xl text-[#0a1330]">{h}</h4>
              <p className="mt-2 text-[#0a1330]/70 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
        <div className="px-6 sm:px-9 py-4 border-t border-[#c9a24b]/30 bg-white flex justify-end">
          <button onClick={onClose} className={`rounded-full ${GOLD_GRAD} px-8 py-2.5 font-semibold text-[#0a1330] hover:scale-105 transition`}>Close</button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ FOOTER ---------------------------------- */
const Footer = ({ openLegal }) => (
  <footer className="relative bg-[#060b20] border-t border-[#c9a24b]/30 pt-20 overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a24b] to-transparent" aria-hidden="true" />
    <Cross className="absolute -right-12 top-10 w-72 h-72 text-[#c9a24b]/[0.05]" />
    <div className="relative max-w-7xl mx-auto px-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-3">
          <span className={`w-12 h-12 rounded-full ${GOLD_GRAD} flex items-center justify-center text-[#0a1330]`}><Cross className="w-5 h-5" /></span>
          <p className="font-display text-2xl text-white leading-tight">Vineyard Worker's<br />of Christ Church</p>
        </div>
        <p className="mt-5 text-sm text-white/55 leading-relaxed">{CONFIG.tagline} Join us as we worship, grow and serve together.</p>
        <div className="mt-6 flex gap-3">
          {["facebook", "instagram", "youtube"].map((s) => (
            <a key={s} href="#" aria-label={s} className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#c9a24b] hover:text-[#0a1330] hover:border-[#c9a24b] hover:-translate-y-1 transition-all duration-300"><Icon name={s} className="w-5 h-5" /></a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-2xl text-[#e9cf8a] mb-5">Quick Links</h4>
        <ul className="space-y-3 text-sm">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="text-white/60 hover:text-[#c9a24b] hover:pl-2 transition-all duration-300 inline-block">{n.label}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display text-2xl text-[#e9cf8a] mb-5">Service Times</h4>
        <ul className="space-y-3 text-sm text-white/60">
          {SERVICES.map((s) => (
            <li key={s.day} className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>{s.day}</span><span className="text-white/85">{s.time}</span></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display text-2xl text-[#e9cf8a] mb-5">Contact</h4>
        <ul className="space-y-4 text-sm text-white/60">
          <li className="flex gap-3"><Icon name="pin" className="w-5 h-5 shrink-0 text-[#c9a24b]" />{CONFIG.address}</li>
          <li className="flex gap-3"><Icon name="phone" className="w-5 h-5 shrink-0 text-[#c9a24b]" />{CONFIG.phone}</li>
          <li className="flex gap-3"><Icon name="mail" className="w-5 h-5 shrink-0 text-[#c9a24b]" />{CONFIG.email}</li>
        </ul>
      </div>
    </div>

    <div className="relative mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-center text-xs sm:text-sm text-white/50">
        <p>© {new Date().getFullYear()} {CONFIG.name}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <button onClick={() => openLegal("privacy")} className="hover:text-[#e9cf8a] transition underline-offset-4 hover:underline">Privacy Policy</button>
          <span className="w-1 h-1 rounded-full bg-[#c9a24b]" aria-hidden="true" />
          <button onClick={() => openLegal("terms")} className="hover:text-[#e9cf8a] transition underline-offset-4 hover:underline">Terms &amp; Conditions</button>
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------ APP ------------------------------------- */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [legal, setLegal] = useState(null);
  const closeLegal = useCallback(() => setLegal(null), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setScrolled(h.scrollTop > 60);
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f4ea] text-[#0a1330]">
      <GlobalStyles />
      <Preloader show={loading} />
      <div className={`fixed top-0 left-0 z-[60] h-[3px] ${GOLD_GRAD}`} style={{ width: `${progress}%` }} />

      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <ServiceBand />
        <About />
        <Pastor />
        <Ministries />
        <Strips />
        <Sermons />
        <VerseSection />
        <Events />
        <Gallery />
        <Give />
        <Testimonials />
        <FAQ />
        <Contact openLegal={setLegal} />
      </main>
      <Footer openLegal={setLegal} />
      <LegalModal type={legal} onClose={closeLegal} />

      <a href="#home" aria-label="Back to top" className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full ${GOLD_GRAD} text-[#0a1330] flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all duration-500 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
        <Icon name="up" />
      </a>
    </div>
  );
}