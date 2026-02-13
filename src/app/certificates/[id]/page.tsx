import { CertificateView } from '@/components/certificate-view';

export default function CertificatePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CertificateView certificateId={params.id} />
    </div>
  );
}