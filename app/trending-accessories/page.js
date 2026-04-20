import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Trending Accessories | Fashionistas.ai',
  description:
    'Trending accessories, jewelry, bags, and low-cost style upgrades built for impulse buys and everyday outfit refreshes.',
  alternates: {
    canonical: 'https://fashionistas.ai/trending-accessories',
  },
};

export default function TrendingAccessoriesPage() {
  return (
    <IntentProductLanding
      eyebrow="Low-Cost Upgrades"
      title="Trending Accessories That Make the Outfit"
      description="A tighter mix of jewelry, bags, and easy add-ons that work for everyday outfits, nights out, and quick style upgrades."
      query="bag OR accessory OR jewelry OR necklace OR earring OR bracelet"
      collectionHref="/collections/accessories"
      collectionLabel="Shop Accessories"
    />
  );
}
