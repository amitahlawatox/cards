import { MODIFIER_DEFINITIONS } from './content';
import { OCCASIONS, type Occasion } from './occasions';
import { SITE } from './site';

export type LandingFamily = 'make' | 'invitations' | 'templates' | 'wording';

export interface OccasionRouteSuggestion {
  title: string;
  href: string;
  description: string;
}

export interface OccasionModifierLink {
  title: string;
  href: string;
  description: string;
}

export interface OccasionMakerGrowthData {
  title: string;
  metaDescription: string;
  intro: string;
  searchTerms: string[];
  highlights: string[];
  routeSuggestions: OccasionRouteSuggestion[];
}

const MAKER_GROWTH_OVERRIDES: Record<string, Omit<OccasionMakerGrowthData, 'title'>> = {
  diwali: {
    metaDescription:
      'Create free Diwali invitation cards online, compare festive templates, make printable invites, and share WhatsApp-ready Diwali cards in minutes.',
    intro:
      'Create free Diwali invitation cards online, choose festive family or office-friendly templates, and export printable or WhatsApp-ready invites in minutes.',
    searchTerms: [
      'diwali invitations',
      'diwali invitation card',
      'printable diwali invitations',
      'diwali invite template',
      'diwali invitation card maker online',
    ],
    highlights: [
      'Use festive Diwali layouts built for family gatherings, apartment events, office celebrations, and community invites.',
      'Choose the format that fits the moment: printable downloads, hosted invite links, or quick WhatsApp sharing.',
      'Add host names, sweets-and-dinner timing, RSVP details, and venue notes without rewriting the whole card.',
    ],
    routeSuggestions: [
      {
        title: 'Diwali templates',
        href: '/templates/diwali/',
        description: 'Compare editable festive designs before choosing the right layout for your celebration.',
      },
      {
        title: 'Printable Diwali invitations',
        href: '/invitations/diwali/printable/',
        description: 'Focus on print-friendly Diwali card ideas and downloadable invite formats.',
      },
      {
        title: 'WhatsApp Diwali invites',
        href: '/invitations/diwali/whatsapp/',
        description: 'Open the mobile-friendly route for quick Diwali sharing and RSVP follow-up.',
      },
      {
        title: 'Diwali wording ideas',
        href: '/wording/diwali/',
        description: 'Use festive invitation copy, host lines, and RSVP wording that feels natural for family invites.',
      },
      {
        title: 'Diwali seasonal hub',
        href: '/seasonal/diwali-invitations/',
        description: 'Explore the broader festive cluster driving Diwali, family-event, and holiday-party intent.',
      },
      {
        title: 'Indian festive invitation ideas',
        href: '/indian/indian-festive-invitations/',
        description: 'Move into the market-specific cluster built for Indian festive and family-event searches.',
      },
    ],
  },
  anniversary: {
    metaDescription:
      'Make a free anniversary invitation card online, compare romantic and elegant templates, and download printable anniversary invites in minutes.',
    intro:
      'Make a free anniversary invitation card online, personalize the couple details, compare romantic and elegant styles, and download a printable invite without design software.',
    searchTerms: [
      'free anniversary invitation templates',
      'online anniversary invitation card maker',
      'anniversary invitation card online',
      'wedding anniversary invitation card maker online free',
      'free printable anniversary invitations',
    ],
    highlights: [
      'Choose layouts for silver, golden, milestone, and casual anniversary celebrations without starting from a blank card.',
      'Pair romantic wording, RSVP details, and hosted invite links with elegant or family-friendly templates.',
      'Export a printable card when you need formal invites, or use a digital version for faster guest sharing.',
    ],
    routeSuggestions: [
      {
        title: 'Anniversary templates',
        href: '/templates/anniversary/',
        description: 'Browse romantic, elegant, and milestone-ready anniversary invitation designs.',
      },
      {
        title: 'Free anniversary invitations',
        href: '/invitations/anniversary/free/',
        description: 'Land on the cost-conscious route built for free anniversary invite searches.',
      },
      {
        title: 'Printable anniversary invites',
        href: '/invitations/anniversary/printable/',
        description: 'Focus on printable anniversary invitation ideas and print-ready formats.',
      },
      {
        title: 'Anniversary wording ideas',
        href: '/wording/anniversary/',
        description: 'Get formal, casual, and family-friendly wording for anniversary celebrations.',
      },
      {
        title: 'Online card maker',
        href: '/features/online-card-maker/',
        description: 'Explore the broader feature page for free online card maker intent.',
      },
      {
        title: 'Printable invitation maker',
        href: '/features/printable-invitation-maker/',
        description: 'See the product-focused route for printable invitation demand and export workflows.',
      },
    ],
  },
  'fourth-of-july': {
    metaDescription:
      'Create free Fourth of July invitations online, compare patriotic templates, make printable 4th of July invites, and share party details fast.',
    intro:
      'Create free Fourth of July invitations online, choose patriotic templates for BBQs or fireworks parties, and share printable or hosted invites in minutes.',
    searchTerms: [
      'fourth of july invitation',
      '4th of july party invitations',
      'independence day invitation template',
      'printable fourth of july invitations',
      'online fourth of july invite maker',
    ],
    highlights: [
      'Choose from patriotic styles built for backyard BBQs, fireworks parties, neighborhood events, and summer celebrations.',
      'Use printable formats for in-person gatherings or hosted invite pages when you need fast guest sharing and RSVP follow-up.',
      'Personalize names, cookout timing, venue details, and dress notes without redesigning the whole card from scratch.',
    ],
    routeSuggestions: [
      {
        title: 'Fourth of July templates',
        href: '/templates/fourth-of-july/',
        description: 'Compare patriotic layouts before opening the editor for your party style and guest list.',
      },
      {
        title: 'Printable Fourth of July invites',
        href: '/invitations/fourth-of-july/printable/',
        description: 'Focus on print-ready Independence Day invitations for BBQs, cookouts, and neighborhood parties.',
      },
      {
        title: 'Fourth of July wording ideas',
        href: '/wording/fourth-of-july/',
        description: 'Use ready-made cookout, fireworks, and summer-hosting wording that is quick to customize.',
      },
      {
        title: 'Fourth of July seasonal hub',
        href: '/seasonal/fourth-of-july-invitations/',
        description: 'Explore the broader summer and patriotic content cluster supporting Independence Day demand.',
      },
      {
        title: 'Hosted RSVP invite pages',
        href: '/features/rsvp-invitation-pages/',
        description: 'See how a shareable invite page can simplify guest responses for a large holiday gathering.',
      },
      {
        title: 'Photo card maker',
        href: '/features/photo-card-maker/',
        description: 'Add family or party photos when you want a more personal Fourth of July invitation.',
      },
    ],
  },
  thanksgiving: {
    metaDescription:
      'Make free Thanksgiving invitations online, compare Friendsgiving templates, and download printable dinner invites for autumn gatherings.',
    intro:
      'Make free Thanksgiving invitations online, personalize Friendsgiving or family-dinner details, and export printable or digital autumn invites fast.',
    searchTerms: [
      'thanksgiving invitation',
      'friendsgiving invitations',
      'thanksgiving dinner invitation template',
      'printable thanksgiving invitations',
      'online thanksgiving invite maker',
    ],
    highlights: [
      'Choose warm autumn layouts for family dinners, Friendsgiving parties, hosted meals, and thankful-gathering events.',
      'Keep the invitation practical by adding dish notes, arrival timing, RSVP details, and host information in one pass.',
      'Use the same design for printable table-friendly invites or a faster digital share workflow when plans come together late.',
    ],
    routeSuggestions: [
      {
        title: 'Thanksgiving templates',
        href: '/templates/thanksgiving/',
        description: 'Compare harvest, dinner, and Friendsgiving invitation layouts before you customize one.',
      },
      {
        title: 'Printable Thanksgiving invites',
        href: '/invitations/thanksgiving/printable/',
        description: 'Open the print-focused route for formal meal invitations and autumn gathering cards.',
      },
      {
        title: 'Thanksgiving wording ideas',
        href: '/wording/thanksgiving/',
        description: 'Use family-dinner, Friendsgiving, and hosted-meal wording examples that feel natural and warm.',
      },
      {
        title: 'Thanksgiving seasonal hub',
        href: '/seasonal/thanksgiving-invitations/',
        description: 'Stay inside the autumn dinner cluster built for Thanksgiving and Friendsgiving search demand.',
      },
      {
        title: 'Online card maker',
        href: '/features/online-card-maker/',
        description: 'See the broader product route for free online invitation creation without design software.',
      },
      {
        title: 'Last-minute invitation ideas',
        href: '/invitations/thanksgiving/last-minute/',
        description: 'Open the fast-turnaround route when the guest list comes together close to the event date.',
      },
    ],
  },
  easter: {
    metaDescription:
      'Create free Easter invitations online, compare spring templates, make printable Easter brunch invites, and share egg-hunt details quickly.',
    intro:
      'Create free Easter invitations online, choose a bright spring template, and send printable or digital invites for brunches, egg hunts, and family gatherings.',
    searchTerms: [
      'easter invitation',
      'easter brunch invitation',
      'easter egg hunt invitation',
      'printable easter invitations',
      'online easter invite maker',
    ],
    highlights: [
      'Use spring-ready templates for Easter brunches, family lunches, church events, and outdoor egg hunts.',
      'Keep the message clear by adding timing, host notes, dress guidance, and child-friendly activity details in a few quick edits.',
      'Switch between printable invites, WhatsApp sharing, and hosted event pages depending on how your guests usually respond.',
    ],
    routeSuggestions: [
      {
        title: 'Easter templates',
        href: '/templates/easter/',
        description: 'Compare pastel, brunch, and egg-hunt layouts before opening the editor.',
      },
      {
        title: 'Printable Easter invites',
        href: '/invitations/easter/printable/',
        description: 'Focus on print-friendly Easter invitation formats for family gatherings and event handouts.',
      },
      {
        title: 'Easter wording ideas',
        href: '/wording/easter/',
        description: 'Use brunch, celebration, and family-event wording examples that are easy to personalize.',
      },
      {
        title: 'Spring seasonal hub',
        href: '/seasonal/spring-celebration-invitations/',
        description: 'Move into the broader spring celebration cluster that connects Easter to related demand.',
      },
      {
        title: 'Photo card maker',
        href: '/features/photo-card-maker/',
        description: 'Add a family or kids photo when you want a more personal spring invitation or card.',
      },
      {
        title: 'Hosted RSVP invite pages',
        href: '/features/rsvp-invitation-pages/',
        description: 'Use a hosted page when you need easy replies for an egg hunt, brunch, or larger family event.',
      },
    ],
  },
  'canada-day': {
    metaDescription:
      'Create free Canada Day invitations online, compare July 1 party templates, and make printable Canada Day BBQ or fireworks invites fast.',
    intro:
      'Create free Canada Day invitations online, choose a red-and-white party template, and send printable or digital invites for BBQs, fireworks, and holiday gatherings.',
    searchTerms: [
      'canada day invitation',
      'canada day party invitation',
      'july 1 invitation template',
      'printable canada day invitations',
      'online canada day invite maker',
    ],
    highlights: [
      'Use patriotic layouts for backyard parties, fireworks nights, family cookouts, and neighborhood Canada Day events.',
      'Keep guest planning simple by adding timing, address details, what-to-bring notes, and RSVP instructions in one quick edit.',
      'Choose between printable invitations, WhatsApp-friendly sharing, and hosted event pages depending on how your guests usually reply.',
    ],
    routeSuggestions: [
      {
        title: 'Canada Day templates',
        href: '/templates/canada-day/',
        description: 'Compare July 1 invitation layouts before you open the editor and personalize one.',
      },
      {
        title: 'Printable Canada Day invites',
        href: '/invitations/canada-day/printable/',
        description: 'Focus on print-friendly Canada Day invitations for BBQs, fireworks, and holiday handouts.',
      },
      {
        title: 'Canada Day wording ideas',
        href: '/wording/canada-day/',
        description: 'Use ready-made Canada Day party wording for family, neighborhood, and holiday-hosting events.',
      },
      {
        title: 'Canada holiday hub',
        href: '/seasonal/canada-holiday-invitations/',
        description: 'Stay inside the Canada-focused seasonal cluster built for holiday-hosting searches.',
      },
      {
        title: 'Hosted RSVP invite pages',
        href: '/features/rsvp-invitation-pages/',
        description: 'Use a hosted page when you want easy guest replies for a larger Canada Day gathering.',
      },
      {
        title: 'Photo card maker',
        href: '/features/photo-card-maker/',
        description: 'Add a family or host photo if you want a more personal holiday invitation.',
      },
    ],
  },
  'hen-party': {
    metaDescription:
      'Make free hen party invitations online, compare glam and weekend-away templates, and send printable or digital hen do invites quickly.',
    intro:
      'Make free hen party invitations online, choose the right mood for a brunch, dinner, spa day, or weekend away, and send polished invites in minutes.',
    searchTerms: [
      'hen party invitation',
      'hen do invite',
      'hen weekend invitation',
      'printable hen party invitations',
      'online hen party invite maker',
    ],
    highlights: [
      'Choose layouts for glam nights, brunches, spa days, and destination hen weekends without starting from a blank card.',
      'Add itinerary details, dress themes, RSVP notes, and payment reminders while keeping the invite stylish and easy to scan.',
      'Use a hosted invite page when the guest list needs one place for updates, schedule notes, and quick response tracking.',
    ],
    routeSuggestions: [
      {
        title: 'Hen party templates',
        href: '/templates/hen-party/',
        description: 'Compare glam, weekend-away, and brunch-ready hen party invitation designs.',
      },
      {
        title: 'Printable hen party invites',
        href: '/invitations/hen-party/printable/',
        description: 'Focus on print-friendly hen party formats for gift bags, handouts, or keepsakes.',
      },
      {
        title: 'Hen party wording ideas',
        href: '/wording/hen-party/',
        description: 'Use quick wording examples for hen dos, bridal weekends, and pre-wedding party plans.',
      },
      {
        title: 'UK party hub',
        href: '/seasonal/uk-party-invitations/',
        description: 'Explore the broader UK social-event cluster that connects hen parties to related demand.',
      },
      {
        title: 'Hosted RSVP invite pages',
        href: '/features/rsvp-invitation-pages/',
        description: 'Use a shareable event page when you need RSVPs, updates, or weekend itinerary details in one place.',
      },
      {
        title: 'Online card maker',
        href: '/features/online-card-maker/',
        description: 'See the broader route for fast invite creation without extra design tools.',
      },
    ],
  },
  christening: {
    metaDescription:
      'Create free christening invitations online, compare elegant baptism templates, and make printable christening cards with wording included.',
    intro:
      'Create free christening invitations online, personalize names, church details, and family reception information, and send elegant invites without design software.',
    searchTerms: [
      'christening invitation',
      'baptism invitation',
      'christening invitation template',
      'printable christening invitations',
      'online christening invite maker',
    ],
    highlights: [
      'Choose calm, family-friendly layouts for christenings, baptisms, naming celebrations, and baby dedication events.',
      'Add ceremony timing, church details, reception notes, and RSVP guidance while keeping the invitation graceful and easy to read.',
      'Use printable formats for formal family sharing or a digital route when you need faster guest communication.',
    ],
    routeSuggestions: [
      {
        title: 'Christening templates',
        href: '/templates/christening/',
        description: 'Compare classic, soft, and elegant christening invitation designs before customizing one.',
      },
      {
        title: 'Printable christening invites',
        href: '/invitations/christening/printable/',
        description: 'Focus on print-ready christening invitation formats for family events and church gatherings.',
      },
      {
        title: 'Christening wording ideas',
        href: '/wording/christening/',
        description: 'Use polished ceremony and reception wording that is easy to adapt for your family.',
      },
      {
        title: 'UK party hub',
        href: '/seasonal/uk-party-invitations/',
        description: 'Stay within the wider UK invitation cluster that connects christenings to related family-event demand.',
      },
      {
        title: 'Printable invitation maker',
        href: '/features/printable-invitation-maker/',
        description: 'See the product route built around print-friendly invitations and export workflows.',
      },
      {
        title: 'Venue and address wording',
        href: '/guides/venue-and-address-wording/',
        description: 'Use clearer wording for church locations, family halls, and reception details.',
      },
    ],
  },
};

