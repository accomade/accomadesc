export const MoneyFormats: Record<string, Intl.NumberFormat> = {
  en: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }),
  de: new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }),
  fr: new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }),
  pl: new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'EUR',
  }),
  es: new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }),
};
