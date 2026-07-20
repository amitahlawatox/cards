import { OCCASIONS, type Occasion, type CardTemplate } from './occasions';

export interface ModifierDefinition {
  slug:
    | 'free'
    | 'online'
    | 'printable'
    | 'whatsapp'
    | 'editable'
    | 'for-kids'
    | 'for-office'
    | 'indian'
    | 'elegant'
    | 'modern'
    | 'last-minute';
  label: string;
  searchPhrase: string;
  angle: string;
}

export interface SeasonalHub {
  slug: string;
  title: string;
  description: string;
  occasionSlugs: string[];
  highlights: string[];
}

export interface GuidePage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  bullets: string[];
}

export interface MarketCluster {
  slug: string;
  title: string;
  description: string;
  occasionSlugs: string[];
  highlights: string[];
}

export interface ProductFeaturePage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  queryFocus: string[];
  occasionSlugs: string[];
  ctaPath: string;
  ctaLabel: string;
}

export interface ComparisonPoint {
  title: string;
  body: string;
}

export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  queryFocus: string[];
  occasionSlugs: string[];
  comparisonPoints: ComparisonPoint[];
  routeSuggestions: TemplateRouteSuggestion[];
  ctaPath: string;
  ctaLabel: string;
}

export interface TemplateRouteSuggestion {
  title: string;
  href: string;
  description: string;
}

export const MODIFIER_DEFINITIONS: ModifierDefinition[] = [
  { slug: 'free', label: 'Free', searchPhrase: 'free', angle: 'focuses on cost-free creation and fast access' },
  { slug: 'online', label: 'Online', searchPhrase: 'online', angle: 'highlights browser-based design without downloads' },
  { slug: 'printable', label: 'Printable', searchPhrase: 'printable', angle: 'emphasizes print-friendly output and download quality' },
  { slug: 'whatsapp', label: 'WhatsApp', searchPhrase: 'WhatsApp', angle: 'centers on mobile-friendly sharing and quick RSVP messaging' },
  { slug: 'editable', label: 'Editable', searchPhrase: 'editable', angle: 'shows how easy it is to personalize names, dates, and details' },
  { slug: 'for-kids', label: 'For Kids', searchPhrase: 'for kids', angle: 'leans into playful, family-friendly styling and wording' },
  { slug: 'for-office', label: 'For Office', searchPhrase: 'for office', angle: 'adapts the invitation for workplace, school, or team use' },
  { slug: 'indian', label: 'Indian', searchPhrase: 'Indian', angle: 'connects the page to Indian family-event and festive search intent' },
  { slug: 'elegant', label: 'Elegant', searchPhrase: 'elegant', angle: 'positions the page for formal and premium visual styles' },
  { slug: 'modern', label: 'Modern', searchPhrase: 'modern', angle: 'highlights clean layouts and contemporary templates' },
  { slug: 'last-minute', label: 'Last Minute', searchPhrase: 'last minute', angle: 'helps users who need a polished invite quickly' },
];

