import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useWallet } from '@solana/wallet-adapter-react';

export function Settings() {
  const wallet = useWallet();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="solana_dev" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" defaultValue="Solana developer learning the ropes" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter Handle</Label>
            <Input id="twitter" defaultValue="@solana_dev" />
          </div>
          <Button>Save Profile</Button>
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
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Not connected
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Not connected
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
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
            <Label>Language</Label>
            <select className="w-full p-2 border rounded-lg">
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <select className="w-full p-2 border rounded-lg">
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