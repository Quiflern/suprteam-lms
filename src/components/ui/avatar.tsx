import * as React from 'react';
import { Avatar as RadixAvatar } from '@radix-ui/react-avatar';

const Avatar = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Root
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ''}`}
  >
    <RadixAvatar.Image
      className="aspect-square h-full w-full"
      ref={ref}
      {...props}
    />
    <RadixAvatar.Fallback
      className="flex h-full w-full items-center justify-center rounded-full bg-muted"
      delayMs={600}
    >
      {props.alt?.charAt(0) || 'U'}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
));
Avatar.displayName = RadixAvatar.Image.displayName;

const AvatarImage = RadixAvatar.Image;
const AvatarFallback = RadixAvatar.Fallback;

export { Avatar, AvatarImage, AvatarFallback };