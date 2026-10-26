/* Project data for the work carousel (home) and the case-study slider (work.html).
   Order: inventee first, then client work, then the extra NDA and side-project slides. */

export type Link = [label: string, url: string];
/** [src, alt, group?, label?]: groups drive the filter tabs on work.html */
export type Shot = [src: string, alt: string, group?: string, label?: string];
export type ArtKind = 'tiles' | 'form' | 'bars' | 'phones' | 'kit';
export type Layout = 'desk' | 'cascade' | 'fan' | 'wall' | 'pile';

/** A group's optional desc / points / stack / links replace the project's own in the details card while its tab is picked. */
export interface ShotGroup {
  id: string;
  label: string;
  note: string;
  desc?: string;
  points?: string[];
  stack?: string[];
  links?: Link[];
}

export interface Project {
  id: string;
  title: string;
  cat: string;
  stack: string[];
  type: string;
  desc: string;
  points: string[];
  art: ArtKind;
  layout?: Layout;
  links?: Link[];
  images?: Shot[];
  shotGroups?: ShotGroup[];
  /** NDA projects: no screenshots, a redacted case file instead (see NdaArt). ~~word~~ in desc/points shows as a bar. */
  nda?: boolean;
  ndaNote?: string;
  ndaKind?: 'web' | 'mobile';
  ndaRole?: string;
  ndaClient?: string;
  ndaStatus?: string;
}

/** Bump when the covers are re-rendered (same file names, so browsers would keep the old ones) */
export const COVERS_V = '20261023b';

