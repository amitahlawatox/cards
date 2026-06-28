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
    description: 'Short, formal, casual, and text-friendly invitation wording examples for dozens of event types.',
    intro: 'Wording examples are most useful when they give you a structure you can personalize quickly.',
    bullets: [
      'Keep the first line focused on the event or host.',
      'Use shorter copy for text and WhatsApp invites.',
      'Use fuller wording for weddings, corporate events, and hosted dinners.',
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
    title: 'WhatsApp Invitation Maker',
    description: 'Create WhatsApp-friendly invitation cards and share them instantly with mobile-ready layouts, hosted invite links, and RSVP prompts.',
    intro: 'WhatsApp is a natural growth channel for family events, festive gatherings, and last-minute celebrations where speed matters more than formal print workflows.',
    highlights: ['Hosted invite links for sharing', 'Mobile-friendly layouts', 'Useful for Indian family events and festive invites'],
    queryFocus: ['whatsapp invitation maker', 'online whatsapp invitations', 'diwali invitation card maker online'],
    occasionSlugs: ['diwali', 'housewarming', 'baby-shower', 'birthday'],
    ctaPath: '/make/diwali/',
    ctaLabel: 'Build a WhatsApp invite',
  },
  {
    slug: 'rsvp-invitation-pages',
    title: 'Hosted RSVP Invitation Pages',
    description: 'Create shareable invitation pages with RSVP-by details, dress code notes, schedule prompts, and structured guest reply actions.',
    intro: 'Hosted invite pages add utility beyond static cards and help the site compete on product depth, not just template count.',
    highlights: ['Copy a hosted invite link from the editor', 'Add RSVP-by dates, dress codes, and schedule details', 'Guests can send structured yes, no, or maybe replies by email or WhatsApp'],
    queryFocus: ['rsvp invitation page', 'hosted invitation page', 'online invitation with rsvp'],
    occasionSlugs: ['wedding', 'corporate', 'birthday', 'baby-shower'],
    ctaPath: '/make/wedding/',
    ctaLabel: 'Create a hosted RSVP invite',
  },
];

export const FEATURED_EVENT_MICROSITES = ['birthday', 'wedding', 'baby-shower', 'corporate'] as const;

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

export function getFeaturedMicrositePaths() {
  return FEATURED_EVENT_MICROSITES.map((slug) => {
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
  };

  return examples[guide.slug] ?? [];
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