function getIndefiniteArticle(value: string) {
  return /^[aeiou]/i.test(value.trim()) ? 'an' : 'a';
}

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find((occasion) => occasion.slug === slug);
}

export function getOccasionChecklist(occasion: Occasion) {
  const needsVenue = occasion.templates.some((template) => Boolean(template.defaultVenue));
  const needsTime = occasion.templates.some((template) => Boolean(template.defaultTime));

  const items = ['Host name or family name', 'Guest-facing event title', `${occasion.name} date`];

  if (needsTime) {
    items.push('Start time and arrival details');
  }

  if (needsVenue) {
    items.push('Venue name or full address');
  }

  items.push('RSVP contact details');

  return items;
}

export function getOccasionFaqs(occasion: Occasion) {
  const lowerName = occasion.name.toLowerCase();
  const article = getIndefiniteArticle(lowerName);

  return [
    {
      question: `Can I make ${article} ${lowerName} invitation for free?`,
      answer: `Yes. You can customize your ${lowerName} design, update the text, and download it without paying for a subscription.`,
    },
    {
      question: `What should ${article} ${lowerName} invitation include?`,
      answer: `A strong ${lowerName} invitation usually includes the event title, date, time, venue, host details, and an RSVP contact.`,
    },
    {
      question: `Can I use these ${lowerName} templates on mobile?`,
      answer: 'Yes. The editor is designed to work on mobile and desktop so you can create and download your card from any device.',
    },
    {
      question: `Can I print my ${lowerName} invitation after downloading it?`,
      answer: 'Yes. The downloaded PNG works for digital sharing and can also be used for home or local print workflows.',
    },
  ];
}

