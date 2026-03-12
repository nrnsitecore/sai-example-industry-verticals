import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component header ${styles}`} id={id}>
      {/* TE-style top utility bar */}
      <div className="bg-background-muted border-border border-b">
        <div className="text-foreground-light container flex items-center justify-between py-2 text-sm">
          <span className="text-foreground font-medium">FormaLux</span>
          <div className="flex items-center gap-6">
            <span>Need Help? +1 800 522 6752</span>
            <span className="text-accent cursor-pointer hover:underline">Chat</span>
            <span>English (EN) | United States</span>
            <a href="#" className="hover:text-accent transition-colors">
              Login / Register
            </a>
            <span>My Account</span>
          </div>
        </div>
      </div>
      {/* Main header row: logo and icons only (nav moves to bar below) */}
      <div className="bg-background border-border border-b">
        <div className="container flex items-center justify-between gap-3 py-4">
          <div className="min-w-0 flex-1">
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
          <div className="flex shrink-0">
            <Placeholder
              name={`header-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>
      {/* TE-style full-width primary nav bar */}
      <div className="te-nav-bar bg-te-nav">
        <div className="container">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
