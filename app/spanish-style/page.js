import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Spanish Style, Resort Looks & Show-Inspired Fashion | Fashionistas.ai',
  description:
    'Show-inspired fashion, sandals, jewelry, and dramatic resort looks curated for SpanishTVShows readers.',
};

export default function SpanishStylePage() {
  return (
    <IntentProductLanding
      eyebrow="SpanishTVShows.com Edit"
      title="Spanish Style, Resort Looks & Show-Inspired Fashion"
      description="A cleaner style section for readers who want Spanish-series energy: sharper black pieces, vacation sandals, layered jewelry, and more dramatic editorial accessories."
      query="product_type:Clothing OR product_type:Dresses OR product_type:Sandals OR product_type:Jewelry OR product_type:Sneakers OR tag:clothing OR tag:fashion"
      collectionHref="/collections/fashion"
      collectionLabel="Browse Style Edit"
    />
  );
}
