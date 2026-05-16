import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Clock, ChevronRight, Play, TrendingUp, Globe, Users, Zap, ChevronDown, Bookmark, Share2, MessageSquare, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube, Linkedin, Award, Shield, Target, Heart, Briefcase, Building, Newspaper } from 'lucide-react';

type Page = 'home' | 'article' | 'about' | 'contact' | 'careers' | 'advertise' | 'terms' | 'privacy' | 'cookies' | 'live' | 'watch' | 'podcasts';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  author: string;
  timestamp: string;
  readTime: string;
  featured?: boolean;
  live?: boolean;
  video?: boolean;
}

const categories = ['Home', 'World', 'Politics', 'Business', 'Technology', 'Science', 'Health', 'Climate', 'Culture', 'Sport'];

const moreCategories = [
  { name: 'In Depth', icon: Zap },
  { name: 'Live', icon: Globe },
  { name: 'Watch', icon: Play },
  { name: 'Podcasts', icon: MessageSquare },
  { name: 'Archive', icon: Newspaper },
];

const breakingNews = [
  "UN refuses to join US-backed Gaza aid operation over neutrality concerns",
  "Trump concludes Gulf tour with $200bn AI and investment deals",
  "Severe tornado outbreak kills 23 across US Midwest",
  "Oil prices drop 2% on potential US-Iran nuclear deal progress"
];

