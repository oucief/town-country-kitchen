import { useState } from 'react';

const PHONE = '+17858773511';
const FACEBOOK_URL = 'https://www.facebook.com/t.and.c22';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Town%20%26%20Country%20Kitchen%2C%20419%20E%20Holme%20St%2C%20Norton%2C%20KS%2067654';
const SALMON_POST_URL =
  'https://www.facebook.com/t.and.c22/posts/pfbid0onxKG9dzSk3cubTuTmHfDg4RcGDvEmEvPrYRMVXeUh6ze1C7Lq4LeW8TRZEn6bu5l';
const WEEKLY_MENU_POST_URL =
  'https://www.facebook.com/photo/?fbid=1092263186884034';
const PIE_POST_URL = 'https://www.facebook.com/photo/?fbid=1090595353717484';

const categories = [
  { id: 'breakfast', label: 'All-Day Breakfast', number: '01' },
  { id: 'burgers', label: 'Burgers & Sandwiches', number: '02' },
  { id: 'dinners', label: 'Comfort Dinners', number: '03' },
  { id: 'pies', label: 'Pies & Desserts', number: '04' },
];

const menu = {
  breakfast: [
    {
      name: 'Breakfast, whenever',
      description:
        'A hometown favorite from the first cup of coffee to a late-morning craving.',
      note: 'Served all day',
    },
    {
      name: 'Country breakfast plates',
      description:
        'Classic, hearty breakfast cooking. Call ahead to ask what is on the griddle today.',
      note: 'Ask about today’s choices',
    },
  ],
  burgers: [
    {
      name: 'Classic diner burgers',
      description:
        'A no-fuss favorite, cooked up fresh and ready for a proper lunch break.',
      note: 'Made to order',
    },
    {
      name: 'Prime rib sandwich',
      description:
        'A Monday-night special listed on the restaurant’s public Yelp page. Please call to confirm it is available.',
      price: '$11.99',
      note: 'Listed special · availability may vary',
    },
  ],
  dinners: [
    {
      name: 'Salmon special',
      description:
        'A recent special shared by the restaurant. Specials change, so call to see what is cooking tonight.',
      price: '$16',
      note: 'Recent Facebook post · confirm today’s price',
      source: SALMON_POST_URL,
    },
    {
      name: 'Chicken-fried chicken',
      description:
        'Featured on a public weekly specials menu alongside other homestyle plates.',
      note: 'Rotating special · call for today’s menu',
    },
    {
      name: 'Spaghetti & meatballs',
      description:
        'One of the rotating plates from a previously posted weekly specials menu.',
      note: 'Past special · call for current availability',
    },
    {
      name: 'Chicken enchiladas & rice',
      description:
        'A comfort-food favorite from a previously posted weekly specials menu.',
      note: 'Past special · call for current availability',
    },
  ],
  pies: [
    {
      name: 'Butterfinger pie',
      description: 'A playful, sweet pick from the pie case.',
      note: 'Homemade · availability varies',
    },
    {
      name: 'Salted caramel pie',
      description: 'A sweet-and-salty slice, featured in the restaurant’s pie lineup.',
      note: 'Homemade · availability varies',
    },
    {
      name: 'Cherry cheesecake',
      description: 'Creamy cheesecake with a classic cherry finish.',
      note: 'Homemade · availability varies',
    },
    {
      name: 'Strawberry rhubarb pie',
      description: 'A seasonal fruit-pie favorite from the posted pie list.',
      note: 'Homemade · availability varies',
    },
  ],
};

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="m10 1.7 2.55 5.17 5.7.83-4.13 4.02.97 5.68L10 14.72l-5.09 2.68.97-5.68L1.75 7.7l5.7-.83L10 1.7Z" />
    </svg>
  );
}

function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7v5l3.25 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m7.4 3.75 2.08 3.7-1.73 1.72a14.1 14.1 0 0 0 7.08 7.08l1.72-1.73 3.7 2.08-.9 3.15a1.5 1.5 0 0 1-1.7 1.07C10.7 19.7 4.3 13.3 3.18 6.35a1.5 1.5 0 0 1 1.07-1.7l3.15-.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Rating({ compact = false }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
      <span className="flex gap-0.5 text-mustard" aria-label="4.2 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} />
        ))}
      </span>
      <span className="font-bold text-navy">4.2</span>
      <span className="text-muted">· 543 Google reviews</span>
    </div>
  );
}

