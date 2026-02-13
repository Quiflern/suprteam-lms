import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useWallet } from '@solana/wallet-adapter-react';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { Credential } from '@/services/learning-progress.service';
import { Download, Share2, ExternalLink } from 'lucide-react';

export function CertificateView({ certificateId }: { certificateId: string }) {
  const wallet = useWallet();
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredential = async () => {
      if (!wallet.publicKey) {
        setError('Please connect your wallet to view credentials');
        setLoading(false);
        return;
      }

      try {
        const service = new LocalLearningProgressService();
        const credentials = await service.getCredentials(wallet.publicKey);
        const foundCredential = credentials.find(c => c.id === certificateId) || credentials[0];
        
        if (foundCredential) {
          setCredential(foundCredential);
        } else {
          setError('Credential not found');
        }
      } catch (err) {
        setError('Failed to load credential');
        console.error('Error fetching credential:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredential();
  }, [wallet.publicKey, certificateId]);

  const handleDownload = () => {
    if (!credential) return;

    // Create a downloadable certificate
    const certificateContent = `
      Solana Certificate of Completion
      ================================
      
      This certificate is awarded to:
      ${wallet.publicKey?.toString().substring(0, 8)}...
      
      For successfully completing:
      ${credential.name}
      
      Level: ${credential.level}
      Date: ${new Date().toLocaleDateString()}
      
      Verification:
      ${credential.verificationLink}
      
      Mint Address: ${credential.mintAddress}
    `;

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${credential.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (!credential) return;

    const shareText = `I just earned my ${credential.name} certificate from Superteam Academy! 🎓\n\nLevel: ${credential.level}\nXP: ${credential.metadata?.xp || 'N/A'}\n\nVerify on Solana Explorer: ${credential.verificationLink}\n\n#Solana #Blockchain #Web3 #SuperteamAcademy`;

    if (navigator.share) {
      navigator.share({
        title: `Superteam Academy Certificate: ${credential.name}`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const encodedText = encodeURIComponent(shareText);
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 dark:text-gray-400">Loading certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        {!wallet.connected && (
          <Button onClick={() => wallet.connect()}>Connect Wallet</Button>
        )}
      </div>
    );
  }

  if (!credential) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 dark:text-gray-400">Certificate not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Verifiable on-chain credential from Superteam Academy
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Superteam Academy</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Solana Developer Certification</p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">This certificate is awarded to:</h2>
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded-lg mb-4">
              {wallet.publicKey?.toString().substring(0, 8)}...
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">For successfully completing:</h3>
            <p className="text-xl font-bold text-primary-500">{credential.name}</p>
            <Badge variant="secondary" className="mt-2">Level {credential.level}</Badge>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-1">🎓</div>
                <div className="text-xs font-bold">SOLANA</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <h4 className="font-semibold mb-2">Certificate Details</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Mint Address:</strong> {credential.mintAddress.substring(0, 16)}...</p>
              <p><strong>Credential ID:</strong> {credential.id}</p>
              <p><strong>Verification:</strong> On-chain via Solana Blockchain</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download Certificate
        </Button>
        <Button onClick={handleShare} variant="outline" className="w-full">
          <Share2 className="mr-2 h-4 w-4" /> Share Achievement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">On-Chain Verification</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                This credential is stored as a compressed NFT (cNFT) on the Solana blockchain using the Metaplex Bubblegum protocol.
              </p>
              <a
                href={credential.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-500 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View on Solana Explorer
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Metadata</h4>
              <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
                {JSON.stringify(credential.metadata, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How to Verify</h4>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                <li>Visit the Solana Explorer link above</li>
                <li>Check that the mint address matches: {credential.mintAddress.substring(0, 24)}...</li>
                <li>Verify the transaction history shows this credential was awarded to your wallet</li>
                <li>The metadata should contain your achievement details</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>This certificate represents your achievement in Solana development. The credential is stored immutably on the Solana blockchain.</p>
      </div>
    </div>
  );
}