export const SEASONAL_HUBS: SeasonalHub[] = [
  {
    slug: 'canada-holiday-invitations',
    title: 'Canada Holiday Invitation Hub',
    description: 'Canadian invitation ideas for Canada Day, Victoria Day, family gatherings, and holiday-hosting searches.',
    occasionSlugs: ['canada-day', 'victoria-day', 'thanksgiving', 'christmas'],
    highlights: ['Canada Day BBQ invites', 'Victoria Day weekend wording', 'holiday gathering templates'],
  },
  {
    slug: 'uk-party-invitations',
    title: 'UK Party Invitation Hub',
    description: 'UK-focused invitation ideas for hen parties, stag parties, christenings, and elegant social gatherings.',
    occasionSlugs: ['hen-party', 'stag-party', 'christening', 'garden-party'],
    highlights: ['hen and stag invite templates', 'christening wording', 'hosted social-event ideas'],
  },
  {
    slug: 'british-summer-invitations',
    title: 'British Summer Invitation Hub',
    description: 'Summer invitation ideas for garden parties, summer fetes, school fairs, and community events across the UK.',
    occasionSlugs: ['garden-party', 'summer-fete', 'birthday', 'corporate'],
    highlights: ['garden lunch invites', 'school-fair wording', 'community event templates'],
  },
  {
    slug: 'boxing-day-invitations',
    title: 'Boxing Day Invitation Hub',
    description: 'Boxing Day invite templates, post-Christmas brunch ideas, and relaxed holiday gathering wording for UK and Commonwealth searches.',
    occasionSlugs: ['boxing-day', 'christmas', 'new-year', 'housewarming'],
    highlights: ['post-Christmas brunch invites', 'holiday open-house wording', 'between-Christmas-and-New-Year hosting ideas'],
  },
  {
    slug: 'fourth-of-july-invitations',
    title: 'Fourth of July Invitation Hub',
    description: 'Patriotic invitation templates, BBQ wording, and printable party ideas for Fourth of July and Independence Day searches.',
    occasionSlugs: ['fourth-of-july', 'birthday', 'graduation', 'corporate'],
    highlights: ['backyard BBQ invites', 'fireworks party wording', 'summer hosted invite ideas'],
  },
  {
    slug: 'thanksgiving-invitations',
    title: 'Thanksgiving Invitation Hub',
    description: 'Thanksgiving and Friendsgiving templates, dinner wording, and autumn gathering ideas for family and hosted-meal traffic.',
    occasionSlugs: ['thanksgiving', 'anniversary', 'housewarming', 'corporate'],
    highlights: ['friendsgiving templates', 'family dinner wording', 'printable autumn invites'],
  },
  {
    slug: 'spring-celebration-invitations',
    title: 'Spring Celebration Invitation Hub',
    description: 'Spring invitation ideas for Easter, brunches, family gatherings, baby showers, and light seasonal celebrations.',
    occasionSlugs: ['easter', 'baby-shower', 'mothers-day', 'kids-party'],
    highlights: ['easter brunch invites', 'garden gathering wording', 'family-friendly spring templates'],
  },
  {
    slug: 'family-appreciation-invitations',
    title: 'Mother\'s Day and Father\'s Day Hub',
    description: 'Family celebration templates and hosted invite ideas for Mother\'s Day brunches, Father\'s Day BBQs, and appreciation events.',
    occasionSlugs: ['mothers-day', 'fathers-day', 'anniversary', 'birthday'],
    highlights: ['parent appreciation cards', 'family lunch invitations', 'BBQ and brunch wording'],
  },
  {
    slug: 'europe-festival-invitations',
    title: 'Europe Festival Invitation Hub',
    description: 'European celebration templates for Bonfire Night, Oktoberfest, Midsummer, and other seasonal gathering searches.',
    occasionSlugs: ['bonfire-night', 'oktoberfest', 'midsummer', 'christmas'],
    highlights: ['community celebration invites', 'autumn festival wording', 'summer garden-party ideas'],
  },
  {
    slug: 'diwali-invitations',
    title: 'Diwali Invitation Hub',
    description: 'Templates, wording, family-event ideas, and festive invitation flows for Diwali and Deepawali celebrations.',
    occasionSlugs: ['diwali', 'eid', 'housewarming', 'wedding'],
    highlights: ['Indian festive wording', 'family gathering invites', 'WhatsApp-ready invite ideas'],
  },
  {
    slug: 'christmas-party-invitations',
    title: 'Christmas Party Invitation Hub',
    description: 'Holiday party templates, family gathering copy, and office event invite ideas for Christmas season traffic.',
    occasionSlugs: ['christmas', 'corporate', 'kids-party', 'new-year'],
    highlights: ['holiday party schedules', 'office celebration invites', 'printable holiday cards'],
  },
  {
    slug: 'new-year-party-invitations',
    title: 'New Year Invitation Hub',
    description: 'Countdown party designs, dinner-event copy, and hosted invite ideas for New Year celebrations.',
    occasionSlugs: ['new-year', 'corporate', 'engagement', 'farewell'],
    highlights: ['countdown event invites', 'dress code wording', 'last-minute party templates'],
  },
  {
    slug: 'graduation-season-invitations',
    title: 'Graduation Season Invitation Hub',
    description: 'Graduation party ideas, family celebration wording, and printable invite templates for graduation season.',
    occasionSlugs: ['graduation', 'kids-party', 'farewell', 'corporate'],
    highlights: ['class celebration invites', 'open house wording', 'photo-ready graduation cards'],
  },
  {
    slug: 'wedding-season-invitations',
    title: 'Wedding Season Invitation Hub',
    description: 'Wedding, bridal shower, engagement, and elegant event templates grouped for high-intent wedding season searches.',
    occasionSlugs: ['wedding', 'bridal-shower', 'engagement', 'anniversary'],
    highlights: ['elegant templates', 'formal RSVP wording', 'bridal and engagement flows'],
  },
  {
    slug: 'baby-shower-season-invitations',
    title: 'Baby Shower Season Invitation Hub',
    description: 'Baby shower, gender reveal, and family celebration templates with message examples and planning prompts.',
    occasionSlugs: ['baby-shower', 'gender-reveal', 'kids-party', 'get-well'],
    highlights: ['family invitation wording', 'soft and modern styles', 'shareable hosted invite ideas'],
  },
];

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: 'rsvp-wording',
    title: 'RSVP Wording Examples',
    description: 'Examples of RSVP wording for casual parties, formal events, family gatherings, and business invitations.',
    intro: 'RSVP wording should tell guests exactly how to respond, by when, and through which channel.',
    bullets: [
      'Use a deadline when seating, catering, or venue limits matter.',
      'Mention the preferred response method such as WhatsApp, phone, or email.',
      'Keep the ask short so guests can answer without friction.',
    ],
  },
  {
    slug: 'dress-code-wording',
    title: 'Dress Code Wording for Invitations',
    description: 'Clear and guest-friendly dress code wording ideas for weddings, office parties, birthdays, and formal dinners.',
    intro: 'Dress code wording works best when it is direct, polite, and specific enough to remove guesswork.',
    bullets: [
      'Use plain language like cocktail, festive, business casual, or traditional attire.',
      'Add one clarifying note if the event venue or weather changes expectations.',
      'Pair dress code wording with the tone of the invitation so it feels natural.',
    ],
  },
  {
    slug: 'party-schedule-examples',
    title: 'Party Schedule Examples',
    description: 'Sample event schedules for birthdays, baby showers, graduations, office events, and festive gatherings.',
    intro: 'A simple event schedule helps guests understand arrival time, key moments, and when the event wraps up.',
    bullets: [
      'List milestone moments like welcome drinks, games, speeches, dinner, and cake cutting.',
      'Use short blocks of time so the schedule is easy to scan.',
      'Only include a schedule on the invite when it genuinely helps attendance or planning.',
    ],
  },
  {
    slug: 'invitation-message-templates',
    title: 'Invitation Message Templates by Occasion',
    description: 'Quick message templates for family invitations, business events, festive parties, and milestone celebrations.',
    intro: 'Invitation message templates save time when you need wording that sounds polished but still feels personal.',
    bullets: [
      'Start with the occasion and the person being celebrated.',
      'Add the date, time, venue, and RSVP details in a predictable order.',
      'Match the tone to the event: formal, cheerful, playful, or professional.',
    ],
  },
  {
    slug: 'invitation-wording-examples',
    title: 'Invitation Wording Examples',
    description: 'Short, formal, casual, and text-friendly invitation wording examples with ready-to-edit formats for birthdays, weddings, showers, and festive events.',
    intro: 'Wording examples are most useful when they give you a structure you can personalize quickly.',
    bullets: [
      'Keep the first line focused on the event or host.',
      'Use shorter copy for text and WhatsApp invites.',
      'Use fuller wording for weddings, corporate events, and hosted dinners.',
    ],
  },
  {
    slug: 'when-to-send-invitations',
    title: 'When to Send Invitations',
    description: 'Suggested invitation timing for weddings, birthdays, baby showers, Diwali parties, office events, and last-minute celebrations.',
    intro: 'Invitation timing depends on guest travel, venue complexity, and how much planning the event requires.',
    bullets: [
      'Use longer lead times for weddings, destination events, and anything that needs travel or formal RSVPs.',
      'Use shorter lead times for birthdays, baby showers, apartment gatherings, and WhatsApp-first events.',
      'If food, seating, or gifts matter, pair send dates with a clear RSVP-by deadline.',
    ],
  },
  {
    slug: 'venue-and-address-wording',
    title: 'Venue and Address Wording',
    description: 'Guest-friendly venue and address wording examples for invitations, hosted event pages, apartment parties, and formal celebrations.',
    intro: 'Venue wording works best when guests can scan the location, landmark, and access details without reading a paragraph.',
    bullets: [
      'Put the venue name first when it is recognizable, then follow with the full address or neighborhood.',
      'Add gate, tower, floor, parking, or map notes only when they reduce confusion.',
      'For hosted invite pages, keep the printed card short and move longer access instructions into event notes.',
    ],
  },
  {
    slug: 'indian-wedding-invitation-wording',
    title: 'Indian Wedding Invitation Wording',
    description: 'Traditional, modern, family-led, and WhatsApp-friendly Indian wedding invitation wording examples for ceremonies, receptions, and multi-event schedules.',
    intro: 'Indian wedding invitation wording often balances family warmth, ceremonial detail, and practical guest information.',
    bullets: [
      'Lead with family or couple names depending on whether the tone is traditional or modern.',
      'Separate ceremony, reception, sangeet, mehendi, or welcome events when guests need a clearer schedule.',
      'Use hosted invite pages or follow-up messages for dress code, venue access, parking, and RSVP details.',
    ],
  },
  {
    slug: 'wedding-rsvp-wording',
    title: 'Wedding RSVP Wording',
    description: 'Formal, elegant, modern, and digital-friendly RSVP wording examples for wedding invitations and hosted event pages.',
    intro: 'Wedding RSVP wording should feel polished while still making the response method and deadline very clear.',
    bullets: [
      'Use a specific RSVP deadline whenever seating, catering, and final counts affect the budget.',
      'Match the RSVP tone to the invitation style, from classic and formal to short and modern.',
      'If the wedding has multiple events, mention whether guests should respond once for all events or separately.',
    ],
  },
  {
    slug: 'baby-shower-rsvp-wording',
    title: 'Baby Shower RSVP Wording',
    description: 'Warm, family-friendly RSVP wording examples for baby shower invites, hosted pages, and WhatsApp messages.',
    intro: 'Baby shower RSVP wording works best when it feels warm and easy to answer, especially for family groups and close friends.',
    bullets: [
      'Keep the RSVP ask simple and kind, especially if many replies will arrive by phone or WhatsApp.',
      'Mention whether children, partners, or gift registry details need separate follow-up.',
      'Use the hosted invite page for schedule, parking, and venue notes so the card itself stays light and cheerful.',
    ],
  },
];

