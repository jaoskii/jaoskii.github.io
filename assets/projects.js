/* Shared project data and themed SVG art for the work carousels and the work-*.html detail pages.
   Page-specific extras live in inventee.js, side.js and nda.js. */
window.PROJECTS = [
  {
    id: 'megarewards-platform',
    title: 'Megarewards platform',
    cat: 'Web · APIs',
    stack: ['Laravel', 'APIs', 'GoHighLevel', 'WordPress'],
    type: 'Client work · Vault Outsourcing, 2026',
    desc: 'Modernized megarewards.au and built its backend APIs, reporting dashboards and a central dashboard that pulls GoHighLevel and WordPress data into one place.',
    points: ['Backend APIs for the Megarewards website', 'Central dashboard merging GHL + WordPress data, simpler content management', 'iGO Direct discount offers API wired into the existing CRM', 'One Laravel API with 309 routes behind the site, admin dashboard, subscribe forms and app'],
    art: 'bars',
    layout: 'wall',
    /* dashboard shots are DOM-masked (staff name → "Admin User"); figures on state totals are the client's aggregates */
    shotGroups: [
      { id: 'all', label: 'All', note: 'Four front ends on one API: the public site, a subscribe funnel, the admin dashboard and the mobile app.' },
      { id: 'site', label: 'Website', note: 'megarewards.au: savings, giveaways and community partners, fed by the API instead of hand-edited pages.' },
      { id: 'subscribe', label: 'Subscribe form', note: 'subscribe.megarewards.au: a five-step signup that tags contacts in GoHighLevel. Routes and tags are set from the dashboard.' },
      { id: 'dashboard', label: 'Admin dashboard', note: 'Mega Admin: competitions, partners, reels, subscription forms, GHL reports and an asset bucket in one place.' },
      { id: 'api', label: 'API', note: 'Laravel API: 309 routes, admin JWT / API key / member JWT layers, hourly Facebook and GHL syncs.' },
    ],
    images: [
      ['assets/img/megarewards/site-hero.jpg', 'megarewards.au home hero: Save more. Experience more. Enjoy more.', 'site', 'Website · home'],
      ['assets/img/megarewards/site-savings.jpg', 'Mega Savings section with gift cards, discounts and cashbacks', 'site', 'Website · Mega Savings'],
      ['assets/img/megarewards/site-giveaways.jpg', 'Current giveaways slider on the Mega Loyalty Club section', 'site', 'Website · giveaways'],
      ['assets/img/megarewards/site-community.jpg', 'Mega Community partners carousel', 'site', 'Website · community'],
      ['assets/img/megarewards/site-partners.jpg', 'Subscribe-or-login prompt on megarewards.au', 'site', 'Website · subscribe prompt'],
      ['assets/img/megarewards/sub-1.jpg', 'Subscribe form step 1 of 5: name', 'subscribe', 'Subscribe · step 1'],
      ['assets/img/megarewards/sub-2.jpg', 'Subscribe form step 2 of 5: mobile and email', 'subscribe', 'Subscribe · step 2'],
      ['assets/img/megarewards/sub-3.jpg', 'Subscribe form step 3 of 5: suburb, state and consent', 'subscribe', 'Subscribe · step 3'],
      ['assets/img/megarewards/dash-overview.jpg', 'Mega Admin overview with competitions, partners, reels and event codes', 'dashboard', 'Dashboard · overview'],
      ['assets/img/megarewards/dash-competitions.jpg', 'Current competitions list with rollback and activation toggles', 'dashboard', 'Dashboard · competitions'],
      ['assets/img/megarewards/dash-subscription-forms.jpg', 'Subscription forms with GHL tags and dynamic routes', 'dashboard', 'Dashboard · subscription forms'],
      ['assets/img/megarewards/dash-subscribers-by-state.jpg', 'Weekly subscribers report with totals by state from GoHighLevel', 'dashboard', 'Dashboard · subscribers by state'],
      ['assets/img/megarewards/dash-reports.jpg', 'Reports tree with GHL competition subscriber exports', 'dashboard', 'Dashboard · reports'],
      ['assets/img/megarewards/dash-asset-bucket.jpg', 'Asset bucket media library synced with WordPress', 'dashboard', 'Dashboard · asset bucket'],
      ['assets/img/megarewards/dash-ux-tour.jpg', 'Mega UX Tour editor for the member onboarding tour', 'dashboard', 'Dashboard · UX tour'],
      ['assets/img/megarewards/api-hub.jpg', 'Diagram: one API serving the site, dashboard, app and subscribe forms', 'api', 'API · hub'],
      ['assets/img/megarewards/api-routes.jpg', 'Route map: 309 routes by consumer, methods and middleware', 'api', 'API · route map'],
    ],
  },
  {
    id: 'megarewards-app',
    title: 'Megarewards mobile app',
    cat: 'Mobile',
    stack: ['Flutter', 'Riverpod', 'APIs', 'CRM'],
    type: 'Client work · Vault Outsourcing, 2026',
    desc: 'Built the Megarewards mobile app on the existing APIs and CRM, then handled the release to both app stores.',
    points: ['Connected to the existing APIs and CRM', 'Released on the App Store and Google Play', 'Store release managed end to end'],
    art: 'phones',
    layout: 'pile',
    /* member name on the home screen is masked to "ALEX" */
    images: [
      ['assets/img/megarewards/app-onboarding.jpg', 'Megarewards app onboarding: free to subscribe, Mega Savings, Mega Loyalty Club'],
      ['assets/img/megarewards/app-home.jpg', 'Megarewards app sign-in, home and featured giveaway'],
      ['assets/img/megarewards/app-tabs.jpg', 'Megarewards app Savings, Giveaways and Community tabs'],
      ['assets/img/megarewards/app-offer.jpg', 'Megarewards app discount list and eGift card offer detail'],
      ['assets/img/megarewards/app-account.jpg', 'Megarewards app profile, giveaway entries and notifications (name masked)'],
      ['assets/img/megarewards/app-dark.jpg', 'Megarewards app in dark mode: home, Mega Savings and Mega Community'],
    ],
  },
  {
    id: 'somersoft',
    title: 'Somersoft',
    cat: 'Web · Full stack',
    stack: ['Next.js', 'APIs', 'Dashboards'],
    type: 'Client work · Vault Outsourcing, 2026',
    desc: 'API and front end for the Somersoft Property Investment Analysis system: a guided data entry, a live projection spreadsheet, charts and a portfolio builder, with every analysis saved to the server.',
    points: ['Data Entry Check List walks through property, finance, investor and what-if inputs', 'Editable projection spreadsheet: value, loan, equity, cash flow, depreciation, tax credit and IRR', 'Graphics and a Wealth Builder that models a portfolio year by year', 'Accounts created by an administrator; analyses autosave and reopen on any device'],
    art: 'form',
    layout: 'wall',
    /* sample analysis only; the account email in the header is masked */
    shotGroups: [
      { id: 'all', label: 'All', note: 'Property investment analysis in the browser: enter a property, then read the projection, the charts and the portfolio view.' },
      { id: 'analysis', label: 'Analysis', note: 'The projection spreadsheet, its charts and the Wealth Builder, all recalculated as values change.' },
      { id: 'entry', label: 'Data entry', note: 'A four-step check list that fills the spreadsheet: property, finance, investor and what-if rates.' },
      { id: 'account', label: 'Account', note: 'Sign-in, password reset and the list of saved analyses.' },
    ],
    images: [
      ['assets/img/somersoft/sheet.jpg', 'Investment analysis spreadsheet with a 10-year projection', 'analysis', 'Analysis · spreadsheet'],
      ['assets/img/somersoft/graphics.jpg', 'Charts: value vs loan, equity growth, after-tax cash flow and weekly cost', 'analysis', 'Analysis · graphics'],
      ['assets/img/somersoft/wealth.jpg', 'Wealth Builder: portfolio value, loans, net worth, LVR and DSR by year', 'analysis', 'Analysis · Wealth Builder'],
      ['assets/img/somersoft/step-property.jpg', 'Data Entry Check List, property step: price, state, rent and vacancy', 'entry', 'Data entry · property'],
      ['assets/img/somersoft/step-finance.jpg', 'Data Entry Check List, finance step: deposit, loan type, rate and term', 'entry', 'Data entry · finance'],
      ['assets/img/somersoft/home.jpg', 'Saved analyses home after sign-in', 'account', 'Account · home'],
      ['assets/img/somersoft/login.jpg', 'Somersoft Property Investment Analysis sign-in', 'account', 'Account · sign-in'],
      ['assets/img/somersoft/forgot.jpg', 'Somersoft forgot-password page', 'account', 'Account · forgot password'],
    ],
  },
  {
    id: 'paymaya-installments',
    nda: true,
    title: 'PayMaya Installments',
    cat: 'Web · Fintech',
    stack: ['React', 'Node'],
    type: 'Client work · Maya PH via Ascendion, 2025–2026',
    desc: 'The full Installments feature for the PayMaya web portal: feature set, eligibility rules and transaction limits set by product and compliance.',
    points: ['Feature built end to end in React and Node.js', 'Eligibility rules and transaction limits from compliance', 'Built into a large legacy codebase, following its existing patterns'],
    art: 'form',
  },
  {
    id: 'maya-business-bills',
    nda: true,
    title: 'Maya Business Bills payment',
    cat: 'Mobile · Fintech',
    stack: ['Flutter', 'Dart'],
    type: 'Client work · Maya PH via Ascendion, 2025–2026',
    desc: 'Bills payment for the Maya Business App (MBM 3.0) on the in-house Flutter framework (FAF), ported from the old native app.',
    points: ['Ported from MBM Native to MBM 3.0', 'Built on the in-house Flutter framework (FAF)', 'Connected to internal service APIs'],
    art: 'phones',
  },
  {
    id: 'wmata-transit',
    title: 'WMATA transit monitor',
    cat: 'Mobile · APIs',
    stack: ['iOS', 'Android', 'REST API', 'Auth'],
    type: 'Client work · Diversified Robotics (US), 2024–2025',
    desc: 'iOS and Android app that tracks WMATA trains and buses, with live vehicle status and details for every station and bus stop.',
    points: ['Live train and bus status', 'REST APIs, data models and transit data feeds', 'One login system shared by the apps and the web app', 'Shipped as Metro Pulse, WMATA’s official app on Google Play and the App Store'],
    art: 'phones',
    layout: 'desk',
    /* captured from the Play Store build with the emulator GPS set to Metro Center */
    images: [
      ['assets/img/wmata/explore.jpg', 'Metro Pulse explore map with nearby rail arrivals and the Metro Center station sheet'],
      ['assets/img/wmata/station.jpg', 'Metro Center arrivals, station info with first and last trains, and service alerts'],
      ['assets/img/wmata/bus.jpg', 'Nearby bus routes and a bus stop with live arrivals'],
      ['assets/img/wmata/plan.jpg', 'Trip planner from Metro Center to Union Station, chat support and the More menu'],
      ['assets/img/wmata/dark.jpg', 'Metro Pulse in dark mode: explore map, Metro Center arrivals and the More menu'],
      ['assets/img/wmata/maps-settings.jpg', 'System maps, app settings and favorites'],
    ],
  },
  {
    id: 'rdms-mobile',
    title: 'RDMS Mobile v2',
    cat: 'Mobile · Enterprise',
    stack: ['Flutter', 'Laravel'],
    type: 'Rebisco Biscuit Corporation, 2021–2024',
    desc: 'Distribution management platform used by field sales teams across the country. Led the mobile and API work.',
    points: ['Laravel API endpoints tuned for large datasets', 'New Flutter modules every sprint', 'Reworked repo branching, CI/CD builds for each branch'],
    art: 'phones',
    layout: 'fan',
    images: [
      ['assets/img/rdms/call-sheet.jpg', 'RDMS call sheet with suggested orders, quantities and points'],
      ['assets/img/rdms/sku-catalog.jpg', 'RDMS SKU catalog filtered by brand and category'],
      ['assets/img/rdms/order-summary.jpg', 'RDMS order summary with gross sales, VAT and SKU achievement'],
      ['assets/img/rdms/review-plans.jpg', 'RDMS outlet plan review with weekly sales objective'],
    ],
  },
  {
    id: 'syngenta-elearning',
    nda: true,
    title: 'Syngenta e-learning',
    cat: 'Web · E-learning',
    stack: ['Angular', 'Django'],
    type: 'Client work · Cushyfy Solutions, 2020–2021',
    desc: 'E-learning platform and analytics dashboard. Angular front end, Python/Django backend, plus a reporting module.',
    points: ['Built the Angular front end', 'Maintained the Django backend', 'Reports on learner progress and usage'],
    art: 'bars',
  },
  {
    id: 'chattee',
    title: 'Chattee messaging bot',
    cat: 'Web · Multi-tenant',
    stack: ['Laravel', 'Angular', 'Messenger', 'Viber', 'Telegram'],
    type: 'Cushyfy Solutions, 2020–2021 · screens are a concept recreation',
    desc: 'Multi-tenant ordering bot for Messenger, Viber and Telegram: customers fill in forms inside the chat, and each business works the orders from its own workspace, run from an operator console.',
    points: ['Designed the architecture and built it', 'Laravel backend coordinating several external APIs, SMS and email', 'Angular merchant dashboard', 'Database schema designed from scratch for per-tenant flows'],
    art: 'form',
    layout: 'cascade',
    /* concept screens recreated for the portfolio with sample data; the original build is no longer online */
    shotGroups: [
      { id: 'all', label: 'All', note: 'Concept recreation: orders arrive as form replies inside Messenger, Viber and Telegram, and land in one inbox per business.' },
      { id: 'site', label: 'Marketing site', note: 'The pitch: take orders where customers already chat, one inbox for every channel.' },
      { id: 'tenant', label: 'Tenant app', note: 'Each business gets its own workspace: an orders inbox, a flow builder and a form builder.' },
      { id: 'chat', label: 'In chat', note: 'What the customer sees: a menu card, an order form in a webview and status updates in the thread.' },
      { id: 'console', label: 'Console', note: 'Operator console: provision tenants, watch channel health and webhook latency.' },
    ],
    images: [
      ['assets/img/chattee/site.jpg', 'Chattee concept: marketing site, take orders where your customers already chat', 'site', 'Marketing · hero'],
      ['assets/img/chattee/tenant-orders.jpg', 'Chattee concept: tenant orders inbox fed by Messenger, Viber, Telegram and WhatsApp', 'tenant', 'Tenant · orders inbox'],
      ['assets/img/chattee/tenant-flow.jpg', 'Chattee concept: conversation flow builder with message, form, lookup, condition and action steps', 'tenant', 'Tenant · flow builder'],
      ['assets/img/chattee/tenant-form.jpg', 'Chattee concept: order form builder with conditional fields and a live chat preview', 'tenant', 'Tenant · form builder'],
      ['assets/img/chattee/chat.jpg', 'Chattee concept: ordering inside Messenger, the in-chat order form, and order tracking in Viber', 'chat', 'In chat · Messenger + Viber'],
      ['assets/img/chattee/console-tenants.jpg', 'Chattee concept: operator console tenant list with channels and health', 'console', 'Console · tenants'],
    ],
  },
  {
    id: 'taguig-tax-portal',
    nda: true,
    title: 'Taguig property tax portal',
    cat: 'Web · Government',
    stack: ['Angular', 'Vue', 'CodeIgniter'],
    type: 'Client work · Cushyfy Solutions, 2020–2021',
    desc: 'Property tax payment portal: Angular front end for citizens, plus a separate Vue admin dashboard built to the client\'s spec.',
    points: ['Angular front end for citizens', 'Vue admin dashboard built to the client\'s spec', 'Helped maintain the CodeIgniter backend'],
    art: 'form',
  },
  {
    id: 'traqs-loyalty',
    nda: true,
    title: 'TRAQS merchant loyalty',
    cat: 'Web · Loyalty',
    stack: ['Vue', 'Laravel'],
    type: 'Client work · Cushyfy Solutions, 2020–2021',
    desc: 'Loyalty system for merchants: Vue dashboard and Laravel loyalty APIs, with users verified against the client\'s main backend.',
    points: ['Vue merchant dashboard', 'Laravel loyalty APIs', 'Email + SMS notifications'],
    art: 'bars',
  },
  {
    id: 'aims',
    title: 'AIMS accounting & inventory',
    cat: 'Web · ERP',
    stack: ['Yii2', 'Laravel', 'Vue', 'Quasar', 'MySQL'],
    type: 'Solutionbase Corporation, 2015–2020',
    desc: 'Accounting and inventory monitoring system. Built on Yii2 with a MySQL schema designed from scratch, later moved to Laravel with a Vue/Quasar hybrid front end.',
    points: ['Yii2 + jQuery/Bootstrap first build on a MySQL schema designed from scratch', 'Moved from Yii2 to Laravel + Vue/Quasar', 'Laravel service pulling POS data from legacy VB.NET systems', 'Universe variant for a pharmacy chain: POS-fed sales journals, senior/PWD pricing, lot and expiry per line'],
    art: 'kit',
    layout: 'cascade',
    shotGroups: [
      { id: 'all', label: 'All', note: 'AIMS as deployed for a pharmacy chain: POS-fed sales, lots and expiry, the books, and per-client theming.' },
      { id: 'ops', label: 'Operations', note: 'Daily work: the dashboard and the documents that post to stock and the ledger.' },
      { id: 'masters', label: 'Master files', note: 'Items with lots, generics and bins, and a tree-shaped chart of accounts.' },
      { id: 'system', label: 'System', note: 'Per-client theming and the sign-in that every branch starts from.' },
    ],
    // figures, names and line items in these shots are sample data, not the client's
    images: [
      ['assets/img/aims/universe-dashboard.jpg', 'AIMS Universe dashboard with transaction counts, AR/AP and a three-year sales comparison', 'ops', 'Universe · dashboard'],
      ['assets/img/aims/universe-sales-journal.jpg', 'AIMS Universe sales journal with item lines, discounts and posting status', 'ops', 'Universe · sales journal'],
      ['assets/img/aims/universe-chart-of-accounts.jpg', 'AIMS chart of accounts tree with account attributes', 'masters', 'Universe · chart of accounts'],
      ['assets/img/aims/universe-theme-customizer.jpg', 'AIMS theme customizer with five client themes', 'system', 'Universe · theme customizer'],
      ['assets/img/aims/universe-stockcard.jpg', 'AIMS Universe stockcard ledger for a prescription item', 'masters', 'Universe · stockcard'],
      ['assets/img/aims/aims-sign-in.jpg', 'AIMS sign-in screen', 'system', 'AIMS · sign-in'],
    ],
  },
];

