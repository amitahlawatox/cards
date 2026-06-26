import { OCCASIONS, type Occasion } from './occasions';

export type LandingFamily = 'make' | 'invitations' | 'templates' | 'wording';

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
  return [
    {
      question: `Can I make a ${occasion.name.toLowerCase()} invitation for free?`,
      answer: `Yes. You can customize a ${occasion.name.toLowerCase()} design, update the text, and download it without paying for a subscription.`,
    },
    {
      question: `What should a ${occasion.name.toLowerCase()} invitation include?`,
      answer: `A strong ${occasion.name.toLowerCase()} invitation usually includes the event title, date, time, venue, host details, and an RSVP contact.`,
    },
    {
      question: `Can I use these ${occasion.name.toLowerCase()} templates on mobile?`,
      answer: `Yes. The editor is designed to work on mobile and desktop so you can create and download your card from any device.`,
    },
    {
      question: `Can I print my ${occasion.name.toLowerCase()} invitation after downloading it?`,
      answer: `Yes. The downloaded PNG works for digital sharing and can also be used for home or local print workflows.`,
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

export function getOccasionTemplateHighlights(occasion: Occasion) {
  return occasion.templates.slice(0, 4).map((template) => ({
    title: template.name,
    description: `${template.name} is one of the ${occasion.name.toLowerCase()} styles available in the editor for fast customization.`,
  }));
}

export function getOccasionHubLinks(occasion: Occasion) {
  return [
    {
      title: `Make a ${occasion.name} invitation`,
      href: `/make/${occasion.slug}/`,
      description: `Open the editor and customize a ${occasion.name.toLowerCase()} design right away.`,
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