export const MARKET_CLUSTERS: MarketCluster[] = [
  {
    slug: 'indian-festive-invitations',
    title: 'Indian Festive Invitations',
    description: 'Indian festive and family-event invitation ideas for Diwali, housewarming, weddings, and community gatherings.',
    occasionSlugs: ['diwali', 'wedding', 'housewarming', 'eid'],
    highlights: ['family-event wording', 'WhatsApp sharing', 'cultural celebration templates'],
  },
  {
    slug: 'indian-family-event-invitations',
    title: 'Indian Family Event Invitations',
    description: 'Invitation ideas for Indian family celebrations, milestone gatherings, and hosted events that need quick sharing.',
    occasionSlugs: ['wedding', 'anniversary', 'baby-shower', 'housewarming'],
    highlights: ['traditional and modern tone', 'editable hosted invites', 'group-sharing flows'],
  },
];

export const PRODUCT_FEATURE_PAGES: ProductFeaturePage[] = [
  {
    slug: 'online-card-maker',
    title: 'Free Online Card Maker',
    description: 'Create invitation cards online for birthdays, weddings, festive events, and milestone celebrations without downloads or design software.',
    intro: 'This page is built for people who want to open a browser, personalize a card quickly, and export a polished design without friction.',
    highlights: ['No design software required', 'Fast template switching', 'Works for family, festive, and business invites'],
    queryFocus: ['free card maker online', 'online card maker free', 'free greeting card maker', 'card creator free'],
    occasionSlugs: ['birthday', 'wedding', 'anniversary', 'corporate'],
    ctaPath: '/occasions/',
    ctaLabel: 'Browse all occasions',
  },
  {
    slug: 'photo-card-maker',
    title: 'Free Photo Card Maker',
    description: 'Upload a picture, add text, and turn it into a personalized photo invitation or greeting card in minutes.',
    intro: 'Photo cards are high-intent because users already know the format they want. This landing page connects that demand to the image-upload flow inside the editor.',
    highlights: ['Image upload inside the editor', 'Great for baby showers, birthdays, and graduations', 'Export digital cards and print-ready PDFs'],
    queryFocus: ['free photo card maker', 'photo card maker free', 'online photo invitation maker'],
    occasionSlugs: ['baby-shower', 'birthday', 'graduation', 'anniversary'],
    ctaPath: '/make/birthday/',
    ctaLabel: 'Start with a photo-ready card',
  },
  {
    slug: 'printable-invitation-maker',
    title: 'Printable Invitation Maker',
    description: 'Design printable invitations online, then download high-resolution cards and print-ready PDFs for home or local printing.',
    intro: 'Printable demand is usually closer to conversion because the user already plans to send or print the finished card soon.',
    highlights: ['High-resolution PNG download', 'Print-ready PDF export', 'Clean layouts for weddings, anniversaries, and festive invites'],
    queryFocus: ['printable invitations', 'printable invitation maker', 'printable diwali invitations'],
    occasionSlugs: ['wedding', 'anniversary', 'diwali', 'christmas'],
    ctaPath: '/make/diwali/',
    ctaLabel: 'Create a printable invitation',
  },
  {
    slug: 'whatsapp-invitation-maker',
    title: 'WhatsApp Invitation Card Maker',
    description: 'Create WhatsApp-friendly invitation cards and share them instantly with mobile-ready layouts, hosted invite links, RSVP prompts, and fast family-event workflows.',
    intro: 'WhatsApp is a natural growth channel for family events, festive gatherings, and last-minute celebrations where speed matters more than formal print workflows.',
    highlights: ['Hosted invite links for sharing', 'Mobile-friendly layouts', 'Useful for Indian family events and festive invites'],
    queryFocus: ['whatsapp invitation maker', 'whatsapp invitation card', 'online whatsapp invitations', 'diwali invitation card maker online'],
    occasionSlugs: ['diwali', 'housewarming', 'baby-shower', 'birthday'],
    ctaPath: '/make/diwali/',
    ctaLabel: 'Build a WhatsApp invite',
  },
  {
    slug: 'rsvp-invitation-pages',
    title: 'Hosted RSVP Invitation Pages',
    description: 'Create shareable invitation pages with RSVP-by details, dress code notes, schedule prompts, calendar actions, and structured guest reply flows.',
    intro: 'Hosted invite pages add utility beyond static cards and help the site compete on product depth, not just template count.',
    highlights: ['Copy a hosted invite link from the editor', 'Add RSVP-by dates, event timing, venue details, dress codes, and schedule notes', 'Guests can reply by email or WhatsApp and save the event to their calendar'],
    queryFocus: ['rsvp invitation page', 'hosted invitation page', 'online invitation with rsvp', 'invitation with add to calendar'],
    occasionSlugs: ['wedding', 'corporate', 'birthday', 'baby-shower'],
    ctaPath: '/make/wedding/',
    ctaLabel: 'Create a hosted RSVP invite',
  },
];

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    slug: 'best-free-invitation-maker',
    title: 'Best Free Invitation Maker',
    description: 'Compare what actually matters in a free invitation maker: templates, downloads, printable output, RSVP utility, and fast sharing.',
    intro: 'People searching for the best free invitation maker are usually ready to choose a tool right now. This page connects that decision-stage intent to the parts of Bespoke Card Studio that solve the job fastest.',
    highlights: [
      'Owns the free-first angle with no-signup editing, printable output, and hosted invite options.',
      'Matches users who want invitations specifically, not a broad design suite with more steps.',
      'Connects free card-maker demand to high-intent pages for printable, WhatsApp, photo, and RSVP workflows.',
    ],
    queryFocus: ['best free invitation maker', 'free invitation maker', 'best invitation maker online free', 'free card maker online'],
    occasionSlugs: ['birthday', 'wedding', 'baby-shower', 'diwali'],
    comparisonPoints: [
      {
        title: 'Invitation-specific flow',
        body: 'A focused invitation tool should get users from template to guest-ready card faster than a generic design editor.',
      },
      {
        title: 'Output quality',
        body: 'Free users still care about printable PDFs, clean PNG exports, and mobile-friendly sharing paths.',
      },
      {
        title: 'Event utility',
        body: 'Hosted invite links, RSVP prompts, and wording help matter more than extra design controls for most invitation searches.',
      },
    ],
    routeSuggestions: [
      { title: 'Free online card maker', href: '/features/online-card-maker/', description: 'Open the broad free-maker route built around invitation-specific search demand.' },
      { title: 'Printable invitation maker', href: '/features/printable-invitation-maker/', description: 'See the download-first route for users who plan to print or export immediately.' },
      { title: 'Hosted RSVP invite pages', href: '/features/rsvp-invitation-pages/', description: 'Compare the event-page flow for invitations that need guest replies.' },
      { title: 'Invitation timing guide', href: '/guides/when-to-send-invitations/', description: 'Support decision-stage users who are still finalizing send dates and RSVP timing.' },
    ],
    ctaPath: '/occasions/',
    ctaLabel: 'Browse free invitation makers',
  },
  {
    slug: 'canva-alternative-for-invitations',
    title: 'Canva Alternative for Invitations',
    description: 'A Canva alternative for users who want invitation-first workflows, faster completion, and stronger event-specific guidance.',
    intro: 'Searchers looking for a Canva alternative for invitations usually want less setup and more invitation-specific help. This page positions Bespoke Card Studio as a simpler route for birthdays, weddings, baby showers, and festive invites.',
    highlights: [
      'Competes by being invitation-first instead of a broad design platform.',
      'Surfaces wording, printable, RSVP, and WhatsApp routes closer to the editor entry point.',
      'Fits users who value speed, guided structure, and event-specific pages over a giant general-purpose toolkit.',
    ],
    queryFocus: ['Canva alternative for invitations', 'Canva alternative invitation maker', 'invitation maker like Canva', 'free invitation maker alternative'],
    occasionSlugs: ['birthday', 'wedding', 'graduation', 'diwali'],
    comparisonPoints: [
      {
        title: 'Less decision friction',
        body: 'Invitation pages should start from occasion intent and reduce setup choices that slow down completion.',
      },
      {
        title: 'More event guidance',
        body: 'Wording ideas, RSVP help, and occasion-specific planning prompts create value generic editors usually leave to the user.',
      },
      {
        title: 'Stronger share paths',
        body: 'Hosted invites, WhatsApp routes, and print-ready exports help users finish the actual invitation job, not just the design.',
      },
    ],
    routeSuggestions: [
      { title: 'Photo card maker', href: '/features/photo-card-maker/', description: 'Use the photo-first path when the invite needs a faster, more personal format than a blank editor.' },
      { title: 'Invitation wording examples', href: '/guides/invitation-wording-examples/', description: 'Pair the editor with ready-made wording so users complete the card faster.' },
      { title: 'Wedding templates', href: '/templates/wedding/', description: 'Show a stronger invitation-specific template path for one of the highest-value categories.' },
      { title: 'Birthday invitation hub', href: '/invitations/birthday/', description: 'Open a dense occasion cluster that demonstrates focused invitation architecture.' },
    ],
    ctaPath: '/features/online-card-maker/',
    ctaLabel: 'See the invitation-first alternative',
  },
  {
    slug: 'evite-alternative',
    title: 'Evite Alternative',
    description: 'An Evite alternative for users who want free invitation design, hosted event pages, and printable plus WhatsApp-ready workflows.',
    intro: 'Searchers looking for an Evite alternative usually care about RSVP utility, but they also want better design control and more flexible sharing. This page connects those needs to the current hosted invite and export flows.',
    highlights: [
      'Competes on design freedom plus hosted-invite usefulness instead of guest management alone.',
      'Works for users who need printable cards, image-based sharing, and hosted invite pages in one tool.',
      'Supports RSVP, calendar, and venue-detail workflows while still keeping the editor free-first.',
    ],
    queryFocus: ['Evite alternative', 'Evite alternative free', 'sites like Evite', 'online invitation with RSVP'],
    occasionSlugs: ['wedding', 'birthday', 'baby-shower', 'corporate'],
    comparisonPoints: [
      {
        title: 'Design plus utility',
        body: 'A strong Evite alternative should let users design the card, host the invite, and export it for other channels without rebuilding.',
      },
      {
        title: 'Free-first flexibility',
        body: 'Users comparing tools often want to test a workflow quickly before committing to a platform or paid tier.',
      },
      {
        title: 'Better cross-channel sharing',
        body: 'Printable output and WhatsApp-friendly invite flows create a wider use case than email-only sending.',
      },
    ],
    routeSuggestions: [
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Go straight to the hosted-invite product route built for RSVP search intent.' },
      { title: 'Wedding event microsite', href: '/events/wedding/', description: 'Use a high-value event page to show richer guest-facing planning and invite flows.' },
      { title: 'Party schedule examples', href: '/guides/party-schedule-examples/', description: 'Support hosted-event users who still need practical schedule wording.' },
      { title: 'When to send invitations', href: '/guides/when-to-send-invitations/', description: 'Help decision-stage users who compare invitation platforms before sending.' },
    ],
    ctaPath: '/features/rsvp-invitation-pages/',
    ctaLabel: 'Explore the Evite alternative',
  },
  {
    slug: 'online-invitation-with-rsvp',
    title: 'Online Invitation with RSVP',
    description: 'Create an online invitation with RSVP details, hosted event notes, calendar actions, and guest reply prompts.',
    intro: 'This query is highly commercial because the user already knows they want an online invitation with RSVP. The right page should show both the product utility and the event-ready guest experience.',
    highlights: [
      'Targets users who have moved beyond generic templates and want hosted invite functionality.',
      'Connects RSVP demand to event timing, venue details, dress code, and calendar-ready invite pages.',
      'Lets the site compete with dedicated invitation platforms on utility, not just page count.',
    ],
    queryFocus: ['online invitation with rsvp', 'online invitation RSVP', 'digital invitation with RSVP', 'hosted invitation page'],
    occasionSlugs: ['wedding', 'corporate', 'birthday', 'baby-shower'],
    comparisonPoints: [
      {
        title: 'Clear guest path',
        body: 'An RSVP page should make it obvious how to reply, when to reply, and where the event is happening.',
      },
      {
        title: 'Host details in one place',
        body: 'Timing, address, dress code, and notes should live on the hosted invite instead of overloading the image-based card.',
      },
      {
        title: 'Practical follow-through',
        body: 'Calendar actions, copyable event details, and hosted event pages make the invitation more useful after the click.',
      },
    ],
    routeSuggestions: [
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Open the main product route for hosted invite pages and guest response actions.' },
      { title: 'Venue and address wording', href: '/guides/venue-and-address-wording/', description: 'Improve the location section so guests can find the event without follow-up messages.' },
      { title: 'Wedding RSVP wording', href: '/guides/wedding-rsvp-wording/', description: 'Use a stronger RSVP copy pattern for formal and high-intent invitation types.' },
      { title: 'Corporate event microsite', href: '/events/corporate/', description: 'See how hosted invite pages fit professional and guest-managed event flows.' },
    ],
    ctaPath: '/features/rsvp-invitation-pages/',
    ctaLabel: 'Create an online RSVP invitation',
  },
  {
    slug: 'printable-diwali-invitation-templates',
    title: 'Printable Diwali Invitation Templates',
    description: 'Printable Diwali invitation templates with festive wording ideas, family-event use cases, and print-ready export paths.',
    intro: 'Diwali is already the strongest early search cluster in current impressions. This page is designed to deepen that signal and match printable, free, online, and family-sharing intent more closely.',
    highlights: [
      'Supports the current Diwali query cluster already visible in Google Search Console.',
      'Combines festive wording, printable output, and WhatsApp follow-up paths for Indian family-event use cases.',
      'Turns a strong seasonal keyword theme into a fuller template and guide cluster with better internal linking.',
    ],
    queryFocus: ['printable diwali invitations', 'printable Diwali invitation templates', 'Diwali invitation template free', 'Diwali invitation card maker online'],
    occasionSlugs: ['diwali', 'eid', 'housewarming', 'wedding'],
    comparisonPoints: [
      {
        title: 'Festive print-first demand',
        body: 'Users searching printable Diwali templates usually want a quick design path plus dependable output quality.',
      },
      {
        title: 'Family and community events',
        body: 'Diwali invites often need flexible tone for home gatherings, office celebrations, apartment events, and society parties.',
      },
      {
        title: 'Shared follow-up',
        body: 'Printable cards still benefit from WhatsApp and hosted-event follow-up for RSVP and location details.',
      },
    ],
    routeSuggestions: [
      { title: 'Diwali invitation maker', href: '/make/diwali/', description: 'Open the editor directly for the highest-impression occasion cluster on the site right now.' },
      { title: 'Printable invitation maker', href: '/features/printable-invitation-maker/', description: 'Stay in the print-first route built for downloadable and PDF-ready invitation demand.' },
      { title: 'Diwali invitation hub', href: '/seasonal/diwali-invitations/', description: 'Explore the broader festive cluster for Diwali, family-event, and related seasonal demand.' },
      { title: 'Indian festive invitations', href: '/indian/indian-festive-invitations/', description: 'Strengthen the market-specific path around Indian festive invitation searches.' },
    ],
    ctaPath: '/make/diwali/',
    ctaLabel: 'Create a printable Diwali invite',
  },
  {
    slug: 'indian-wedding-invitation-maker',
    title: 'Indian Wedding Invitation Maker',
    description: 'Create Indian wedding invitations online with family-friendly wording, hosted invite details, WhatsApp sharing, and printable exports.',
    intro: 'Indian wedding invitation intent often spans multiple events, multiple sharing channels, and a blend of traditional and modern wording. This page is built to meet that exact search behavior.',
    highlights: [
      'Targets one of the clearest market-specific demand opportunities for the site.',
      'Combines templates, wording, printable output, hosted pages, and WhatsApp-friendly follow-up.',
      'Connects traditional family-event expectations with a fast modern editing and sharing flow.',
    ],
    queryFocus: ['Indian wedding invitation maker', 'Indian wedding invitation templates', 'online Indian wedding invitation', 'Indian wedding invitation card maker'],
    occasionSlugs: ['wedding', 'engagement', 'bridal-shower', 'diwali'],
    comparisonPoints: [
      {
        title: 'Traditional plus modern tone',
        body: 'Users often want wording that respects family and ceremony traditions while still feeling clean and current.',
      },
      {
        title: 'Multiple event flow',
        body: 'Indian wedding demand often includes the need to explain ceremony, reception, or pre-wedding events more clearly.',
      },
      {
        title: 'High sharing intensity',
        body: 'WhatsApp, printable cards, hosted notes, and follow-up links matter more here than in many generic invitation categories.',
      },
    ],
    routeSuggestions: [
      { title: 'Indian wedding wording guide', href: '/guides/indian-wedding-invitation-wording/', description: 'Use family-led and modern Indian wedding wording examples to finish the invite faster.' },
      { title: 'Wedding season invitation hub', href: '/seasonal/wedding-season-invitations/', description: 'Open the higher-value wedding cluster for supporting templates, wording, and elegant routes.' },
      { title: 'Indian family event invitations', href: '/indian/indian-family-event-invitations/', description: 'Stay within the market-specific route built for Indian family celebration demand.' },
      { title: 'Wedding templates', href: '/templates/wedding/', description: 'Compare the current wedding template family before entering the editor.' },
    ],
    ctaPath: '/make/wedding/',
    ctaLabel: 'Start an Indian wedding invitation',
  },
];

