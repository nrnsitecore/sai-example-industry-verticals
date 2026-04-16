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

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

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
      className={`component hero-banner ${styles} relative flex min-h-[90vh] items-end overflow-hidden`}
      id={id}
    >
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative z-10 w-full pb-16 text-white lg:pb-24">
        <div className="container mx-auto px-4">
          <div className={`flex w-full lg:w-3/5 ${reverseLayout ? 'lg:ml-auto' : ''}`}>
            <div className="max-w-2xl">
              <div className={clsx({ shim: screenLayer })}>
                <h1 className="font-display text-7xl leading-[0.95] font-normal text-white uppercase md:text-8xl xl:text-[120px]">
                  <ContentSdkText field={fields.Title} />
                </h1>

                <div className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                  <ContentSdkRichText field={fields.Description} />
                </div>

                <div className="mt-8 flex w-full">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="pill-btn-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative z-10 flex w-full items-center justify-center self-center text-white">
        <div className="container mx-auto flex min-h-[90vh] justify-center px-4">
          <div
            className={`flex flex-col items-center py-20 lg:py-40 ${reverseLayout ? 'justify-end' : 'justify-center'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              <h1 className="font-display text-center text-7xl leading-[0.95] font-normal text-white uppercase md:text-8xl xl:text-[120px]">
                <ContentSdkText field={fields.Title} />
              </h1>

              <div className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-white/80 md:text-lg">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="pill-btn-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