const articles: Article[] = [
  {
    id: '1',
    title: 'UN Will Not Participate in US-Backed Gaza Aid Operation',
    summary: 'United Nations says plan lacks impartiality as humanitarian crisis deepens with famine risk for children.',
    content: 'The United Nations has announced it will not take part in a US-backed humanitarian aid operation in Gaza, citing concerns over the plan\'s lack of impartiality, neutrality, and independence. The decision comes as aid agencies warn of a severe food and child malnutrition crisis in the territory.\n\nUN officials stated that any humanitarian operation must adhere to core humanitarian principles to ensure aid reaches those most in need without political interference. The US-backed plan, details of which remain partially classified, has faced criticism from multiple international organizations.\n\nMeanwhile, UNICEF and other agencies report that large numbers of children in Gaza face catastrophic food insecurity, with experts warning of imminent famine risk. The organization estimates that over 300,000 children are experiencing acute malnutrition.\n\nThe UN\'s decision marks a significant rift in international humanitarian coordination. Secretary-General António Guterres emphasized that "humanitarian aid must never be politicized" in a statement released Thursday morning.\n\nUS officials have defended the plan, arguing it would deliver aid more efficiently. However, several European nations have expressed similar concerns to those raised by the UN.',
    category: 'World',
    image: '/images/gaza.jpg',
    author: 'Sarah Mitchell',
    timestamp: '2 hours ago',
    readTime: '4 min read',
    featured: true,
    live: true
  },
  {
    id: '2',
    title: 'Trump Wraps Gulf Tour with Historic AI Deals in Abu Dhabi',
    summary: 'President signs major investment agreements with UAE, Saudi Arabia and Qatar focused on artificial intelligence and chip access.',
    content: 'President Donald Trump concluded a three-nation Gulf tour on Thursday, signing what the White House described as "historic" investment and AI technology agreements worth over $200 billion. The tour included stops in Saudi Arabia, Qatar, and the United Arab Emirates.\n\nIn Abu Dhabi, Trump met with UAE leaders to finalize expanded access to advanced AI chips, a move that could reshape the global AI landscape. The agreement includes provisions for data centers and semiconductor manufacturing partnerships.\n\nThe deals come amid intensifying global competition for AI supremacy, with Gulf states positioning themselves as key players in the technology\'s development and deployment. The UAE has committed $50 billion to AI infrastructure over the next five years.',
    category: 'Politics',
    image: '/images/trump-uae.jpg',
    author: 'James Cooper',
    timestamp: '4 hours ago',
    readTime: '3 min read',
    featured: true
  },
  {
    id: '3',
    title: 'Deadly Tornado Outbreak Devastates US Midwest',
    summary: 'At least 23 killed as dozens of tornadoes tear through Ohio Valley and surrounding states in worst outbreak since 2021.',
    content: 'A massive severe weather system spawned dozens of tornadoes across the US Midwest and Ohio Valley on Wednesday night into Thursday morning, leaving at least 23 people dead and widespread destruction in its wake.\n\nThe National Weather Service confirmed 47 tornado touchdowns across six states, with Kentucky, Indiana, and Ohio suffering the most severe damage. Entire neighborhoods were leveled, and power outages affected over 500,000 homes.',
    category: 'World',
    image: '/images/tornado.jpg',
    author: 'Emma Rodriguez',
    timestamp: '6 hours ago',
    readTime: '5 min read',
    video: true
  },
  {
    id: '4',
    title: 'Oil Prices Plunge on Hopes of US-Iran Nuclear Deal',
    summary: 'Brent crude falls 2.1% as markets react to reports of breakthrough in Vienna talks.',
    content: 'Oil prices fell sharply on Thursday, with Brent crude dropping 2.1% to $81.40 per barrel, following reports that the United States and Iran may be close to reaching a new nuclear agreement.',
    category: 'Business',
    image: '/images/oil.jpg',
    author: 'David Park',
    timestamp: '8 hours ago',
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Bank of England Holds Rates as Inflation Eases to 2.1%',
    summary: 'Monetary Policy Committee votes 7-2 to keep base rate at 4.75% amid cooling price pressures.',
    content: 'The Bank of England has held interest rates at 4.75%, as inflation fell to 2.1% in April, just above the 2% target.',
    category: 'Business',
    image: '/images/london.jpg',
    author: 'Rachel Thompson',
    timestamp: '1 day ago',
    readTime: '4 min read'
  },
  {
    id: '6',
    title: 'NHS Waiting Lists Fall for Third Consecutive Month',
    summary: 'Data shows 7.3 million people waiting for treatment, down from peak of 7.8 million last autumn.',
    content: 'NHS England data released today shows waiting lists have fallen for the third month in a row.',
    category: 'Health',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    author: 'Dr. Michael Chen',
    timestamp: '1 day ago',
    readTime: '3 min read'
  },
  {
    id: '7',
    title: 'Apple Unveils AI-Powered iPhone 17 with On-Device Processing',
    summary: 'New chip promises 40% faster neural engine, addressing privacy concerns over cloud AI.',
    content: 'Apple has unveiled the iPhone 17 lineup, featuring its most powerful AI chip to date.',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    author: 'Alex Kumar',
    timestamp: '2 days ago',
    readTime: '4 min read'
  },
  {
    id: '8',
    title: 'Climate Summit: World on Track for 2.7°C Warming',
    summary: 'UN report warns current pledges insufficient, calls for tripling of renewable energy by 2030.',
    content: 'A stark new UN report released ahead of COP30 warns that the world is on track for 2.7°C of warming by 2100.',
    category: 'Climate',
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
    author: 'Isabella Green',
    timestamp: '2 days ago',
    readTime: '5 min read'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [breakingIndex, setBreakingIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const [emailSignup, setEmailSignup] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreakingIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedArticle]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    if (selectedCategory !== 'Home') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery]);

  const navigateTo = (page: Page, category?: string) => {
    setCurrentPage(page);
    setSelectedArticle(null);
    if (category) setSelectedCategory(category);
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSignup) {
      setSignupSuccess(true);
      setTimeout(() => {
        setSignupSuccess(false);
        setEmailSignup('');
      }, 3000);
    }
  };

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#202224]" style={{ fontFamily: "'Libre Franklin', system-ui, -apple-system, sans-serif" }}>
      {/* Top bar */}
      <div className="bg-[#202224] text-white text-[13px]">
        <div className="max-w-[1280px] mx-auto px-4 h-[32px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('home')} className="font-semibold tracking-wide hover:text-[#bb1919] transition-colors">FUGUG TIMES</button>
            <span className="hidden md:flex items-center gap-4 text-[#b4b4b4]">
              <span>Thursday, 15 May 2025</span>
              <span>•</span>
              <span>Updated 14:32 BST</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-white text-[#b4b4b4] transition-colors hidden sm:block">Sign in</button>
            <button className="bg-[#bb1919] px-3 py-1 font-medium hover:bg-[#a01515] transition-colors">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b-[4px] border-[#bb1919] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-[64px] md:h-[80px]">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 -ml-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
                <div className="w-[44px] h-[44px] md:w-[52px] md:h-[52px] bg-[#bb1919] flex items-center justify-center">
                  <span className="text-white font-black text-[24px] md:text-[28px] tracking-tighter" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>F</span>
                </div>
                <div className="text-left">
                  <h1 className="text-[28px] md:text-[36px] font-black leading-none tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    FUGUG <span className="text-[#bb1919]">TIMES</span>
                  </h1>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#5a5a5a] font-medium -mt-1 hidden md:block">Trusted. Independent. Global.</p>
                </div>
              </button>
            </div>

            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 hover:bg-[#f0f0f0] rounded-full transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-[#e6e6e6] bg-white relative">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="hidden md:flex items-center gap-0 h-[44px] overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); navigateTo('home'); }}
                  className={`px-4 h-full text-[15px] font-medium whitespace-nowrap border-b-[4px] transition-all relative -mb-px ${
                    selectedCategory === cat && currentPage === 'home'
                      ? 'border-[#bb1919] text-[#202224]'
                      : 'border-transparent text-[#5a5a5a] hover:text-[#202224] hover:bg-[#f9f9f9]'
                  }`}
                >
                  {cat}
                  {cat === 'World' && <span className="absolute top-2 -right-1 w-1.5 h-1.5 bg-[#bb1919] rounded-full animate-pulse" />}
                </button>
              ))}
              <div className="relative">
                <button 
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="px-4 h-[44px] text-[15px] text-[#5a5a5a] hover:text-[#202224] flex items-center gap-1 border-b-[4px] border-transparent hover:bg-[#f9f9f9]"
                >
                  More <ChevronDown size={14} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-px bg-white border border-[#e6e6e6] shadow-xl w-[220px] z-50"
                    >
                      {moreCategories.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => navigateTo(item.name.toLowerCase() as Page)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-[#f9f9f9] text-left border-b border-[#f0f0f0] last:border-0"
                        >
                          <item.icon size={16} className="text-[#5a5a5a]" />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-[#e6e6e6] bg-[#f9f9f9] overflow-hidden">
              <div className="max-w-[1280px] mx-auto px-4 py-4">
                <div className="relative max-w-[720px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a8a]" size={20} />
                  <input
                    type="text"
                    placeholder="Search Fugug Times"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 h-[48px] bg-white border-2 border-[#202224] focus:outline-none focus:border-[#bb1919] text-[16px]"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-[300px] h-full bg-white shadow-2xl overflow-y-auto">
              <div className="p-4 border-b border-[#e6e6e6] flex items-center justify-between sticky top-0 bg-white">
                <span className="font-bold text-[18px]">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2"><X size={24} /></button>
              </div>
              <div className="p-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); navigateTo('home'); }} className={`w-full text-left px-4 py-3 text-[16px] font-medium rounded ${selectedCategory === cat ? 'bg-[#bb1919] text-white' : 'hover:bg-[#f0f0f0]'}`}>
                    {cat}
                  </button>
                ))}
                <div className="border-t border-[#e6e6e6] mt-2 pt-2">
                  {moreCategories.map((item) => (
                    <button key={item.name} onClick={() => navigateTo(item.name.toLowerCase() as Page)} className="w-full text-left px-4 py-3 text-[16px] font-medium rounded hover:bg-[#f0f0f0] flex items-center gap-3">
                      <item.icon size={18} />{item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breaking news */}
      {currentPage === 'home' && (
        <div className="bg-[#bb1919] text-white">
          <div className="max-w-[1280px] mx-auto px-4 h-[40px] flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="font-bold text-[13px] uppercase tracking-wider">Breaking</span>
            </div>
            <div className="flex-1 overflow-hidden relative h-[40px]">
              <AnimatePresence mode="wait">
                <motion.div key={breakingIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center">
                  <span className="text-[14px] font-medium truncate">{breakingNews[breakingIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1280px] mx-auto px-4 py-6 min-h-[70vh]">
        {/* ARTICLE PAGE */}
        {currentPage === 'article' && selectedArticle && (
          <div className="max-w-[800px] mx-auto">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-[#5a5a5a] hover:text-[#202224] mb-6 group">
              <ChevronRight className="rotate-180 group-hover:-translate-x-0.5 transition-transform" size={20} />
              <span className="text-[14px] font-medium">Back to headlines</span>
            </button>

            <article>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#bb1919] text-white px-2.5 py-1 text-[12px] font-bold uppercase tracking-wide">{selectedArticle.category}</span>
                {selectedArticle.live && <span className="flex items-center gap-1.5 text-[#bb1919] font-bold text-[12px] uppercase"><span className="w-1.5 h-1.5 bg-[#bb1919] rounded-full animate-pulse" />Live</span>}
              </div>
              <h1 className="text-[32px] md:text-[44px] font-bold leading-[1.1] mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{selectedArticle.title}</h1>
              <p className="text-[18px] md:text-[20px] text-[#5a5a5a] leading-[1.5] mb-6">{selectedArticle.summary}</p>
              <div className="flex items-center justify-between border-y border-[#e6e6e6] py-3 mb-6">
                <div className="flex items-center gap-4 text-[13px] text-[#5a5a5a]">
                  <span>By <strong className="text-[#202224] font-medium">{selectedArticle.author}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{selectedArticle.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleBookmark(selectedArticle.id)} className={`p-2 hover:bg-[#f0f0f0] rounded-full ${bookmarked.includes(selectedArticle.id) ? 'text-[#bb1919]' : ''}`}><Bookmark size={18} fill={bookmarked.includes(selectedArticle.id) ? 'currentColor' : 'none'} /></button>
                  <button className="p-2 hover:bg-[#f0f0f0] rounded-full"><Share2 size={18} /></button>
                </div>
              </div>
              <div className="aspect-[16/9] mb-6 bg-[#e6e6e6] overflow-hidden"><img src={selectedArticle.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="prose prose-lg max-w-none">
                {selectedArticle.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-[18px] leading-[1.7] mb-5 text-[#202224]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{para}</p>
                ))}
              </div>
            </article>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-[900px] mx-auto">
            <div className="bg-white border border-[#e6e6e6] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#bb1919] flex items-center justify-center"><span className="text-white font-black text-2xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>F</span></div>
                <h1 className="text-[36px] font-bold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>About Fugug Times</h1>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-[20px] leading-relaxed text-[#5a5a5a] mb-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Fugug Times is an independent global news organization committed to delivering accurate, impartial, and impactful journalism. Founded in 2020, we reach 47 million readers monthly across 180 countries.
                </p>

                <div className="grid md:grid-cols-3 gap-8 my-12">
                  {[
                    { icon: Target, title: 'Our Mission', desc: 'To hold power to account and give voice to the voiceless through fearless, independent journalism.' },
                    { icon: Shield, title: 'Our Values', desc: 'Accuracy, impartiality, independence, and humanity guide everything we publish.' },
                    { icon: Globe, title: 'Global Reach', desc: '120 correspondents in 75 bureaus worldwide, reporting from where news happens.' },
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <div className="w-14 h-14 bg-[#bb1919]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="text-[#bb1919]" size={24} />
                      </div>
                      <h3 className="font-bold text-[18px] mb-2">{item.title}</h3>
                      <p className="text-[14px] text-[#5a5a5a] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-[24px] font-bold mt-12 mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Editorial Standards</h2>
                <p className="text-[16px] leading-[1.7] mb-4">We adhere to the highest standards of journalism. Every story is fact-checked, every source verified, and every perspective considered. Our editorial code, based on the principles established by the International Federation of Journalists, ensures:</p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] leading-relaxed mb-8">
                  <li>Complete editorial independence from commercial and political interests</li>
                  <li>Rigorous fact-checking and source verification</li>
                  <li>Clear distinction between news, analysis, and opinion</li>
                  <li>Right of reply for all subjects of critical coverage</li>
                  <li>Transparent corrections policy</li>
                </ul>

                <h2 className="text-[24px] font-bold mt-12 mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Leadership</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'Eleanor Vance', role: 'Editor-in-Chief', bio: '30 years at Reuters, AP, and The Guardian. Pulitzer finalist 2019.' },
                    { name: 'Marcus Chen', role: 'Managing Director', bio: 'Former BBC World Service. Led digital transformation at major outlets.' },
                    { name: 'Dr. Aisha Patel', role: 'Head of Investigations', bio: 'Investigative reporter with 15 years exposing corruption globally.' },
                    { name: 'James Whitaker', role: 'International Editor', bio: 'Reported from 40+ countries. Former foreign correspondent in Middle East.' },
                  ].map((person) => (
                    <div key={person.name} className="border-l-4 border-[#bb1919] pl-4 py-2">
                      <h4 className="font-bold">{person.name}</h4>
                      <p className="text-[13px] text-[#bb1919] font-medium mb-1">{person.role}</p>
                      <p className="text-[13px] text-[#5a5a5a]">{person.bio}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f9f9f9] p-6 mt-12 border-l-4 border-[#bb1919]">
                  <h3 className="font-bold text-[18px] mb-2 flex items-center gap-2"><Award size={20} className="text-[#bb1919]" />Awards & Recognition</h3>
                  <p className="text-[14px] leading-relaxed">Winner: Online Journalism Awards 2024 (General Excellence), Amnesty Media Awards 2023, British Journalism Awards 2022 (Investigation of the Year). Nominated for 3 Pulitzer Prizes.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-[36px] font-bold mb-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Contact Us</h1>
            <div className="grid md:grid-cols-[1fr_380px] gap-8">
              <div className="bg-white border border-[#e6e6e6] p-8">
                <h2 className="text-[22px] font-bold mb-6">Send a message</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We\'ll respond within 24 hours.'); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-medium text-[#5a5a5a] block mb-1.5">First name</label>
                      <input type="text" required className="w-full px-3 py-2.5 border border-[#ccc] focus:border-[#bb1919] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[13px] font-medium text-[#5a5a5a] block mb-1.5">Last name</label>
                      <input type="text" required className="w-full px-3 py-2.5 border border-[#ccc] focus:border-[#bb1919] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#5a5a5a] block mb-1.5">Email</label>
                    <input type="email" required className="w-full px-3 py-2.5 border border-[#ccc] focus:border-[#bb1919] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#5a5a5a] block mb-1.5">Department</label>
                    <select className="w-full px-3 py-2.5 border border-[#ccc] focus:border-[#bb1919] focus:outline-none bg-white">
                      <option>Editorial</option>
                      <option>News tips</option>
                      <option>Corrections</option>
                      <option>Advertising</option>
                      <option>Technical support</option>
                      <option>Press office</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#5a5a5a] block mb-1.5">Message</label>
                    <textarea required rows={5} className="w-full px-3 py-2.5 border border-[#ccc] focus:border-[#bb1919] focus:outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="bg-[#bb1919] text-white px-6 py-2.5 font-medium hover:bg-[#a01515] transition-colors">Send message</button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-[#e6e6e6] p-6">
                  <h3 className="font-bold text-[16px] mb-4 flex items-center gap-2"><Building size={18} />Headquarters</h3>
                  <div className="space-y-3 text-[14px]">
                    <div className="flex gap-3"><MapPin size={16} className="text-[#5a5a5a] mt-0.5 flex-shrink-0" /><div>Fugug Times Ltd<br />125 Fleet Street<br />London EC4A 2AE<br />United Kingdom</div></div>
                    <div className="flex gap-3"><Phone size={16} className="text-[#5a5a5a] mt-0.5" /><div>+44 20 7946 0958</div></div>
                    <div className="flex gap-3"><Mail size={16} className="text-[#5a5a5a] mt-0.5" /><div>contact@fugugtimes.com</div></div>
                  </div>
                </div>

                <div className="bg-white border border-[#e6e6e6] p-6">
                  <h3 className="font-bold text-[16px] mb-4">Newsdesk</h3>
                  <div className="space-y-2.5 text-[13px]">
                    <div><strong className="text-[#202224]">Breaking news:</strong><br /><span className="text-[#5a5a5a]">news@fugugtimes.com • +44 20 7946 0900</span></div>
                    <div><strong className="text-[#202224]">Tips (secure):</strong><br /><span className="text-[#5a5a5a]">tips@fugugtimes.com • Signal: +44 7700 900123</span></div>
                    <div><strong className="text-[#202224]">Corrections:</strong><br /><span className="text-[#5a5a5a]">corrections@fugugtimes.com</span></div>
                  </div>
                </div>

                <div className="bg-[#202224] text-white p-6">
                  <h3 className="font-bold text-[16px] mb-3">Global Bureaus</h3>
                  <div className="grid grid-cols-2 gap-2 text-[12px] text-[#b4b4b4]">
                    {['New York', 'Washington', 'Brussels', 'Paris', 'Berlin', 'Kyiv', 'Tel Aviv', 'Dubai', 'Nairobi', 'Delhi', 'Beijing', 'Tokyo'].map(city => (
                      <div key={city}>• {city}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAREERS PAGE */}
        {currentPage === 'careers' && (
          <div className="max-w-[900px] mx-auto">
            <div className="bg-white border border-[#e6e6e6] p-8 md:p-12">
              <h1 className="text-[36px] font-bold mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Careers at Fugug Times</h1>
              <p className="text-[18px] text-[#5a5a5a] mb-8">Join 450 journalists, engineers, and storytellers shaping the future of news.</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: Heart, title: 'Mission-driven', desc: 'Work that matters. Journalism that holds power accountable.' },
                  { icon: Users, title: 'Global team', desc: 'Collaborate across 75 bureaus with the best in the business.' },
                  { icon: Zap, title: 'Innovation', desc: 'Build new formats, tools, and ways to tell stories.' },
                ].map((item) => (
                  <div key={item.title} className="text-center p-6 bg-[#f9f9f9]">
                    <item.icon className="mx-auto mb-3 text-[#bb1919]" size={28} />
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-[13px] text-[#5a5a5a]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-[24px] font-bold mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Open Positions (12)</h2>
              <div className="space-y-4">
                {[
                  { title: 'Senior Investigative Reporter', dept: 'Editorial', loc: 'London / Remote', type: 'Full-time' },
                  { title: 'Middle East Correspondent', dept: 'International', loc: 'Beirut', type: 'Full-time' },
                  { title: 'Data Journalist', dept: 'Visuals', loc: 'London', type: 'Full-time' },
                  { title: 'Product Manager, Reader Revenue', dept: 'Product', loc: 'London / New York', type: 'Full-time' },
                  { title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Remote (UK/EU)', type: 'Full-time' },
                  { title: 'Climate Reporter', dept: 'Science', loc: 'London', type: 'Full-time' },
                ].map((job) => (
                  <div key={job.title} className="border border-[#e6e6e6] p-5 hover:border-[#bb1919] transition-colors group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-[17px] group-hover:text-[#bb1919] transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-3 mt-2 text-[13px] text-[#5a5a5a]">
                          <span className="flex items-center gap-1"><Briefcase size={14} />{job.dept}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin size={14} />{job.loc}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <ChevronRight className="text-[#8a8a8a] group-hover:text-[#bb1919] group-hover:translate-x-1 transition-all" size={20} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-[#202224] text-white">
                <h3 className="font-bold text-[18px] mb-2">Don't see your role?</h3>
                <p className="text-[14px] text-[#b4b4b4] mb-4">We're always looking for exceptional talent. Send your CV and portfolio.</p>
                <button className="bg-[#bb1919] px-5 py-2 text-[14px] font-medium hover:bg-[#a01515]">Send speculative application</button>
              </div>
            </div>
          </div>
        )}

        {/* ADVERTISE PAGE */}
        {currentPage === 'advertise' && (
          <div className="max-w-[900px] mx-auto">
            <div className="bg-white border border-[#e6e6e6] p-8 md:p-12">
              <h1 className="text-[36px] font-bold mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Advertise with Fugug Times</h1>
              <p className="text-[18px] text-[#5a5a5a] mb-8">Reach 47 million engaged readers who trust our journalism.</p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-12 text-center">
                {[
                  { stat: '47M', label: 'Monthly readers' },
                  { stat: '180', label: 'Countries' },
                  { stat: '73%', label: 'University educated' },
                  { stat: '4.2m', label: 'Avg. session (min)' },
                ].map((item) => (
                  <div key={item.label} className="p-4">
                    <div className="text-[32px] font-black text-[#bb1919]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{item.stat}</div>
                    <div className="text-[13px] text-[#5a5a5a] uppercase tracking-wide font-medium">{item.label}</div>
                  </div>
                ))}
              </div>

              <h2 className="text-[24px] font-bold mb-6">Advertising Solutions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Display & Native', desc: 'Premium placements across web, app, and newsletters. IAB standard and custom formats.' },
                  { title: 'Branded Content', desc: 'Studio team creates editorial-quality content that resonates with our audience.' },
                  { title: 'Video & Audio', desc: 'Pre-roll, mid-roll, and podcast sponsorships. 12M monthly video views.' },
                  { title: 'Events & Partnerships', desc: 'Sponsor our live journalism events, debates, and investigations.' },
                ].map((sol) => (
                  <div key={sol.title} className="border-l-4 border-[#bb1919] pl-5 py-2">
                    <h3 className="font-bold text-[16px] mb-1">{sol.title}</h3>
                    <p className="text-[14px] text-[#5a5a5a] leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-[#f9f9f9] p-8 text-center">
                <h3 className="font-bold text-[20px] mb-3">Ready to reach our audience?</h3>
                <p className="text-[#5a5a5a] mb-5">Contact our partnerships team for rates and availability.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="mailto:advertise@fugugtimes.com" className="bg-[#bb1919] text-white px-6 py-2.5 font-medium hover:bg-[#a01515] inline-flex items-center justify-center gap-2"><Mail size={16} /> advertise@fugugtimes.com</a>
                  <a href="tel:+442079460950" className="border border-[#202224] px-6 py-2.5 font-medium hover:bg-[#f0f0f0] inline-flex items-center justify-center gap-2"><Phone size={16} /> +44 20 7946 0950</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEGAL PAGES */}
        {(currentPage === 'terms' || currentPage === 'privacy' || currentPage === 'cookies') && (
          <div className="max-w-[800px] mx-auto bg-white border border-[#e6e6e6] p-8 md:p-12">
            <h1 className="text-[32px] font-bold mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              {currentPage === 'terms' ? 'Terms of Use' : currentPage === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'}
            </h1>
            <div className="prose max-w-none text-[15px] leading-[1.7] text-[#333]">
              <p className="text-[#5a5a5a] mb-6">Last updated: 15 May 2025</p>
              
              {currentPage === 'terms' && (
                <>
                  <h3 className="font-bold text-[18px] mt-8 mb-3">1. Acceptance of Terms</h3>
                  <p>By accessing Fugug Times, you agree to these terms. We provide news content for personal, non-commercial use.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">2. Content Usage</h3>
                  <p>All content is © 2025 Fugug Times Ltd. You may share links and brief excerpts with attribution. Reproduction requires written permission.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">3. User Accounts</h3>
                  <p>You are responsible for account security. We reserve the right to suspend accounts violating our community guidelines.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">4. Subscriptions</h3>
                  <p>Digital subscriptions auto-renew monthly. Cancel anytime via account settings. Refunds per our policy.</p>
                </>
              )}
              
              {currentPage === 'privacy' && (
                <>
                  <h3 className="font-bold text-[18px] mt-8 mb-3">Data We Collect</h3>
                  <p>We collect: email (for accounts), reading history (to personalize), device info (for security), and analytics (anonymized).</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">How We Use Data</h3>
                  <p>To deliver news, personalize experience, process payments, and improve our service. We never sell personal data.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">Your Rights (GDPR)</h3>
                  <p>You can access, correct, delete, or export your data anytime. Contact dpo@fugugtimes.com.</p>
                </>
              )}
              
              {currentPage === 'cookies' && (
                <>
                  <h3 className="font-bold text-[18px] mt-8 mb-3">Essential Cookies</h3>
                  <p>Required for login, security, and basic functionality. Cannot be disabled.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">Analytics Cookies</h3>
                  <p>Help us understand readership (Google Analytics 4, anonymized IP). Opt-out in settings.</p>
                  
                  <h3 className="font-bold text-[18px] mt-8 mb-3">Advertising Cookies</h3>
                  <p>Used for frequency capping and relevance. We do not use third-party tracking for subscribers.</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* LIVE / WATCH / PODCASTS */}
        {(currentPage === 'live' || currentPage === 'watch' || currentPage === 'podcasts') && (
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              {currentPage === 'live' && <div className="w-3 h-3 bg-[#bb1919] rounded-full animate-pulse" />}
              {currentPage === 'watch' && <Play size={24} className="text-[#bb1919]" fill="currentColor" />}
              {currentPage === 'podcasts' && <MessageSquare size={24} className="text-[#bb1919]" />}
              <h1 className="text-[32px] font-bold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {currentPage === 'live' ? 'Live News' : currentPage === 'watch' ? 'Watch' : 'Podcasts'}
              </h1>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-[#e6e6e6] overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-[#202224] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-[#bb1919] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={20} fill="white" className="ml-0.5" />
                      </div>
                    </div>
                    {currentPage === 'live' && <div className="absolute top-3 left-3 bg-[#bb1919] text-white px-2 py-1 text-[11px] font-bold">LIVE</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold leading-snug group-hover:text-[#bb1919]">
                      {currentPage === 'live' ? `Live: ${['Gaza crisis', 'US politics', 'UK Parliament'][i % 3]} updates` : 
                       currentPage === 'watch' ? ['The Briefing', 'In Depth: AI Revolution', 'Documentary: Climate Frontline'][i % 3] :
                       ['The Daily Take', 'Global News Podcast', 'Investigation'][i % 3]}
                    </h3>
                    <p className="text-[13px] text-[#5a5a5a] mt-1">{i * 12 + 5} minutes • {['2 hours', '5 hours', '1 day'][i % 3]} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOME PAGE */}
        {currentPage === 'home' && !selectedArticle && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
            <div>
              {featuredArticles.length > 0 && selectedCategory === 'Home' && (
                <div className="mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredArticles.map((article, idx) => (
                      <article key={article.id} onClick={() => openArticle(article)} className={`group cursor-pointer ${idx === 0 ? 'md:col-span-2' : ''}`}>
                        <div className={`bg-white ${idx === 0 ? 'md:grid md:grid-cols-[1.15fr_1fr] md:gap-0' : ''} border border-[#e6e6e6] hover:shadow-lg transition-shadow`}>
                          <div className={`relative overflow-hidden bg-[#e6e6e6] ${idx === 0 ? 'aspect-[16/10] md:aspect-auto md:h-full' : 'aspect-[16/9]'}`}>
                            <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                            {article.video && <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2.5 py-1.5 flex items-center gap-1.5 text-[12px] font-medium"><Play size={14} fill="white" /> VIDEO</div>}
                            {article.live && <div className="absolute top-3 left-3 bg-[#bb1919] text-white px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Live</div>}
                          </div>
                          <div className={`p-5 ${idx === 0 ? 'md:p-7' : ''}`}>
                            <div className="flex items-center gap-2 mb-2.5">
                              <span className="text-[#bb1919] text-[12px] font-bold uppercase tracking-wide">{article.category}</span>
                              <span className="text-[#8a8a8a] text-[12px]">•</span>
                              <span className="text-[#8a8a8a] text-[12px]">{article.timestamp}</span>
                            </div>
                            <h2 className={`font-bold leading-[1.2] group-hover:text-[#bb1919] transition-colors ${idx === 0 ? 'text-[26px] md:text-[32px] mb-3' : 'text-[20px] mb-2.5'}`} style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{article.title}</h2>
                            <p className={`text-[#5a5a5a] leading-[1.5] ${idx === 0 ? 'text-[16px] line-clamp-3' : 'text-[15px] line-clamp-2'}`}>{article.summary}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[22px] font-bold flex items-center gap-2.5" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}><span className="w-1 h-[22px] bg-[#bb1919]" />{selectedCategory === 'Home' ? 'Latest' : selectedCategory}</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regularArticles.map((article) => (
                    <article key={article.id} onClick={() => openArticle(article)} className="bg-white border border-[#e6e6e6] hover:shadow-md transition-all cursor-pointer group flex flex-col">
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#e6e6e6]">
                        <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                        {article.video && <div className="absolute bottom-2 left-2 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center"><Play size={14} fill="white" className="ml-0.5" /></div>}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2"><span className="text-[#bb1919] text-[11px] font-bold uppercase tracking-wide">{article.category}</span></div>
                        <h3 className="font-bold text-[17px] leading-[1.3] mb-2 group-hover:text-[#bb1919] transition-colors line-clamp-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{article.title}</h3>
                        <p className="text-[14px] text-[#5a5a5a] leading-[1.45] line-clamp-2 flex-1">{article.summary}</p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f0f0f0] text-[12px] text-[#8a8a8a]"><Clock size={12} /><span>{article.timestamp}</span></div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white border border-[#e6e6e6] p-5">
                <h2 className="text-[18px] font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}><TrendingUp size={18} className="text-[#bb1919]" />Most read</h2>
                <div className="space-y-3.5">
                  {articles.slice(0, 5).map((article, idx) => (
                    <div key={article.id} onClick={() => openArticle(article)} className="flex gap-3 cursor-pointer group">
                      <span className="text-[28px] font-black text-[#e6e6e6] leading-none group-hover:text-[#bb1919] transition-colors" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{idx + 1}</span>
                      <div className="flex-1 min-w-0"><h3 className="text-[14px] font-medium leading-[1.35] group-hover:text-[#bb1919] transition-colors line-clamp-2">{article.title}</h3><p className="text-[11px] text-[#8a8a8a] mt-1">{article.category}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#e6e6e6] p-5">
                <h2 className="text-[18px] font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}><div className="w-2 h-2 bg-[#bb1919] rounded-full animate-pulse" />Live</h2>
                <div className="space-y-4">
                  {[{ time: '14:28', text: 'UN Security Council to hold emergency session on Gaza' },{ time: '14:15', text: 'White House releases details of UAE AI partnership' },{ time: '13:52', text: 'Kentucky governor declares state of emergency' }].map((item, i) => (
                    <div key={i} className="flex gap-3"><span className="text-[12px] font-mono text-[#bb1919] font-medium mt-0.5">{item.time}</span><p className="text-[13px] leading-snug flex-1">{item.text}</p></div>
                  ))}
                </div>
                <button onClick={() => navigateTo('live')} className="w-full mt-4 py-2 border border-[#e6e6e6] text-[13px] font-medium hover:bg-[#f9f9f9] transition-colors">View live page</button>
              </div>

              <div className="bg-[#bb1919] text-white p-5">
                <h2 className="text-[18px] font-bold mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>The Fugug Briefing</h2>
                <p className="text-[13px] leading-snug text-white/90 mb-4">Get the day's top stories in your inbox at 7am</p>
                <form onSubmit={handleSignup} className="flex gap-2">
                  <input type="email" value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} placeholder="Email address" required className="flex-1 px-3 py-2 text-[13px] text-black focus:outline-none" />
                  <button type="submit" className="bg-[#202224] px-4 py-2 text-[13px] font-medium hover:bg-black transition-colors whitespace-nowrap">{signupSuccess ? '✓ Done' : 'Sign up'}</button>
                </form>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#202224] text-[#b4b4b4] mt-16">
        <div className="border-b border-[#3a3a3a]">
          <div className="max-w-[1280px] mx-auto px-4 py-8">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#bb1919] flex items-center justify-center"><span className="text-white font-black text-[20px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>F</span></div>
              <span className="text-white font-bold text-[20px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>FUGUG TIMES</span>
            </button>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[13px]">
              <div><h4 className="text-white font-semibold mb-3">News</h4><ul className="space-y-2">{['Home', 'World', 'Politics', 'Business', 'Technology'].map(link => (<li key={link}><button onClick={() => { setSelectedCategory(link); navigateTo('home'); }} className="hover:text-white transition-colors text-left">{link}</button></li>))}</ul></div>
              <div><h4 className="text-white font-semibold mb-3">Features</h4><ul className="space-y-2">{[{n:'In Depth',p:'home'},{n:'Live',p:'live'},{n:'Watch',p:'watch'},{n:'Podcasts',p:'podcasts'}].map(link => (<li key={link.n}><button onClick={() => navigateTo(link.p as Page)} className="hover:text-white transition-colors text-left">{link.n}</button></li>))}</ul></div>
              <div><h4 className="text-white font-semibold mb-3">Company</h4><ul className="space-y-2">{[{n:'About us',p:'about'},{n:'Contact',p:'contact'},{n:'Careers',p:'careers'},{n:'Advertise',p:'advertise'}].map(link => (<li key={link.n}><button onClick={() => navigateTo(link.p as Page)} className="hover:text-white transition-colors text-left">{link.n}</button></li>))}</ul></div>
              <div><h4 className="text-white font-semibold mb-3">Legal</h4><ul className="space-y-2">{[{n:'Terms',p:'terms'},{n:'Privacy',p:'privacy'},{n:'Cookies',p:'cookies'}].map(link => (<li key={link.n}><button onClick={() => navigateTo(link.p as Page)} className="hover:text-white transition-colors text-left">{link.n}</button></li>))}</ul></div>
              <div><h4 className="text-white font-semibold mb-3">Follow</h4><ul className="space-y-2"><li><a href="#" className="hover:text-white flex items-center gap-2"><Twitter size={14} /> Twitter</a></li><li><a href="#" className="hover:text-white flex items-center gap-2"><Facebook size={14} /> Facebook</a></li><li><a href="#" className="hover:text-white flex items-center gap-2"><Instagram size={14} /> Instagram</a></li><li><a href="#" className="hover:text-white flex items-center gap-2"><Youtube size={14} /> YouTube</a></li><li><a href="#" className="hover:text-white flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a></li></ul></div>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-4"><span>© 2025 Fugug Times Ltd</span><span className="hidden md:inline">•</span><button onClick={() => navigateTo('terms')} className="hover:text-white">Terms</button><button onClick={() => navigateTo('privacy')} className="hover:text-white">Privacy</button><button onClick={() => navigateTo('cookies')} className="hover:text-white">Cookies</button></div>
          <div className="flex items-center gap-2"><Users size={14} /><span>Trusted by 47 million readers monthly</span></div>
        </div>
      </footer>

      <style>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; } .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }`}</style>
    </div>
  );
}