export const FEATURED_EVENT_MICROSITES = ['birthday', 'wedding', 'baby-shower', 'corporate'] as const;
export const PHOTO_FOCUSED_OCCASIONS = ['birthday', 'baby-shower', 'graduation', 'anniversary', 'wedding', 'christmas'] as const;

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find((occasion) => occasion.slug === slug);
}

export function getModifierBySlug(slug: string) {
  return MODIFIER_DEFINITIONS.find((modifier) => modifier.slug === slug);
}

export function getSeasonalHubBySlug(slug: string) {
  return SEASONAL_HUBS.find((hub) => hub.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return GUIDE_PAGES.find((guide) => guide.slug === slug);
}

export function getMarketClusterBySlug(slug: string) {
  return MARKET_CLUSTERS.find((cluster) => cluster.slug === slug);
}

export function getProductFeatureBySlug(slug: string) {
  return PRODUCT_FEATURE_PAGES.find((feature) => feature.slug === slug);
}

export function getComparisonBySlug(slug: string) {
  return COMPARISON_PAGES.find((page) => page.slug === slug);
}

export function getOccasionsBySlugs(slugs: string[]) {
  return slugs.map(getOccasionBySlug).filter(Boolean) as Occasion[];
}

export function getTemplateById(occasion: Occasion, templateId: string) {
  return occasion.templates.find((template) => template.id === templateId);
}

export function getTemplateStaticPaths() {
  return OCCASIONS.flatMap((occasion) =>
    occasion.templates.map((template) => ({
      params: { occasion: occasion.slug, template: template.id },
      props: { occasion, template },
    })),
  );
}

export function getModifierStaticPaths() {
  return OCCASIONS.flatMap((occasion) =>
    MODIFIER_DEFINITIONS.map((modifier) => ({
      params: { occasion: occasion.slug, modifier: modifier.slug },
      props: { occasion, modifier },
    })),
  );
}

export function getProductFeatureStaticPaths() {
  return PRODUCT_FEATURE_PAGES.map((feature) => ({
    params: { slug: feature.slug },
    props: { feature },
  }));
}

export function getComparisonStaticPaths() {
  return COMPARISON_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: { page },
  }));
}