/* inventee.io case study */
const INVENTEE: Project = {
  id: 'inventee',
  title: 'inventee.io',
  cat: 'SaaS · Multi-tenant',
  stack: ['NestJS', 'GraphQL', 'PostgreSQL', 'React', 'Flutter'],
  type: 'Side project · inventee.io, 2026',
  desc: 'Inventory and accounting SaaS for businesses that buy, stock and sell. A marketing site, a workspace per company at yourcompany.inventee.io, an operator console that provisions them, and a Flutter mobile app.',
  points: [
    'Database per tenant: each company gets its own Postgres database, provisioned from the console',
    '22 document types post once to the stock card, the general ledger and the subledgers, with FIFO cost and lot expiry',
    'Password + emailed sign-in code, rotating refresh tokens, roles per action and a full audit trail',
    'Operator console: tenants, invites, storage limits, live sign-ins, themes and platform audit log',
  ],
  art: 'tiles',
  layout: 'desk',
  links: [['inventee.io', 'https://inventee.io']],
  /* shots: [src, alt, group, label]; groups drive the filter tabs and note card on the case-study page,
     and a group's optional desc / points / stack / links replace the project's own in the details card */
  shotGroups: [
    { id: 'all', label: 'All', note: 'The whole product: a marketing site, a workspace for every company, the console that runs them, a mobile app and the API behind them all.' },
    { id: 'site', label: 'Marketing site', note: 'www.inventee.io: the pitch, a sample branch dashboard and an inquiry form that lands in the console.',
      desc: 'www.inventee.io sells the product: what it does, a sample branch dashboard and a stock card you can try before talking to anyone.',
      points: ['Live stock card demo that posts a receiving report', 'Sample branch dashboard', 'Inquiry form instead of open signup; leads land in the operator console'],
      stack: ['React', 'Radix UI'] },
    { id: 'tenant', label: 'Tenant app', note: "Each company's own workspace at yourcompany.inventee.io: documents, stock, the books and 94 reports.",
      desc: "Each company's own workspace at yourcompany.inventee.io, where documents, stock and the books stay in step.",
      points: ['22 document types post once to the stock card, the general ledger and the subledgers', 'FIFO cost and lot expiry on every line', 'Roles and permissions per module and action, with a full audit trail', 'Report catalog with 94 reports'],
      stack: ['React', 'Radix UI', 'Apollo Client', 'GraphQL'] },
    { id: 'console', label: 'Console', note: 'Operator console: provision tenants, invite first admins, watch sign-ins and storage, set themes.',
      desc: 'The operator console that runs the platform: every workspace, its database and its first admin start here.',
      points: ['Provision a tenant and its own Postgres database', 'Invite first admins and track invite status', 'Live sign-ins and storage limits per workspace', 'Eleven light and dark themes, plus the platform audit log'],
      stack: ['React', 'Radix UI'] },
    { id: 'mobile', label: 'Mobile', note: 'One iOS and Android app for every workspace: scan a product, work the documents, check the books.',
      desc: "One Flutter app for every workspace on iOS and Android: enter your workspace, sign in, and the app takes on that company's branding.",
      points: ['Product inquiry by camera scan, hardware scanner or search: stock per warehouse with expiry, prices and stockcard history', "The web app's document engine: 14 stock and 8 accounting document types, scan-burst entry, post / unpost and read-only GL entries", 'Masters, utilities and admin (users, roles, branches, lock date); everything but reports and printing', 'Tablet layout, 11 light and dark themes, Maestro end-to-end flows on iOS and Android'],
      stack: ['Flutter', 'Dart', 'Riverpod', 'GraphQL'] },
    { id: 'api', label: 'API', note: 'api.inventee.io: one NestJS GraphQL API, a Postgres database per company, picked per request from the X-Tenant header.',
      desc: 'api.inventee.io: one NestJS GraphQL API behind the site, every workspace, the console and the mobile app.',
      points: ['127 GraphQL operations, grouped by module, each behind guards', 'Database per company, picked per request from the X-Tenant header', 'Password + emailed sign-in code, rotating refresh tokens'],
      stack: ['NestJS', 'GraphQL', 'Prisma', 'PostgreSQL'] },
  ],
  images: [
    ['assets/img/inventee/site-hero.jpg', 'inventee.io marketing site hero: Every unit, accounted for', 'site', 'Marketing · hero'],
    ['assets/img/inventee/site-dashboard.jpg', 'inventee.io marketing site with a sample branch dashboard', 'site', 'Marketing · sample dashboard'],
    ['assets/img/inventee/site-stock-card.jpg', 'Marketing site live stock card demo posting a receiving report', 'site', 'Marketing · stock card demo'],
    ['assets/img/inventee/tenant-sign-in.jpg', 'Tenant workspace sign-in with a live stock card', 'tenant', 'Tenant · sign-in'],
    ['assets/img/inventee/tenant-dashboard.jpg', 'Tenant dashboard with sales, receivables, payables and unposted documents', 'tenant', 'Tenant · dashboard'],
    ['assets/img/inventee/tenant-sales-journal.jpg', 'Posted sales journal with barcode item lines', 'tenant', 'Tenant · sales journal'],
    ['assets/img/inventee/tenant-items.jpg', 'Stockcard item master with stock, expiry and inventory value tiles', 'tenant', 'Tenant · item master'],
    ['assets/img/inventee/tenant-reports.jpg', 'Report catalog with 94 reports and balance sheet filters', 'tenant', 'Tenant · reports'],
    ['assets/img/inventee/tenant-roles.jpg', 'Roles and permissions matrix per module and action', 'tenant', 'Tenant · roles & permissions'],
    ['assets/img/inventee/console-overview.jpg', 'Operator console overview: workspaces, users, storage and workspace health', 'console', 'Console · overview'],
    ['assets/img/inventee/console-tenants.jpg', 'Operator console tenant list with first-admin invite status', 'console', 'Console · tenants'],
    ['assets/img/inventee/console-themes.jpg', 'Operator console theme picker with eleven light and dark themes', 'console', 'Console · themes'],
    ['assets/img/inventee/mobile-1.jpg', 'Inventee mobile app: workspace sign-in, the home dashboard with this month\'s sales, purchases, receivables and payables, and a product inquiry with stock by warehouse, expiry and price', 'mobile', 'Mobile · sign-in to dashboard'],
    ['assets/img/inventee/mobile-2.jpg', 'Inventee mobile app: the Documents menu, a posted sales journal with lot expiry per line, and its balanced accounting entries', 'mobile', 'Mobile · documents & GL entries'],
    ['assets/img/inventee/mobile-3.jpg', 'Inventee mobile app: an item stockcard with running balance, then the Masters and More menus in dark mode', 'mobile', 'Mobile · stock, masters & admin'],
    ['assets/img/inventee/api-hub.jpg', 'Diagram: one API serving the marketing site, tenant app and console, with a database per company', 'api', 'API · hub'],
    ['assets/img/inventee/api-schema.jpg', 'Schema map: 127 GraphQL operations by module, guards and a sample stock card query', 'api', 'API · schema map'],
  ],
};