export function getOccasionWordingExamples(occasion: Occasion) {
  const lowerName = occasion.name.toLowerCase();

  return [
    {
      title: `Short ${occasion.name} invitation wording`,
      body: `Please join us for a ${lowerName} celebration for [Name] on [Date] at [Time]. Venue: [Location]. RSVP: [Contact].`,
    },
    {
      title: `Formal ${occasion.name} invitation wording`,
      body: `You are warmly invited to attend a ${lowerName} celebration honoring [Name]. We would be delighted to see you on [Date] at [Time] at [Venue]. Kindly RSVP to [Contact].`,
    },
    {
      title: `Casual ${occasion.name} invitation wording`,
      body: `We are getting together for a ${lowerName} event and would love to have you there. Come by on [Date] at [Time] at [Venue]. Let us know if you can make it: [Contact].`,
    },
    {
      title: `${occasion.name} WhatsApp or text invite`,
      body: `Hey! We are hosting a ${lowerName} celebration on [Date] at [Time] at [Venue]. Hope you can come. RSVP here: [Contact].`,
    },
  ];
}

export function getOccasionPlanningTips(occasion: Occasion) {
  return [
    `Match the invitation tone to the kind of ${occasion.name.toLowerCase()} event you are hosting, whether that is formal, playful, minimal, or family-focused.`,
    `Send your ${occasion.name.toLowerCase()} invitation with enough lead time so guests can plan, especially if the event includes travel or coordinated outfits.`,
    `Include the key next step clearly, such as RSVP instructions, gift preferences, dress code, parking notes, or arrival details.`,
  ];
}

