import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('auth.signIn')}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {t('common.welcome')} to Superteam Academy
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => signIn('google')}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {t('auth.googleSignIn')}
            </Button>

            <Button
              onClick={() => signIn('github')}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-800"
            >
              {t('auth.githubSignIn')}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  {t('common.or')}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('auth.walletSignIn')}
              </p>
              <div className="flex justify-center">
                <WalletMultiButton className="!bg-primary-500 !text-white hover:!bg-primary-600" />
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}