const CLIENT: Project[] = [
  {
    id: 'megarewards-platform',
    title: 'Megarewards platform',
    cat: 'Web · Mobile · APIs',
    stack: ['Laravel', 'Flutter', 'GoHighLevel', 'WordPress'],
    type: 'Client work · Vault Outsourcing, 2026',
    desc: 'Modernized megarewards.au and built its backend APIs, reporting dashboards, a central dashboard that pulls GoHighLevel and WordPress data into one place, and the member mobile app.',
    points: ['Backend APIs for the Megarewards website', 'Central dashboard merging GHL + WordPress data, simpler content management', 'iGO Direct discount offers API wired into the existing CRM', 'One Laravel API with 309 routes behind the site, admin dashboard, subscribe forms and app', 'Flutter member app on the same API and CRM, currently shipping to the App Store and Google Play'],
    art: 'bars',
    layout: 'wall',
    /* dashboard shots are DOM-masked (staff name → "Admin User"); figures on state totals are the client's aggregates;
       member name on the app home screen is masked to "ALEX" */
    links: [['megarewards.au', 'https://megarewards.au'], ['Subscribe form', 'https://subscribe.megarewards.au']],
    /* optional desc / points / stack / links per group replace the project's own in the details card while that tab is picked */
    shotGroups: [
      { id: 'all', label: 'All', note: 'Four front ends on one API: the public site, a subscribe funnel, the admin dashboard and the mobile app.' },
      { id: 'site', label: 'Website', note: 'megarewards.au: savings, giveaways and community partners, fed by the API instead of hand-edited pages.',
        desc: 'Modernized megarewards.au so savings, giveaways and community partners come from the API instead of hand-edited pages.',
        points: ['Mega Savings: gift cards, discounts and cashbacks', 'Current giveaways for the Mega Loyalty Club', 'Mega Community partners carousel', 'Subscribe-or-login prompt that leads into the subscribe funnel'],
        links: [['megarewards.au', 'https://megarewards.au']] },
      { id: 'subscribe', label: 'Subscribe form', note: 'subscribe.megarewards.au: a five-step signup that tags contacts in GoHighLevel. Routes and tags are set from the dashboard.',
        desc: 'subscribe.megarewards.au: a five-step signup that lands every new member in GoHighLevel, already tagged.',
        points: ['Five short steps instead of one long form', 'Each signup tagged in GoHighLevel for the right campaign', 'Routes and tags set per form from the admin dashboard, no code changes'],
        links: [['Subscribe form', 'https://subscribe.megarewards.au']] },
      { id: 'dashboard', label: 'Admin dashboard', note: 'Mega Admin: competitions, partners, reels, subscription forms, GHL reports and an asset bucket in one place.',
        desc: 'Mega Admin: one dashboard where the team runs competitions, partners, reels and signup forms, with GoHighLevel and WordPress data pulled into one place.',
        points: ['Competitions with activation toggles and rollback', 'Subscription forms with GHL tags and dynamic routes', 'Weekly subscribers by state and competition exports from GoHighLevel', 'Asset bucket synced with WordPress, plus an editor for the member onboarding tour'] },
      { id: 'app', label: 'App', note: 'The member app: savings, giveaways and community in your pocket, on the same API as the website.',
        desc: 'Built the Megarewards member app on the existing APIs and CRM, and currently shipping it to the App Store and Google Play.',
        points: ['Onboarding, sign-in and a home feed of featured offers and giveaways', 'Mega Savings, Giveaways and Community tabs, with offer and eGift card detail', 'Profile with giveaway entries and notifications, plus a dark mode', 'Currently shipping to the App Store and Google Play, with the store release handled end to end'],
        stack: ['Flutter', 'Riverpod', 'APIs', 'CRM'], links: [] },
      { id: 'api', label: 'API', note: 'Laravel API: 309 routes, admin JWT / API key / member JWT layers, hourly Facebook and GHL syncs.',
        desc: 'One Laravel API behind the website, the subscribe forms, the admin dashboard and the mobile app.',
        points: ['309 routes, grouped by the app that calls them', 'Three auth layers: admin JWT, API key and member JWT', 'Hourly Facebook and GoHighLevel syncs', 'iGO Direct discount offers API wired into the existing CRM'],
        stack: ['Laravel', 'REST', 'JWT', 'GoHighLevel'] },
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
      ['assets/img/megarewards/app-onboarding.jpg', 'Megarewards app onboarding: free to subscribe, Mega Savings, Mega Loyalty Club', 'app', 'App · onboarding'],
      ['assets/img/megarewards/app-home.jpg', 'Megarewards app sign-in, home and featured giveaway', 'app', 'App · sign-in & home'],
      ['assets/img/megarewards/app-tabs.jpg', 'Megarewards app Savings, Giveaways and Community tabs', 'app', 'App · savings, giveaways, community'],
      ['assets/img/megarewards/app-offer.jpg', 'Megarewards app discount list and eGift card offer detail', 'app', 'App · offer detail'],
      ['assets/img/megarewards/app-account.jpg', 'Megarewards app profile, giveaway entries and notifications (name masked)', 'app', 'App · profile & entries'],
      ['assets/img/megarewards/app-dark.jpg', 'Megarewards app in dark mode: home, Mega Savings and Mega Community', 'app', 'App · dark mode'],
      ['assets/img/megarewards/api-hub.jpg', 'Diagram: one API serving the site, dashboard, app and subscribe forms', 'api', 'API · hub'],
      ['assets/img/megarewards/api-routes.jpg', 'Route map: 309 routes by consumer, methods and middleware', 'api', 'API · route map'],
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
    links: [['Live app', 'https://somersoft.mypropertyhouse.com.au']],
    shotGroups: [
      { id: 'all', label: 'All', note: 'Property investment analysis in the browser: enter a property, then read the projection, the charts and the portfolio view.' },
      { id: 'analysis', label: 'Analysis', note: 'The projection spreadsheet, its charts and the Wealth Builder, all recalculated as values change.',
        desc: 'The core of the product: a projection spreadsheet, its charts and a portfolio builder, all recalculated the moment a value changes.',
        points: ['Editable 10-year projection: value, loan, equity, cash flow, depreciation, tax credit and IRR', 'Charts for value vs loan, equity growth, after-tax cash flow and weekly cost', 'Wealth Builder: portfolio value, loans, net worth, LVR and DSR year by year'] },
      { id: 'entry', label: 'Data entry', note: 'A four-step check list that fills the spreadsheet: property, finance, investor and what-if rates.',
        desc: 'A guided Data Entry Check List that fills the spreadsheet in four steps, so nobody starts from a blank grid.',
        points: ['Property: price, state, rent and vacancy', 'Finance: deposit, loan type, rate and term', 'Investor details and what-if rates feed the same projection'] },
      { id: 'account', label: 'Account', note: 'Sign-in, password reset and the list of saved analyses.',
        desc: 'Accounts are created by an administrator, and every analysis is saved to the server as you work.',
        points: ['Sign-in and self-serve password reset', 'Saved analyses list right after sign-in', 'Autosave to the API, so an analysis reopens on any device'] },
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
    type: 'Client work · Maya PH via Ascendion, 2025-2026',
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
    type: 'Client work · Maya PH via Ascendion, 2025-2026',
    desc: 'Bills payment for the Maya Business App (MBM 3.0) on the in-house Flutter framework (FAF), ported from the old native app.',
    points: ['Ported from MBM Native to MBM 3.0', 'Built on the in-house Flutter framework (FAF)', 'Connected to internal service APIs'],
    art: 'phones',
  },
  {
    id: 'wmata-transit',
    title: 'WMATA transit monitor',
    cat: 'Mobile · APIs',
    stack: ['iOS', 'Android', 'REST API', 'Auth'],
    type: 'Client work · Diversified Robotics (US), 2024-2025',
    links: [['App Store', 'https://apps.apple.com/us/app/metro-pulse/id6737127867'], ['Google Play', 'https://play.google.com/store/apps/details?id=com.wmata.metropulse']],
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
    type: 'Rebisco Biscuit Corporation, 2021-2024',
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
    type: 'Client work · Cushyfy Solutions, 2020-2021',
    desc: 'E-learning platform and analytics dashboard. Angular front end, Python/Django backend, plus a reporting module.',
    points: ['Built the Angular front end', 'Maintained the Django backend', 'Reports on learner progress and usage'],
    art: 'bars',
  },
  {
    id: 'chattee',
    title: 'Chattee messaging bot',
    cat: 'Web · Multi-tenant',
    stack: ['Laravel', 'Angular', 'Messenger', 'Viber', 'Telegram'],
    type: 'Cushyfy Solutions, 2020-2021 · screens are a concept recreation',
    desc: 'Multi-tenant ordering bot for Messenger, Viber and Telegram: customers fill in forms inside the chat, and each business works the orders from its own workspace, run from an operator console.',
    points: ['Designed the architecture and built it', 'Laravel backend coordinating several external APIs, SMS and email', 'Angular merchant dashboard', 'Database schema designed from scratch for per-tenant flows'],
    art: 'form',
    layout: 'cascade',
    /* concept screens recreated for the portfolio with sample data; the original build is no longer online */
    shotGroups: [
      { id: 'all', label: 'All', note: 'Concept recreation: orders arrive as form replies inside Messenger, Viber and Telegram, and land in one inbox per business.' },
      { id: 'site', label: 'Marketing site', note: 'The pitch: take orders where customers already chat, one inbox for every channel.',
        desc: 'The pitch to businesses: take orders where customers already chat, and work them all from one inbox.',
        points: ['Ordering inside Messenger, Viber and Telegram', 'One inbox per business for every channel'] },
      { id: 'tenant', label: 'Tenant app', note: 'Each business gets its own workspace: an orders inbox, a flow builder and a form builder.',
        desc: 'Each business gets its own workspace to build its ordering flow and work the orders that come in.',
        points: ['Orders inbox fed by every chat channel', 'Flow builder: message, form, lookup, condition and action steps', 'Order form builder with conditional fields and a live chat preview'],
        stack: ['Angular', 'Laravel'] },
      { id: 'chat', label: 'In chat', note: 'What the customer sees: a menu card, an order form in a webview and status updates in the thread.',
        desc: 'What the customer sees: the whole order happens inside the chat app they already use.',
        points: ['Menu card in the thread', 'Order form opens in a webview', 'Order status updates posted back to the thread'],
        stack: ['Messenger', 'Viber', 'Telegram'] },
      { id: 'console', label: 'Console', note: 'Operator console: provision tenants, watch channel health and webhook latency.',
        desc: 'The operator console that runs the platform for every business on it.',
        points: ['Provision tenants and their channels', 'Channel health and webhook latency per tenant', 'Laravel backend coordinating external APIs, SMS and email'],
        stack: ['Laravel'] },
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
    type: 'Client work · Cushyfy Solutions, 2020-2021',
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
    type: 'Client work · Cushyfy Solutions, 2020-2021',
    desc: 'Loyalty system for merchants: Vue dashboard and Laravel loyalty APIs, with users verified against the client\'s main backend.',
    points: ['Vue merchant dashboard', 'Laravel loyalty APIs', 'Email + SMS notifications'],
    art: 'bars',
  },
  {
    id: 'aims',
    title: 'AIMS accounting & inventory',
    cat: 'Web · ERP',
    stack: ['Yii2', 'Laravel', 'Vue', 'Quasar', 'MySQL'],
    type: 'Solutionbase Corporation, 2015-2020',
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
/* Extra case-study slides: two NDA client projects, then side projects. */
const EXTRA: Project[] = [
  {
    id: 'mcgp-core-link',
    nda: true,
    ndaRole: 'Full stack · Angular + GraphQL',
    title: 'MCGP Core Link',
    cat: 'Web · Construction',
    stack: ['Angular', 'GraphQL', 'Apollo', 'AWS'],
    ndaClient: 'MCGP',
    type: 'Client work · MCGP, 2025-2026',
    desc: 'Core Link, the back-office web app for MCGP, a construction company: projects, bills of quantities, canvassing, purchase orders and site inventory in one approval flow.',
    points: [
      'Bill of quantities with scope breakdowns and revisions, from estimate to approved budget',
      'Requisition → canvass → purchase order → payment request, each with its own signatories',
      'Material inventory per site: receiving, withdrawals and stock movement',
      'Angular 20 with SSR and Apollo GraphQL, deployed to S3 + CloudFront through CodeBuild',
    ],
    art: 'form',
    ndaKind: 'web',
  },
  {
    id: 'aurora-loyalty',
    nda: true,
    ndaRole: 'Full stack · NestJS + Flutter + Angular',
    title: 'AURora loyalty platform',
    cat: 'Mobile · Loyalty',
    stack: ['Flutter', 'NestJS', 'GraphQL', 'Angular'],
    ndaClient: 'Unilab',
    ndaStatus: 'In development',
    type: 'Client work · Unilab, 2026',
    desc: 'AURora, the loyalty platform for Unilab: a member app, a staff admin and one GraphQL API, specified from a full BRD of use cases and user stories.',
    points: [
      'Flutter member app: registration with Google/Facebook sign-in, QR member card, wallet and rewards',
      'NestJS GraphQL API for identity, membership tiers, earning rules, wallet and audit trail',
      'Angular staff admin for member administration and earning configuration',
      'Clean architecture with BLoC, generated GraphQL types and a shared AI-assisted workspace',
    ],
    art: 'phones',
    ndaKind: 'mobile',
  },
  {
    id: 'snipr',
    title: 'snipr',
    cat: 'Side project · Mobile',
    stack: ['Flutter', 'Riverpod', 'FFmpeg', 'SQLite'],
    type: 'Side project · github.com/jaoskii/snipr',
    links: [['GitHub', 'https://github.com/jaoskii/snipr']],
    desc: 'Flutter app for gaming clips: trim and compress highlights to fit Discord, then mark up screenshots before sharing them.',
    points: [
      'Two-pass FFmpeg encode that lands clips under the Discord upload limit',
      'Screenshot studio with arrows, boxes, spotlight, redaction and meme captions',
      'Local history of past clips and edits in SQLite',
    ],
    art: 'phones',
    layout: 'fan',
    images: [
      ['assets/img/side/snipr-studio.jpg', 'Snipr studio home, video upload and the screenshot annotator'],
      ['assets/img/side/snipr-onboarding.jpg', 'Snipr onboarding: Clip it. Ship it.'],
      ['assets/img/side/snipr-compress.jpg', 'Highlight and compress: timeline trim, Discord presets and a 4.1 MB result'],
      ['assets/img/side/snipr-history.jpg', 'History of processed clips, the side drawer and spotlight plus redaction in the studio'],
    ],
  },
  {
    id: 'yoink-cli',
    title: 'yoink',
    cat: 'Side project · CLI',
    stack: ['Go', 'Cobra', 'GoReleaser'],
    type: 'Side project · github.com/jaoskii/yoink-cli',
    links: [['GitHub', 'https://github.com/jaoskii/yoink-cli']],
    desc: 'Share files across your Wi-Fi with a QR code: run yoink on a file or folder, scan with your phone, tap Download. No app, no cloud, no account.',
    points: [
      'Listens only on the Wi-Fi/Ethernet address, behind a random 130-bit token link',
      'Folders stream as a zip on the fly; single files resume through HTTP range requests',
      'Terminal QR code and live progress, one static binary for macOS, Linux and Windows',
    ],
    art: 'kit',
    layout: 'desk',
    images: [
      ['assets/img/side/yoink-session.jpg', 'yoink sharing a 42-file folder: QR code, link and live download progress'],
      ['assets/img/side/yoink-phone.jpg', 'The phone download page in dark and light, and a finished download'],
      ['assets/img/side/yoink-resume.jpg', 'yoink --once with an interrupted download that resumes and completes'],
      ['assets/img/side/yoink-help.jpg', 'yoink --help with the share flags'],
    ],
  },
  {
    id: 'githappens',
    title: 'githappens',
    cat: 'Side project · CLI',
    stack: ['Python', 'Typer', 'Rich', 'PyGithub'],
    type: 'Side project · github.com/jaoskii/githappens',
    links: [['GitHub', 'https://github.com/jaoskii/githappens']],
    desc: 'GitHub from the terminal: manage several accounts, repos, SSH keys and collaborators without opening a browser.',
    points: [
      'Profiles per GitHub account, each with its own token and SSH key',
      'Repo create and visibility, SSH key generation and upload, collaborator invites',
      'AI repo analysis through Antigravity and the GitHub MCP server',
    ],
    art: 'kit',
    layout: 'cascade',
    /* session shot uses sample accounts, not real profiles */
    images: [
      ['assets/img/side/githappens-session.jpg', 'githappens session: profile list, repo create and collaborator invite'],
      ['assets/img/side/githappens-help.jpg', 'githappens --help with the analyze, profile, repo, ssh and collab commands'],
      ['assets/img/side/githappens-ssh.jpg', 'githappens ssh setup and ssh list'],
      ['assets/img/side/githappens-visibility.jpg', 'githappens switching a repo from private to public'],
      ['assets/img/side/githappens-analyze.jpg', 'githappens AI analysis of a repo'],
    ],
  },
  {
    id: 'flappy-bro',
    title: 'flappy-bro',
    cat: 'Side project · Game',
    stack: ['three.js', 'Vite', 'Railway'],
    type: 'Side project · flappy-bro-production.up.railway.app',
    links: [['Play it', 'https://flappy-bro-production.up.railway.app'], ['GitHub', 'https://github.com/jaoskii/flappy-bro']],
    desc: 'Flappy Bird as a 3D flyer: weave through a block city and reach each ring before the timer runs out.',
    points: [
      'three.js city of procedural blocks with rings, timers and a miss counter',
      'Keyboard controls on desktop, twin sticks and a rise button on phones',
      'Deployed on Railway, playable in any browser',
    ],
    art: 'tiles',
    layout: 'pile',
    images: [
      ['assets/img/side/flappy-mobile.jpg', 'Flappy Bro on a phone with twin sticks and a rise button'],
      ['assets/img/side/flappy-2.jpg', 'Flappy Bro mid-flight towards the next ring'],
      ['assets/img/side/flappy-1.jpg', 'Flappy Bro start screen with the controls'],
      ['assets/img/side/flappy-3.jpg', 'Flappy Bro banking between towers'],
      ['assets/img/side/flappy-4.jpg', 'Flappy Bro splat screen after hitting a tower'],
    ],
  },
  {
    id: 'mitmproxy-fastapi',
    title: 'mitmproxy-fastapi',
    cat: 'Side project · Dev tool',
    stack: ['Python', 'FastAPI', 'mitmproxy', 'Docker'],
    type: 'Side project · github.com/jaoskii/mitm-intercept-fast-api',
    links: [['GitHub', 'https://github.com/jaoskii/mitm-intercept-fast-api']],
    desc: 'mitmproxy with a live FastAPI dashboard for intercepting, mocking and rewriting traffic while you test an app.',
    points: [
      'Rules per method and URL: mock a response, rewrite headers or bodies, add latency',
      'Live traffic feed over WebSockets with a flow inspector for requests and responses',
      'One container runs the proxy and the dashboard; CA cert download built in',
    ],
    art: 'bars',
    layout: 'desk',
    /* rules and traffic are sample data */
    images: [
      ['assets/img/side/mitm-1.jpg', 'Interception rules and the live traffic feed'],
      ['assets/img/side/mitm-inspect.jpg', 'Flow inspector showing a rewritten response body'],
      ['assets/img/side/mitm-edit.jpg', 'Editing a mock-response rule'],
      ['assets/img/side/mitm-mock.jpg', 'Inspector showing the mocked 503 checkout response'],
      ['assets/img/side/mitm-new.jpg', 'Creating a latency rule'],
    ],
  },
  {
    id: 'untangled',
    title: 'untangled',
    cat: 'Side project · Browser extension',
    stack: ['JavaScript', 'Chrome MV3'],
    type: 'Side project · github.com/jaoskii/untangled',
    links: [['GitHub', 'https://github.com/jaoskii/untangled']],
    desc: 'Chrome side panel that spots raw JSON responses and turns them into a tree you can actually read.',
    points: [
      'Content script detects JSON pages and hands them to the side panel',
      'Collapsible tree with key counts, size, search highlighting and copy',
      'Light and dark themes, remembered per browser',
    ],
    art: 'form',
    layout: 'wall',
    images: [
      ['assets/img/side/untangled-chrome.jpg', 'Untangled next to a raw JSON response in Chrome'],
      ['assets/img/side/untangled-themes.jpg', 'Untangled side panel in dark and light themes, searching for "price"'],
      ['assets/img/side/untangled-tools.jpg', 'Collapsed tree summaries and the paste-JSON box'],
    ],
  },
  {
    id: 'atelier-forge',
    title: 'atelier-forge',
    cat: 'Side project · Web app',
    stack: ['React', 'TypeScript', 'Hono', 'Prisma'],
    type: 'Side project · github.com/jaoskii/atelier-forge',
    links: [['GitHub', 'https://github.com/jaoskii/atelier-forge']],
    desc: 'Spatial canvas editor: images, text, audio and ink on an infinite board, grouped into sections and linked with connectors.',
    points: [
      'Built on React Flow and Konva, with sections you can export as PNG',
      'Runs local-only (localStorage + IndexedDB) or against its Hono + Prisma API',
      'AI App Builder turns a section into a React or Flutter app, through a server-side AI proxy',
    ],
    art: 'tiles',
    layout: 'cascade',
    images: [
      ['assets/img/side/atelier-1.jpg', 'Atelier Forge board with a moodboard section and a copy and palette section'],
      ['assets/img/side/atelier-focus.jpg', 'Camera focused on one section with connectors'],
      ['assets/img/side/atelier-prompt.jpg', 'App Builder: turn a section into a React or Flutter app with AI'],
      ['assets/img/side/atelier-ai.jpg', 'AI provider settings: Gemini, Claude, OpenAI, OpenRouter and more'],
      ['assets/img/side/atelier-export.jpg', 'Export menu: PNG, PDF and .spatial project JSON'],
    ],
  },
];

export const PROJECTS: Project[] = [INVENTEE, ...CLIENT, ...EXTRA];
