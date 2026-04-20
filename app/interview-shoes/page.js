import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Interview Shoes | Fashionistas.ai',
  description:
    'Affordable interview shoes, loafers, flats, low heels, and clean work-ready picks for first jobs, internships, and office dress codes.',
  alternates: {
    canonical: 'https://fashionistas.ai/interview-shoes',
  },
};

export default function InterviewShoesPage() {
  return (
    <IntentProductLanding
      eyebrow="Work-Ready Picks"
      title="Interview Shoes That Don’t Look Cheap"
      description="Built for first jobs, internships, and office dress codes. Focused on loafers, flats, low heels, and polished shoes that look put together without wrecking your budget."
      query="shoe OR heel OR flat OR loafer OR wedge"
      collectionHref="/collections/fashion"
      collectionLabel="Shop Shoes & Fashion"
    />
  );
}