window.escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Mock artwork per project. Colours, stroke, radius and shadow come from --art-* custom properties,
   so each style themes the same drawing differently. */
window.projectArt = function (kind) {
  const r = (x, y, w, h, c) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const shapes = {
    tiles: r(20, 20, 120, 95, 'a0') + r(155, 20, 225, 95, 'a1') + r(20, 130, 225, 100, 'a2') + r(260, 130, 120, 100, 'a3'),
    form: r(40, 28, 320, 194, 'a0') + r(70, 58, 190, 14, 'a2') + r(70, 86, 130, 14, 'a3') + r(70, 150, 120, 40, 'a1') + '<circle class="a2" cx="318" cy="72" r="22"/>',
    bars: [60, 120, 90, 170, 130].map((h, i) => r(40 + i * 66, 220 - h, 46, h, i === 3 ? 'a1' : i === 1 ? 'a2' : 'a0')).join('') + r(30, 224, 340, 4, 'a3'),
    phones: r(105, 22, 84, 206, 'a0') + r(118, 44, 58, 34, 'a1') + r(118, 88, 58, 10, 'a2') + r(118, 106, 40, 10, 'a2') + r(212, 12, 84, 206, 'a1') + r(225, 34, 58, 120, 'a0'),
    kit: r(40, 70, 110, 110, 'a0') + r(110, 45, 110, 110, 'a1') + r(180, 80, 110, 110, 'a2') + r(250, 55, 110, 110, 'a3') + '<circle class="a1" cx="340" cy="200" r="22"/>',
  };
  return `<svg class="art-svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${r(0, 0, 400, 250, 'bg')}${shapes[kind] || shapes.tiles}</svg>`;
};

