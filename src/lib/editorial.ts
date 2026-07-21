import { absoluteUrl } from './site';

export const EDITORIAL_TEAM = {
  name: 'Bespoke Card Studio Editorial Team',
  jobTitle: 'Invitation Content Review Team',
  bio: 'The editorial team reviews invitation wording, event-planning guidance, and product help content so pages stay practical, accurate, and aligned with real invitation workflows.',
  profilePath: '/about/',
  policyPath: '/content-standards/',
  contactPath: '/contact/',
};

export const EDITORIAL_DATES = {
  published: '2026-07-01',
  modified: '2026-07-21',
};

export function getEditorialAuthorSchema() {
  return {
    '@type': 'Organization',
    name: EDITORIAL_TEAM.name,
    url: absoluteUrl(EDITORIAL_TEAM.profilePath),
    description: EDITORIAL_TEAM.bio,
  };
}

export function formatEditorialDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