function MenuCard({ item, index }) {
  return (
    <article className="menu-card group">
      <div className="flex items-start gap-4">
        <span className="menu-card-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl leading-tight text-navy">{item.name}</h3>
            {item.price && (
              <span className="font-bold tabular-nums text-navy">{item.price}</span>
            )}
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{item.description}</p>
          <p className="mt-3 inline-flex rounded-full bg-cream px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-navy-light">
            {item.source ? (
              <a
                href={item.source}
                target="_blank"
                rel="noreferrer"
                className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {item.note}
              </a>
            ) : (
              item.note
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const currentCategory = categories.find(({ id }) => id === activeCategory);

  return (
    <div className="min-h-screen overflow-hidden bg-white text-ink">
      <div className="h-1.5 bg-mustard" />
      <header className="relative z-10 border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <a className="flex items-center gap-3" href="#home" aria-label="Town & Country Kitchen home">
            <span className="brand-mark">
              <span>T&amp;C</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg text-navy sm:text-xl">
                Town &amp; Country
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                Kitchen · Norton, Kansas
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-navy-light md:flex">
            <a className="nav-link" href="#menu">Our menu</a>
            <a className="nav-link" href="#visit">Hours &amp; location</a>
            <a
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-white transition hover:bg-navy-light"
              href={`tel:${PHONE}`}
            >
              <PhoneIcon />
              Call the kitchen
            </a>
          </nav>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white md:hidden"
            href={`tel:${PHONE}`}
            aria-label="Call Town and Country Kitchen"
          >
            <PhoneIcon />
            Call
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section relative bg-cream">
          <div className="hero-sun" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-12 lg:py-20">
            <div className="relative z-[1]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mustard/50 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-navy">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Good food. Good friends. Great times.
              </div>
              <h1 className="max-w-2xl font-display text-[3.45rem] leading-[0.98] tracking-[-0.035em] text-navy sm:text-6xl lg:text-7xl">
                Pull up a chair.
                <span className="mt-1 block text-navy-light">Stay for a while.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-navy-light sm:text-lg sm:leading-8">
                All-day breakfast, country cooking, classic burgers, daily lunch specials
                and a pie case worth saving room for. That’s the Town &amp; Country way.
              </p>
              <div className="mt-6">
                <Rating />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="button-primary" href={`tel:${PHONE}`}>
                  <PhoneIcon />
                  Call to order takeout
                  <ArrowIcon />
                </a>
                <a className="button-secondary" href={MAPS_URL} target="_blank" rel="noreferrer">
                  Get directions
                  <ArrowIcon />
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted sm:text-sm">
                <span>Dine-in</span>
                <span aria-hidden="true">•</span>
                <span>Takeout</span>
                <span aria-hidden="true">•</span>
                <span>Homemade pies</span>
                <span aria-hidden="true">•</span>
                <span>Daily specials</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -right-3 -top-4 z-[1] hidden h-20 w-20 rounded-full border border-mustard/50 sm:block" />
              <div className="hero-photo-frame">
                <img
                  className="hero-photo"
                  src="/images/pie-case.jpg"
                  alt="Crumb cake shared by Town & Country Kitchen on its public Facebook page"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                  <div className="text-white">
                    <p className="font-display text-2xl sm:text-3xl">Save a little room.</p>
                    <p className="mt-1 text-sm text-white/80">The pie case is calling.</p>
                  </div>
                  <a
                    className="rounded-full bg-white/95 p-3 text-navy transition hover:bg-mustard"
                    href={PIE_POST_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="See the restaurant's pie photo on Facebook"
                  >
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white px-5 py-4 shadow-card sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  A Norton favorite
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-display text-2xl text-navy">Made for the neighborhood</span>
                  <span className="text-xl text-mustard" aria-hidden="true">✳</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-navy/10 bg-white" aria-label="Restaurant highlights">
          <div className="mx-auto grid max-w-7xl gap-px bg-navy/10 px-5 sm:grid-cols-3 sm:px-8 lg:px-12">
            <div className="flex items-center gap-4 bg-white py-5 sm:py-6">
              <span className="highlight-icon"><ClockIcon /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Come on in</p>
                <p className="mt-1 font-semibold text-navy">Open every day</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white py-5 sm:justify-center sm:py-6">
              <span className="highlight-icon"><LocationIcon /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Right here in Norton</p>
                <p className="mt-1 font-semibold text-navy">419 E Holme St, Norton, KS</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white py-5 sm:justify-end sm:py-6">
              <span className="highlight-icon highlight-icon-gold"><span>$</span></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Good value</p>
                <p className="mt-1 font-semibold text-navy">$10–$20 typical spend*</p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="min-w-0">
              <p className="section-eyebrow">Pull up a menu</p>
              <h2 className="mt-3 max-w-sm font-display text-4xl leading-tight text-navy sm:text-5xl">
                The kind of cooking you come back for.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted">
                From early-morning favorites to a slice for the road, there’s something
                comforting on the table. Specials and pie flavors rotate.
              </p>
              <div className="mt-7 rounded-2xl border border-navy/10 bg-cream p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mustard text-navy">
                    <ClockIcon />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-navy">Ask what’s cooking today</p>
                    <p className="mt-1 text-sm text-muted">The fastest way to get today’s special.</p>
                  </div>
                </div>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy underline decoration-mustard decoration-2 underline-offset-4" href={`tel:${PHONE}`}>
                  Call {PHONE}
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <div>
              <div className="category-tabs" role="tablist" aria-label="Menu categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-tab ${activeCategory === category.id ? 'category-tab-active' : ''}`}
                    id={`tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category.id}
                    aria-controls="menu-panel"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-number">{category.number}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
              <div
                className="mt-5"
                id="menu-panel"
                role="tabpanel"
                aria-labelledby={`tab-${activeCategory}`}
                tabIndex={0}
              >
                <div className="mb-3 flex items-end justify-between gap-4 border-b border-navy/10 pb-4">
                  <div>
                    <p className="section-eyebrow">At the kitchen</p>
                    <h3 className="mt-1 font-display text-2xl text-navy">
                      {currentCategory.label}
                    </h3>
                  </div>
                  {activeCategory === 'pies' && (
                    <span className="hidden text-xs font-semibold text-muted sm:block">
                      Fresh flavors, while they last
                    </span>
                  )}
                </div>
                <div className="divide-y divide-navy/10">
                  {menu[activeCategory].map((item, index) => (
                    <MenuCard key={item.name} item={item} index={index} />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted">
                *Online listings describe a typical spend of $10–$20 per person. Individual
                menu prices were not available in a current published menu. Some specials
                and prices shown above are from dated public posts—please call to confirm
                today’s menu and pricing.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
            <div>
              <p className="section-eyebrow section-eyebrow-gold">A little something extra</p>
              <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight sm:text-5xl">
                The specials change. The welcome doesn’t.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/70">
                Chicken-fried chicken, spaghetti &amp; meatballs, chicken enchiladas and
                salmon have all appeared on Town &amp; Country’s public specials. Ask
                about today’s plate—and call early if you have your eye on a certain pie.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="button-primary" href={`tel:${PHONE}`}>
                  <PhoneIcon />
                  Call for today’s special
                  <ArrowIcon />
                </a>
                <a
                  className="button-dark-link"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow on Facebook
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <a
              className="menu-flyer group"
              href={WEEKLY_MENU_POST_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="View Town & Country Kitchen's previously posted weekly specials flyer on Facebook"
            >
              <img
                src="/images/weekly-menu.jpg"
                alt="A previously posted Town & Country Kitchen weekly specials flyer for September 21–27, 2026"
                loading="lazy"
              />
              <span className="menu-flyer-caption">
                Previously posted weekly menu · tap to view on Facebook
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>

        <section id="visit" className="bg-cream">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div>
              <p className="section-eyebrow">Find your way to us</p>
              <h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">See you at the table.</h2>
              <div className="mt-7 flex gap-4">
                <span className="highlight-icon shrink-0"><LocationIcon /></span>
                <div>
                  <p className="font-bold text-navy">Town &amp; Country Kitchen</p>
                  <p className="mt-1 leading-6 text-muted">419 E Holme St<br />Norton, KS 67654</p>
                  <a
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-navy underline decoration-mustard decoration-2 underline-offset-4"
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <span className="highlight-icon shrink-0"><PhoneIcon /></span>
                <div>
                  <p className="font-bold text-navy">Give us a ring</p>
                  <a className="mt-1 inline-block text-muted hover:text-navy" href={`tel:${PHONE}`}>
                    (785) 877-3511
                  </a>
                </div>
              </div>
            </div>
            <div className="hours-card">
              <div className="flex items-center justify-between gap-4 border-b border-navy/10 pb-5">
                <div>
                  <p className="section-eyebrow">Dine with us</p>
                  <h3 className="mt-1 font-display text-2xl text-navy">Hours</h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-navy">
                  <ClockIcon />
                </span>
              </div>
              <dl className="mt-2">
                <div className="hours-row">
                  <dt>Monday – Saturday</dt>
                  <dd>6:00 AM – 8:30 PM</dd>
                </div>
                <div className="hours-row">
                  <dt>Sunday</dt>
                  <dd>7:00 AM – 2:00 PM</dd>
                </div>
              </dl>
              <p className="mt-5 rounded-xl bg-cream p-4 text-sm leading-6 text-muted">
                Holiday hours may differ. A quick call is always welcome if you’re making
                a special trip.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Town &amp; Country Kitchen · Norton, Kansas</p>
          <a
            className="inline-flex items-center gap-1 font-semibold text-navy hover:underline"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
          >
            Photos &amp; specials shared by T&amp;C on Facebook
            <ArrowIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>

      <div className="mobile-cta" aria-label="Quick actions">
        <a
          className="mobile-directions"
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
        >
          <LocationIcon />
          <span>Directions</span>
        </a>
        <a className="mobile-call" href={`tel:${PHONE}`}>
          <PhoneIcon />
          <span>Call to order takeout</span>
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
