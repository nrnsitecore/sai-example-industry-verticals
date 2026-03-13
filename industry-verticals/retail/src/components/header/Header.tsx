import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { TE_LOGO_URL } from '@/constants/brand';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component header ${styles}`} id={id}>
      {/* TE-style top utility bar - no logo (single logo is in main row below) */}
      <div className="bg-background-muted border-border border-b">
        <div className="text-foreground-light container flex flex-wrap items-center justify-end gap-x-3 gap-y-2 px-4 py-2 text-xs sm:gap-x-4 sm:text-sm">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 md:gap-x-6">
            <span className="whitespace-nowrap">
              Need Help?
              <span className="hidden sm:inline"> +1 800 522 6752</span>
            </span>
            <span className="text-accent cursor-pointer whitespace-nowrap hover:underline">
              Chat
            </span>
            <span className="hidden whitespace-nowrap md:inline">English (EN) | United States</span>
            <span className="whitespace-nowrap md:hidden">EN | US</span>
            <a href="#" className="hover:text-accent whitespace-nowrap transition-colors">
              Login / Register
            </a>
            <span className="hidden whitespace-nowrap lg:inline">My Account</span>
          </div>
        </div>
      </div>
      {/* Main header row: TE logo and icons (nav moves to bar below) */}
      <div className="bg-background border-border border-b">
        <div className="container flex items-center justify-between gap-2 px-4 py-3 sm:gap-3 md:py-4">
          <div className="min-w-0 flex-1">
            <a href="/" className="inline-flex items-center">
              <img src={TE_LOGO_URL} alt="TE Connectivity" className="h-7 w-auto min-w-0 sm:h-8" />
            </a>
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
        <div className="container px-4">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
