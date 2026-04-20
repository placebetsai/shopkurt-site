import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Blue-Collar Essentials & Workwear Basics | Fashionistas.ai',
  description:
    'Budget-friendly workwear, shoes, bags, and practical upgrades built for IHateCollege readers heading into jobs, apprenticeships, and trades.',
};

export default function BlueCollarEssentialsPage() {
  return (
    <IntentProductLanding
      eyebrow="IHateCollege.com Edit"
      title="Blue-Collar Essentials & First-Job Basics"
      description="Work shoes, practical bags, durable basics, and budget-friendly style upgrades for interviews, apprenticeships, trade programs, and first-job routines."
      query="product_type:Footwear OR product_type:Shoes OR product_type:Sneakers OR product_type:Sandals OR product_type:Loafers OR product_type:Clothing OR tag:footwear"
      collectionHref="/products"
      collectionLabel="Browse Work-Ready Picks"
    />
  );
}
