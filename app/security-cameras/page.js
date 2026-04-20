import IntentProductLanding from '../../components/IntentProductLanding';

export const metadata = {
  title: 'Security Cameras & Hidden Camera Gear | Fashionistas.ai',
  description:
    'Browse security cameras, nanny cams, doorbell cameras, and compact surveillance gear curated for hiddencameras.tv readers.',
};

export default function SecurityCamerasPage() {
  return (
    <IntentProductLanding
      eyebrow="Hiddencameras.tv Edit"
      title="Security Cameras, Nanny Cams & Hidden Gear"
      description="A searchable camera and surveillance section tied to the hiddencameras.tv audience. Use it for home monitoring, doorbell coverage, nanny cams, and compact hidden-camera setups without digging through a generic catalog."
      query="security camera hidden camera nanny cam spy camera doorbell camera dash cam"
      collectionHref="/collections/security-cameras"
      collectionLabel="Browse Camera Collection"
    />
  );
}
