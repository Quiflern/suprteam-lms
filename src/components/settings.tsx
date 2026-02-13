import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from './ui/use-toast';

export function Settings() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const wallet = useWallet();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('solana_dev');
  const [bio, setBio] = useState('Solana developer learning the ropes');
  const [twitter, setTwitter] = useState('@solana_dev');

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast({
      title: t('auth.signOut'),
      description: t('common.success'),
    });
  };

  const handleConnectAuth = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/settings' });
  };

  const handleSaveProfile = () => {
    toast({
      title: t('common.save'),
      description: t('common.success'),
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('settings.username')}</Label>
            <Input 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">{t('settings.bio')}</Label>
            <Input 
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">{t('settings.twitterHandle')}</Label>
            <Input 
              id="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveProfile}>{t('common.save')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Connected Wallet</Label>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">
                  {wallet.connected
                    ? wallet.publicKey?.toString().substring(0, 8) + '...'
                    : 'Not connected'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {wallet.wallet?.adapter.name || 'No wallet connected'}
                </p>
              </div>
              {!wallet.connected ? (
                <Button onClick={() => wallet.connect()}>Connect Wallet</Button>
              ) : (
                <Button variant="outline" onClick={() => wallet.disconnect()}>
                  Disconnect
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Authentication</Label>
            <div className="space-y-2">
              {session?.user?.email ? (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('settings.connected')}: {session.user.email}
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleSignOut}>{t('auth.signOut')}</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('settings.notConnected')}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleConnectAuth('google')}>{t('common.connect')}</Button>
                </div>
              )}

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('settings.notConnected')}
                  </p>
                </div>
                <Button variant="outline" onClick={() => handleConnectAuth('github')}>{t('common.connect')}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('settings.language')}</Label>
            <select 
              className="w-full p-2 border rounded-lg"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>{t('settings.theme')}</Label>
            <select 
              className="w-full p-2 border rounded-lg"
              onChange={(e) => handleThemeChange(e.target.value)}
              defaultValue={theme}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="mb-2 block">Email Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates about new courses and features
              </p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="mb-2 block">Profile Visibility</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make your profile public to appear on leaderboards
              </p>
            </div>
            <Button variant="outline">Public</Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="mb-2 block">Data Export</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download your learning data and credentials
              </p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
}