/* Real screenshots for projects that have them; several images cross-fade (see the timer below). */
window.projectShots = function (p) {
  const esc = window.escapeHTML;
  return `<div class="art-shots">${p.images.map(([src, alt], k) =>
    `<img src="${esc(src)}" alt="${esc(alt)}" ${k ? 'loading="lazy" ' : ''}class="${k ? '' : 'on'}" draggable="false">`).join('')}</div>`;
};
setInterval(() => {
  if (document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.art-shots:not(.shots-stack)').forEach(box => {
    const imgs = box.children; if (imgs.length < 2) return;
    const k = [...imgs].findIndex(im => im.classList.contains('on')); if (k < 0) return;
    imgs[k].classList.remove('on'); imgs[(k + 1) % imgs.length].classList.add('on');
  });
}, 2800);

/* Fill a <template> string: {{title}}, {{desc}}, {{art}}, {{chips}}, {{points}}, {{n}}, {{total}} ... */
window.fillProject = function (tpl, p, i, n, chipClass) {
  const esc = window.escapeHTML;
  const red = s => (p.nda && window.ndaRedact ? window.ndaRedact(s) : s); // ~~word~~ redaction bars, NDA projects only
  const map = {
    id: p.id, i: i, n: String(i + 1).padStart(2, '0'), total: String(n).padStart(2, '0'),
    title: esc(p.title), cat: esc(p.cat), type: esc(p.type) + (p.nda ? ' · under NDA' : ''),
    desc: red(esc(p.desc)), points: p.points.map(s => `<li>${red(esc(s))}</li>`).join(''),
    art: p.images ? window.projectShots(p) : p.nda && window.ndaArt ? window.ndaArt(p) : window.projectArt(p.art),
    chips: p.stack.map(s => `<span class="${chipClass || ''}">${esc(s)}</span>`).join(''),
  };
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in map ? map[k] : ''));
};