export function getFeaturedMicrositePaths() {
  return FEATURED_EVENT_MICROSITES.map((slug) => {
    const occasion = getOccasionBySlug(slug);
    return occasion ? { params: { occasion: occasion.slug }, props: { occasion } } : null;
  }).filter(Boolean) as Array<{ params: { occasion: string }; props: { occasion: Occasion } }>;
}

export function getPhotoOccasionPaths() {
  return PHOTO_FOCUSED_OCCASIONS.map((slug) => {
    const occasion = getOccasionBySlug(slug);
    return occasion ? { params: { occasion: occasion.slug }, props: { occasion } } : null;
  }).filter(Boolean) as Array<{ params: { occasion: string }; props: { occasion: Occasion } }>;
}

export function getModifierPageDescription(occasion: Occasion, modifier: ModifierDefinition) {
  return `Explore ${modifier.searchPhrase} ${occasion.name.toLowerCase()} invitation ideas, templates, wording examples, and editor flows. This page ${modifier.angle}.`;
}

export function getModifierChecklist(occasion: Occasion, modifier: ModifierDefinition) {
  return [
    `Use a ${modifier.label.toLowerCase()} angle in the title and opening copy for stronger search relevance.`,
    `Choose a ${occasion.name.toLowerCase()} template that matches the tone guests expect.`,
    `Make the RSVP, venue, and timing details easy to scan on mobile.`,
  ];
}

