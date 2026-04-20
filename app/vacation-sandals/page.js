import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Vacation Sandals | Fashionistas.ai',
  description:
    'Vacation sandals, wedges, and warm-weather fashion picks for travel, beach nights, resort outfits, and easy summer looks.',
  alternates: {
    canonical: 'https://fashionistas.ai/vacation-sandals',
  },
};

export default function VacationSandalsPage() {
  return (
    <IntentProductLanding
      eyebrow="Warm-Weather Style"
      title="Vacation Sandals, Wedges, and Easy Summer Picks"
      description="Travel-friendly sandals, wedges, and lightweight style upgrades for resort outfits, beach dinners, and low-effort vacation looks."
      query="sandal OR wedge OR heel OR summer OR vacation"
      collectionHref="/collections/fashion"
      collectionLabel="Browse Vacation Style"
    />
  );
}
