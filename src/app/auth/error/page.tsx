import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function AuthErrorPage({ searchParams }: { searchParams: { error: string } }) {
  const { t } = useTranslation();
  
  const errorMessages: Record<string, string> = {
    'OAuthAccountNotLinked': 'This email is already associated with another account.',
    'default': 'An error occurred during authentication. Please try again.'
  };

  const errorMessage = errorMessages[searchParams.error] || errorMessages.default;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-500">{t('errors.authFailed')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {errorMessage}
            </p>
            <div className="space-y-3">
              <Link href="/auth/signin" className="w-full block">
                <Button className="w-full">
                  {t('auth.signIn')}
                </Button>
              </Link>
              <Link href="" className="w-full block">
                <Button variant="outline" className="w-full">
                  {t('common.back')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}