export function getSeasonalHubIntro(hub: SeasonalHub) {
  return `${hub.description} This hub groups together high-intent occasion pages that should perform well during seasonal spikes.`;
}

export function getGuideExamples(guide: GuidePage) {
  const examples: Record<string, string[]> = {
    'rsvp-wording': [
      'RSVP by July 12 to [Phone or WhatsApp].',
      'Kindly reply by email to [Email] before the final headcount date.',
      'Please let us know if you can attend by [Date].',
    ],
    'dress-code-wording': [
      'Dress code: Cocktail attire.',
      'Festive traditional wear welcome.',
      'Business casual recommended for the office celebration.',
    ],
    'party-schedule-examples': [
      '4:00 PM arrivals, 4:30 PM welcome, 5:00 PM games, 6:30 PM dinner, 7:15 PM cake.',
      '6:00 PM guest arrival, 6:30 PM ceremony, 7:00 PM dinner, 8:00 PM dancing.',
      '3:00 PM welcome drinks, 3:30 PM speeches, 4:00 PM lunch, 5:00 PM photos.',
    ],
    'invitation-message-templates': [
      'Join us to celebrate [Name] on [Date] at [Venue]. RSVP: [Contact].',
      'You are warmly invited to attend [Event] on [Date] at [Time].',
      'We would love to celebrate with you. Please join us at [Venue] on [Date].',
    ],
    'invitation-wording-examples': [
      'Casual: Come celebrate with us on [Date] at [Venue].',
      'Formal: We request the pleasure of your company on [Date].',
      'Text invite: We are hosting [Event] on [Date]. Hope you can make it.',
    ],
    'when-to-send-invitations': [
      'Wedding invitations: usually 8 to 12 weeks before the event, or earlier for destination travel.',
      'Baby shower invitations: often 4 to 6 weeks before the celebration.',
      'Diwali apartment or family invites: often 1 to 3 weeks before, depending on guest travel and catering.',
    ],
    'venue-and-address-wording': [
      'Venue: The Grand Ballroom, 14 Park Street, Kolkata.',
      'Join us at Palm Residency Clubhouse, Tower B, Sector 62, Noida.',
      'Parking and guest entry: use Gate 2 and proceed to the banquet hall on Level 1.',
    ],
    'indian-wedding-invitation-wording': [
      'With the blessings of our parents, we invite you to celebrate the wedding of [Name] and [Name].',
      'Together with our families, we request your presence at our wedding ceremony and reception.',
      'Please join us for our mehendi, sangeet, wedding, and reception celebrations on [Dates].',
    ],
    'wedding-rsvp-wording': [
      'Kindly RSVP by [Date] to [Phone or Email].',
      'We would be grateful for your response by [Date] for seating and final guest arrangements.',
      'Please confirm your attendance for the ceremony and reception by [Date].',
    ],
    'baby-shower-rsvp-wording': [
      'Please RSVP by [Date] to [Phone or WhatsApp].',
      'We would love to celebrate together. Kindly reply by [Date].',
      'Please let us know if you can attend and whether you are bringing a guest.',
    ],
  };

  return examples[guide.slug] ?? [];
}

export function getGuideSearchQueries(guide: GuidePage) {
  const queries: Record<string, string[]> = {
    'rsvp-wording': ['rsvp wording examples', 'rsvp wording for invitations', 'how to write RSVP on invitation'],
    'dress-code-wording': ['dress code wording for invitations', 'dress code examples invitation', 'wedding dress code wording'],
    'party-schedule-examples': ['party schedule examples', 'event schedule wording', 'party itinerary example invitation'],
    'invitation-message-templates': ['invitation message templates', 'party invitation message', 'invitation message by occasion'],
    'invitation-wording-examples': ['invitation wording examples', 'formal invitation wording', 'casual invitation text'],
    'when-to-send-invitations': ['when to send invitations', 'when should I send wedding invitations', 'best time to send party invites'],
    'venue-and-address-wording': ['venue wording for invitation', 'address wording invitation', 'how to write venue on invitation'],
    'indian-wedding-invitation-wording': ['Indian wedding invitation wording', 'Indian wedding invitation message', 'Indian wedding invite text'],
    'wedding-rsvp-wording': ['wedding RSVP wording', 'RSVP wording for wedding invitations', 'how to write wedding RSVP'],
    'baby-shower-rsvp-wording': ['baby shower RSVP wording', 'baby shower RSVP examples', 'how to ask for RSVP on baby shower invite'],
  };

  return queries[guide.slug] ?? [];
}

