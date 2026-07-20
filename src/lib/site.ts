export const SITE = {
  name: 'Bespoke Card Studio',
  shortName: 'BespokeCardStudio',
  domain: 'https://www.bespokecardstudio.com',
  email: 'contact@bespokecardstudio.com',
  ogImage: '/og-image.png',
  defaultTitle: 'Free Invitation Maker | Bespoke Card Studio',
  defaultDescription:
    'Create free invitations online, customize fast, download print-ready cards, and share hosted RSVP invites for birthdays, weddings, showers, and more.',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.domain).toString();
}
