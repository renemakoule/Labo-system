import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Une liste de toutes les langues que vous supportez
  locales: ['fr', 'ar'],

  // La langue par défaut si la locale de l'utilisateur ne correspond pas
  defaultLocale: 'fr'
});

export const config = {
  // Ignorer les chemins qui ne nécessitent pas d'internationalisation
  matcher: ['/((?!api|_next|.*\\..*).*)']
};