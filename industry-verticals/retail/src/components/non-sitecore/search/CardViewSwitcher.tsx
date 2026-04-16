import React from 'react';

import { CardViewSwitcher } from '@sitecore-search/ui';

type CardViewSwitcherProps = {
  onToggle: (value: string) => void;
  defaultCardView: 'list' | 'grid';
  GridIcon: React.FC;
  ListIcon: React.FC;
};

const CardViewSwitcherComponent = ({
  onToggle,
  defaultCardView,
  GridIcon,
  ListIcon,
}: CardViewSwitcherProps) => {
  return (
    <CardViewSwitcher.Root
      onValueChange={onToggle}
      defaultValue={defaultCardView}
      className="inline-flex"
    >
      <CardViewSwitcher.Item
        value="grid"
        aria-label="Grid View"
        className="bg-background text-foreground-light hover:bg-background-muted hover:text-foreground focus:outline-foreground data-[state=on]:bg-foreground mr-2 ml-0 flex size-7.5 items-center justify-center rounded-full transition-all duration-400 data-[state=on]:text-white"
      >
        <GridIcon />
      </CardViewSwitcher.Item>
      <CardViewSwitcher.Item
        value="list"
        aria-label="List View"
        className="bg-background text-foreground-light hover:bg-background-muted hover:text-foreground focus:outline-foreground data-[state=on]:bg-foreground ml-0 flex size-7.5 items-center justify-center rounded-full transition-all duration-400 data-[state=on]:text-white"
      >
        <ListIcon />
      </CardViewSwitcher.Item>
    </CardViewSwitcher.Root>
  );
};

export default CardViewSwitcherComponent;