export function getGuideRouteSuggestions(guide: GuidePage): TemplateRouteSuggestion[] {
  const routes: Record<string, TemplateRouteSuggestion[]> = {
    'rsvp-wording': [
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Move from wording examples into the hosted invite flow that collects structured replies.' },
      { title: 'Wedding RSVP wording', href: '/guides/wedding-rsvp-wording/', description: 'Open the wedding-specific route for a more formal RSVP tone.' },
      { title: 'Baby shower RSVP wording', href: '/guides/baby-shower-rsvp-wording/', description: 'Use a warmer family-event version of RSVP wording for shower invites and hosted pages.' },
    ],
    'dress-code-wording': [
      { title: 'Wedding wording ideas', href: '/wording/wedding/', description: 'Pair dress code notes with the broader wedding invitation copy flow.' },
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Use hosted invite pages when the dress code needs longer guest-facing explanation.' },
      { title: 'Wedding season hub', href: '/seasonal/wedding-season-invitations/', description: 'See more wedding-intent pages that benefit from dress code wording help.' },
    ],
    'party-schedule-examples': [
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Move longer event schedules onto the hosted invite page instead of crowding the card.' },
      { title: 'Corporate event microsite', href: '/events/corporate/', description: 'See a higher-utility event page where schedule notes and RSVP details matter more.' },
      { title: 'Venue and address wording', href: '/guides/venue-and-address-wording/', description: 'Finish the event information stack with better location wording.' },
    ],
    'invitation-message-templates': [
      { title: 'Invitation wording examples', href: '/guides/invitation-wording-examples/', description: 'Compare shorter, formal, and casual message structures before editing.' },
      { title: 'Birthday invitation hub', href: '/invitations/birthday/', description: 'Open a strong occasion cluster where message templates can convert into template starts.' },
      { title: 'Free online card maker', href: '/features/online-card-maker/', description: 'Take the wording idea into a faster editor-first product route.' },
    ],
    'invitation-wording-examples': [
      { title: 'Invitation message templates', href: '/guides/invitation-message-templates/', description: 'Expand from wording snippets into fuller template-style invitation copy.' },
      { title: 'When to send invitations', href: '/guides/when-to-send-invitations/', description: 'Support users who still need practical send timing and RSVP planning.' },
      { title: 'All wording pages', href: '/wording/', description: 'Browse occasion-specific wording routes linked directly to editor pages.' },
    ],
    'when-to-send-invitations': [
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Use the hosted route when send timing and RSVP deadlines are tightly connected.' },
      { title: 'Wedding event microsite', href: '/events/wedding/', description: 'Support the timing guide with a high-value event flow that includes planning context.' },
      { title: 'RSVP wording examples', href: '/guides/rsvp-wording/', description: 'Finish the send-timing job with clear RSVP-by wording and reply instructions.' },
    ],
    'venue-and-address-wording': [
      { title: 'Online invitation with RSVP', href: '/compare/online-invitation-with-rsvp/', description: 'See how hosted invites can carry longer address, schedule, and event-note details.' },
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Open the utility-focused route for maps, calendar, and venue-aware hosted invites.' },
      { title: 'Housewarming invitations', href: '/invitations/housewarming/', description: 'Use a venue-sensitive occasion route where address clarity often matters most.' },
    ],
    'indian-wedding-invitation-wording': [
      { title: 'Indian wedding invitation maker', href: '/compare/indian-wedding-invitation-maker/', description: 'Move from wording help into a comparison page built for Indian wedding invitation intent.' },
      { title: 'Indian family event invitations', href: '/indian/indian-family-event-invitations/', description: 'Stay inside the broader Indian family-event cluster for related invite journeys.' },
      { title: 'Wedding templates', href: '/templates/wedding/', description: 'Pick a wedding layout once the wording tone and family structure are clear.' },
    ],
    'wedding-rsvp-wording': [
      { title: 'Online invitation with RSVP', href: '/compare/online-invitation-with-rsvp/', description: 'Connect formal RSVP wording directly to the product route for hosted event pages.' },
      { title: 'Wedding event microsite', href: '/events/wedding/', description: 'Use a fuller wedding event route when RSVP, schedule, and guest notes all matter.' },
      { title: 'Wedding season hub', href: '/seasonal/wedding-season-invitations/', description: 'Keep wedding-intent users moving through a dense cluster of related pages.' },
    ],
    'baby-shower-rsvp-wording': [
      { title: 'Baby shower invitations', href: '/invitations/baby-shower/', description: 'Open the baby shower intent hub for templates, modifiers, wording, and editor access.' },
      { title: 'Hosted RSVP invitation pages', href: '/features/rsvp-invitation-pages/', description: 'Use the hosted-invite route if the shower needs easier guest replies and event notes.' },
      { title: 'Baby shower season hub', href: '/seasonal/baby-shower-season-invitations/', description: 'See more family-event pages linked to shower planning and wording intent.' },
    ],
  };

  return routes[guide.slug] ?? [];
}

export function getTemplateDetailDescription(occasion: Occasion, template: CardTemplate) {
  return `${template.name} is an editable ${occasion.name.toLowerCase()} invitation template with customizable text, download-ready output, and a quick path into the online editor.`;
}

function inferTemplateStyle(template: CardTemplate) {
  const value = template.name.toLowerCase();

  if (value.includes('elegant') || value.includes('classic') || value.includes('gold') || value.includes('royal')) {
    return 'elegant';
  }

  if (value.includes('modern') || value.includes('minimal') || value.includes('clean') || value.includes('sleek')) {
    return 'modern';
  }

  if (value.includes('kids') || value.includes('princess') || value.includes('unicorn') || value.includes('rainbow') || value.includes('superhero')) {
    return 'for-kids';
  }

  if (value.includes('floral') || value.includes('romantic') || value.includes('botanical')) {
    return 'elegant';
  }

  return 'editable';
}