export function getOccasionMakerGrowthData(occasion: Occasion): OccasionMakerGrowthData {
  const override = MAKER_GROWTH_OVERRIDES[occasion.slug];

  if (override) {
    return {
      title: `Free ${occasion.name} Invitation Maker | ${SITE.name}`,
      ...override,
    };
  }

  return {
    title: `Free ${occasion.name} Invitation Maker | ${SITE.name}`,
    metaDescription: `${occasion.description} Choose from ${occasion.templates.length} templates, personalize your text, and download a high-resolution invitation for free.`,
    intro: `${occasion.description} Pick a template, customize your text, and download your invitation for free.`,
    searchTerms: [
      `${occasion.name.toLowerCase()} invitation`,
      `${occasion.name.toLowerCase()} template`,
      `online ${occasion.name.toLowerCase()} invitation`,
      `printable ${occasion.name.toLowerCase()} invitation`,
      `${occasion.name.toLowerCase()} invitation wording`,
    ],
    highlights: [
      `Browse editable ${occasion.name.toLowerCase()} templates built to match different event styles and guest expectations.`,
      `Customize guest-facing details like host names, timing, venue notes, and RSVP information in one editor flow.`,
      `Switch from inspiration to a finished ${occasion.name.toLowerCase()} card quickly with templates, wording, and download options in the same journey.`,
    ],
    routeSuggestions: [
      {
        title: `${occasion.name} templates`,
        href: `/templates/${occasion.slug}/`,
        description: `Compare editable ${occasion.name.toLowerCase()} template styles before opening the editor.`,
      },
      {
        title: `${occasion.name} invitation hub`,
        href: `/invitations/${occasion.slug}/`,
        description: `Explore the broader invitation cluster for templates, wording, and long-tail occasion intent.`,
      },
      {
        title: `${occasion.name} wording ideas`,
        href: `/wording/${occasion.slug}/`,
        description: `Use message ideas and checklists that help you finish the invitation faster.`,
      },
      {
        title: 'Printable invitation maker',
        href: '/features/printable-invitation-maker/',
        description: 'See the print-focused product page for downloadable and print-ready card workflows.',
      },
      {
        title: 'WhatsApp invitation maker',
        href: '/features/whatsapp-invitation-maker/',
        description: 'Use the mobile-sharing route when the invitation needs to travel fast between guests.',
      },
      {
        title: 'Hosted RSVP invitation pages',
        href: '/features/rsvp-invitation-pages/',
        description: 'Explore shareable invite pages with RSVP-by details, schedule notes, and guest contact prompts.',
      },
    ],
  };
}

