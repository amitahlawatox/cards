export const SITE = {
  name: 'Bespoke Card Studio',
  shortName: 'BespokeCardStudio',
  domain: 'https://www.bespokecardstudio.com',
  email: 'contact@bespokecardstudio.com',
  ogImage: '/og-image.svg',
  defaultTitle: 'Free Invitation Maker | Bespoke Card Studio',
  defaultDescription:
    'Create beautiful free invitations and greeting cards online. Customize text, download high-resolution PNG instantly, and design cards for birthdays, weddings, baby showers, graduations, and more.',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.domain).toString();
}
