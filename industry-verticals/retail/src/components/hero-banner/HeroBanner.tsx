import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles: rawStyles, RenderingIdentifier: id } = params;
  const styles = rawStyles || '';
  const isPageEditing = page.mode.isEditing;
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner ${styles} relative overflow-hidden bg-gradient-to-b from-[#f0f0ff] via-[#f5f3ff] to-white`}
      id={id}
    >
      <div className="container mx-auto px-4">
        <div
          className={clsx(
            'grid min-h-[70vh] items-center gap-8 py-16 lg:grid-cols-2 lg:gap-12 lg:py-24',
            reverseLayout && 'direction-rtl'
          )}
        >
          {/* Copy */}
          <div className={clsx('flex flex-col justify-center', { shim: screenLayer })}>
            <h1 className="text-dfin-navy text-5xl leading-[1.1] font-black md:text-6xl xl:text-7xl">
              <ContentSdkText field={fields.Title} />
            </h1>

            <AccentLine className="!bg-dfin-purple mt-4" />

            <div className="text-foreground-light mt-6 max-w-lg text-lg leading-relaxed">
              <ContentSdkRichText field={fields.Description} />
            </div>

            <div className="mt-8">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link
                  field={fields.CtaLink}
                  className="bg-dfin-purple hover:bg-dfin-purple/90 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-lg font-semibold text-white transition-all hover:shadow-lg"
                />
              )}
            </div>
          </div>

          {/* Image */}
          <div className="flex items-center justify-center">
            {!isPageEditing && fields?.Video?.value?.src ? (
              <video
                className="w-full max-w-xl rounded-2xl object-contain"
                autoPlay
                muted
                loop
                playsInline
                poster={fields.Image?.value?.src}
              >
                <source src={fields.Video?.value?.src} type="video/webm" />
              </video>
            ) : (
              <ContentSdkImage
                field={fields.Image}
                className="w-full max-w-xl object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles: rawStyles, RenderingIdentifier: id } = params;
  const styles = rawStyles || '';
  const isPageEditing = page.mode.isEditing;
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner ${styles} relative overflow-hidden bg-gradient-to-b from-[#f0f0ff] via-[#f5f3ff] to-white`}
      id={id}
    >
      <div className="container mx-auto px-4">
        <div
          className={clsx(
            'flex min-h-[70vh] flex-col items-center justify-center py-16 text-center lg:py-24',
            reverseLayout && 'justify-end'
          )}
        >
          <div className={clsx({ shim: screenLayer })}>
            <h1 className="text-dfin-navy text-5xl leading-[1.1] font-black md:text-6xl xl:text-7xl">
              <ContentSdkText field={fields.Title} />
            </h1>

            <AccentLine className="!bg-dfin-purple mx-auto mt-4" />

            <div className="text-foreground-light mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              <ContentSdkRichText field={fields.Description} className="text-center" />
            </div>

            <div className="mt-8">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link
                  field={fields.CtaLink}
                  className="bg-dfin-purple hover:bg-dfin-purple/90 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-lg font-semibold text-white transition-all hover:shadow-lg"
                />
              )}
            </div>

            {/* Image below content */}
            <div className="mt-12 flex justify-center">
              <ContentSdkImage
                field={fields.Image}
                className="w-full max-w-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
