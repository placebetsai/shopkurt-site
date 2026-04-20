import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Bettor Desk Gear, Setup Accessories & Study Tools | Fashionistas.ai',
  description:
    'Desk gear, organizers, lighting, and setup accessories for sports bettors and prediction-market grinders from PlaceBets.ai.',
};

export default function BettorDeskPage() {
  return (
    <IntentProductLanding
      eyebrow="PlaceBets.ai Edit"
      title="Bettor Desk Gear, Setup Accessories & Study Tools"
      description="A searchable desk-setup section for bettors who spend real time studying markets. Built around organizers, lamps, phone stands, notebooks, and low-cost desk upgrades that fit a serious betting workspace."
      query="desk lamp phone stand notebook organizer mug desk accessories gaming setup"
      collectionHref="/products"
      collectionLabel="Browse Desk Gear"
    />
  );
}