export function getTemplateUseCases(occasion: Occasion, template: CardTemplate) {
  const style = inferTemplateStyle(template);
  const lowerName = occasion.name.toLowerCase();
  const topTags = occasion.tags.slice(0, 2).join(' and ');
  const styleLine =
    style === 'elegant'
      ? `Use ${template.name} when you want a polished ${lowerName} invitation that feels formal, romantic, or occasion-led without starting from scratch.`
      : style === 'modern'
        ? `${template.name} works well when you want a clean ${lowerName} invitation with contemporary spacing, simple copy blocks, and easy mobile readability.`
        : style === 'for-kids'
          ? `${template.name} is a strong fit for playful ${lowerName} invitations where color, energy, and fast guest recognition matter more than formality.`
          : `${template.name} gives you a fast starting point for a customizable ${lowerName} invitation without losing editing flexibility.`;

  return [
    styleLine,
    `The layout keeps room for names, dates, venue details, and RSVP notes so you can finish the invitation in one editing session.`,
    `This template supports ${topTags} search intent while still giving you enough flexibility to adapt the message for family, festive, or business guests.`,
  ];
}

export function getTemplateCustomizationChecklist(occasion: Occasion, template: CardTemplate) {
  const items = [
    `Replace the default headline with the guest-facing ${occasion.name.toLowerCase()} title or person being celebrated.`,
    template.defaultDate ? 'Update the placeholder date and time with the confirmed event schedule.' : 'Add the final date and time so the invitation is immediately usable.',
    template.defaultVenue ? 'Swap in the venue name, full address, or online event location before sharing the card.' : 'Add the venue, city, or joining details before sending the invitation.',
    'Review the footer area for RSVP details, host names, dress code notes, or a hosted invite link.',
  ];

  return items;
}

export function getTemplateSearchQueries(occasion: Occasion, template: CardTemplate) {
  const lowerName = occasion.name.toLowerCase();
  const style = inferTemplateStyle(template);
  const styleLabel =
    style === 'editable'
      ? 'editable'
      : style === 'for-kids'
        ? 'kids'
        : style;

  return [
    `${template.name.toLowerCase()} ${lowerName} template`,
    `${styleLabel} ${lowerName} invitation template`,
    `editable ${lowerName} invitation`,
    `online ${lowerName} card template`,
  ];
}

export function getTemplateFaqs(occasion: Occasion, template: CardTemplate) {
  const lowerName = occasion.name.toLowerCase();

  return [
    {
      question: `Can I customize the ${template.name} ${occasion.name} template for free?`,
      answer: `Yes. You can open the ${template.name} template in the editor, update the text, and export the finished ${lowerName} invitation without paying for a subscription.`,
    },
    {
      question: `What details should I change before sharing this ${lowerName} template?`,
      answer: `At minimum, update the names, event date, time, venue, and RSVP details. If the event has a dress code, schedule, or parking note, add that before downloading or sharing the invitation.`,
    },
    {
      question: `Can I use the ${template.name} template for printable and digital invites?`,
      answer: `Yes. This template works for both digital sharing and printable workflows because you can export a high-resolution PNG and a print-ready PDF from the editor.`,
    },
  ];
}

export function getTemplateRouteSuggestions(occasion: Occasion, template: CardTemplate): TemplateRouteSuggestion[] {
  const style = inferTemplateStyle(template);
  const lowerName = occasion.name.toLowerCase();
  const links: TemplateRouteSuggestion[] = [
    {
      title: `Customize this ${occasion.name} template`,
      href: `/make/${occasion.slug}/`,
      description: `Open the editor with ${lowerName} templates and personalize the card for your exact event details.`,
    },
    {
      title: `Browse all ${occasion.name} templates`,
      href: `/templates/${occasion.slug}/`,
      description: `Compare more ${lowerName} layouts if you want a different tone, color direction, or guest-facing format.`,
    },
    {
      title: `${occasion.name} wording ideas`,
      href: `/wording/${occasion.slug}/`,
      description: `Use ready-made wording examples to finish names, timing, venue lines, and RSVP copy faster.`,
    },
  ];

  if (style === 'elegant' || style === 'modern' || style === 'for-kids') {
    links.push({
      title:
        style === 'for-kids'
          ? `${occasion.name} templates for kids`
          : `${style.charAt(0).toUpperCase() + style.slice(1)} ${occasion.name} invites`,
      href: `/invitations/${occasion.slug}/${style === 'for-kids' ? 'for-kids' : style}/`,
      description:
        style === 'for-kids'
          ? `See the playful route built for family-friendly ${lowerName} invitation searches.`
          : `Explore the ${style}-focused route for guests searching by visual style as well as occasion.`,
    });
  } else if ((FEATURED_EVENT_MICROSITES as readonly string[]).includes(occasion.slug)) {
    links.push({
      title: `${occasion.name} event microsite`,
      href: `/events/${occasion.slug}/`,
      description: `Open the fuller ${lowerName} microsite with templates, wording, planning prompts, and hosted-invite flows.`,
    });
  } else {
    links.push({
      title: 'Hosted RSVP invitation pages',
      href: '/features/rsvp-invitation-pages/',
      description: 'See how shareable invite pages can add guest response options beyond a static invitation image.',
    });
  }

  return links;
}

export function getPhotoPageDescription(occasion: Occasion) {
  return `Create ${occasion.name.toLowerCase()} photo invitations online. Upload a picture, add names and event details, and export a polished photo card in minutes.`;
}

export function getPhotoPageHighlights(occasion: Occasion) {
  const lowerName = occasion.name.toLowerCase();

  return [
    `Start with a ${lowerName} template, upload one main image, and keep the rest of the layout focused on names, timing, and venue details.`,
    `Use photo-first invites when the guest list already knows the event type and a personal image will lift clicks, shares, or emotional response.`,
    `Export the final ${lowerName} photo card as a PNG, a print-ready PDF, or a hosted invite link depending on how you plan to send it.`,
  ];
}

export function getPhotoPageQueries(occasion: Occasion) {
  const lowerName = occasion.name.toLowerCase();

  return [
    `${lowerName} photo invitation`,
    `${lowerName} photo card maker`,
    `online ${lowerName} photo invitation`,
    `free ${lowerName} photo card`,
  ];
}

export function getPhotoRouteSuggestions(occasion: Occasion) {
  return [
    {
      title: `${occasion.name} photo maker`,
      href: `/make/${occasion.slug}/?focus=photo`,
      description: `Open the editor with the upload-first flow for a ${occasion.name.toLowerCase()} photo invite.`,
    },
    {
      title: `${occasion.name} templates`,
      href: `/templates/${occasion.slug}/`,
      description: `Compare layouts that leave enough breathing room for a main image plus the event details.`,
    },
    {
      title: `${occasion.name} wording ideas`,
      href: `/wording/${occasion.slug}/`,
      description: `Use short guest-facing copy that works well when the photo already carries part of the message.`,
    },
    {
      title: 'Photo card maker feature page',
      href: '/features/photo-card-maker/',
      description: 'See the broader product route for photo-card demand, image upload, and export workflows.',
    },
  ];
}