export function getOccasionTemplateHighlights(occasion: Occasion) {
  return occasion.templates.slice(0, 4).map((template) => ({
    title: template.name,
    description: `${template.name} is one of the ${occasion.name.toLowerCase()} styles available in the editor for fast customization.`,
  }));
}

export function getOccasionHubLinks(occasion: Occasion) {
  const lowerName = occasion.name.toLowerCase();
  const article = getIndefiniteArticle(occasion.name);

  return [
    {
      title: `Make ${article} ${occasion.name} invitation`,
      href: `/make/${occasion.slug}/`,
      description: `Open the editor and customize your ${lowerName} design right away.`,
    },
    {
      title: `${occasion.name} templates`,
      href: `/templates/${occasion.slug}/`,
      description: `Browse the available template styles before jumping into the editor.`,
    },
    {
      title: `${occasion.name} wording ideas`,
      href: `/wording/${occasion.slug}/`,
      description: `Use wording samples, message ideas, and checklist guidance for this event type.`,
    },
  ];
}

export function getOccasionModifierLinks(occasion: Occasion): OccasionModifierLink[] {
  return MODIFIER_DEFINITIONS.map((modifier) => ({
    title: `${modifier.label} ${occasion.name} invitations`,
    href: `/invitations/${occasion.slug}/${modifier.slug}/`,
    description: `Open the ${modifier.label.toLowerCase()} route for ${occasion.name.toLowerCase()} invitation intent and related wording ideas.`,
  }));
}

export function getOccasionSummary(occasion: Occasion) {
  const tags = occasion.tags.slice(0, 3).join(', ');

  return `${occasion.description} This collection is built for ${tags} searches and includes ${occasion.templates.length} editable designs.`;
}

export function getOccasionFamilyPath(family: LandingFamily, occasion: Occasion) {
  switch (family) {
    case 'make':
      return `/make/${occasion.slug}/`;
    case 'invitations':
      return `/invitations/${occasion.slug}/`;
    case 'templates':
      return `/templates/${occasion.slug}/`;
    case 'wording':
      return `/wording/${occasion.slug}/`;
    default:
      return `/make/${occasion.slug}/`;
  }
}

export function getStaticFamilyPaths(family: Exclude<LandingFamily, 'make'>) {
  return OCCASIONS.map((occasion) => ({
    params: { occasion: occasion.slug },
    props: { occasion, family },
  }));
}

export function getOccasionRelated(occasion: Occasion, limit = 6) {
  return OCCASIONS.filter((entry) => entry.slug !== occasion.slug).slice(0, limit);
}
