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
      className={`component hero-banner ${styles} relative flex min-h-[85vh] items-center overflow-hidden`}
      id={id}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#00c853] via-[#059669] to-[#7c3aed]" />

      <div className="absolute inset-0 z-1">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
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
            className="h-full w-full object-cover opacity-25 mix-blend-overlay"
            priority
          />
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
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[85vh] w-full py-16 lg:w-3/5 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-0'}`}
          >
            <div className="max-w-2xl">
              <div className={clsx({ shim: screenLayer })}>
                <h1 className="text-6xl leading-[1.05] font-black text-white md:text-7xl lg:text-left xl:text-[96px]">
                  <ContentSdkText field={fields.Title} />
                </h1>

                <div className="mt-6 text-lg text-white/90 md:text-xl lg:text-left">
                  <ContentSdkRichText field={fields.Description} className="lg:text-left" />
                </div>

                <div className="mt-8 flex w-full lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="pill-btn text-lg" />
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
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex min-h-[85vh] justify-center px-4">
          <div
            className={`flex flex-col items-center py-16 lg:py-32 ${reverseLayout ? 'justify-end' : 'justify-center'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              <h1 className="text-center text-6xl leading-[1.05] font-black text-white md:text-7xl xl:text-[96px]">
                <ContentSdkText field={fields.Title} />
              </h1>

              <div className="mt-6 text-lg text-white/90 md:text-xl">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="pill-btn text-lg" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
