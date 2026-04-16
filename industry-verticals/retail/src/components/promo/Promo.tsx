import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import clsx from 'clsx';
import { LayoutStyles, PromoFlags } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

type PromoImageGroupProps = Partial<
  Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>
> & {
  withShadows?: boolean;
};

export type PromoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const PromoContent = ({ ...props }) => {
  return (
    <div className="space-y-5">
      <div className="eyebrow">
        <Text field={props.fields.PromoSubTitle} />
      </div>

      <h2 className="max-w-md">
        <Text field={props.fields.PromoTitle} />
      </h2>

      <div className="text-foreground-light max-w-lg leading-relaxed">
        <ContentSdkRichText field={props.fields.PromoDescription} />
      </div>

      <Link field={props.fields.PromoMoreInfo} className="arrow-btn" />
    </div>
  );
};

export const SingleImageContainer = ({
  PromoImageOne,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  return (
    <div
      className={clsx(
        'relative z-10 aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl',
        withShadows && 'shadow-soft'
      )}
    >
      <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
    </div>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = withShadows ? 'shadow-soft' : '';

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="flex flex-col gap-8 md:w-1/3">
        <div className={`aspect-square overflow-hidden rounded-2xl ${shadowClass}`}>
          <ContentSdkImage field={PromoImageTwo} className="h-full w-full object-cover" />
        </div>
        <div className={`aspect-2/3 overflow-hidden rounded-2xl ${shadowClass}`}>
          <ContentSdkImage field={PromoImageThree} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <div className={`aspect-3/2 overflow-hidden rounded-2xl ${shadowClass}`}>
          <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? 'order-last'
    : '';
  const showSingleImage = !props?.params?.styles?.includes(PromoFlags.ShowMultipleImages);
  const withShadows = !props?.params?.styles?.includes(PromoFlags.HidePromoShadows);

  const justifyContentClass = !showSingleImage ? 'justify-self-start' : '';
  const firstColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-7';
  const secondColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-5';

  return (
    <section className={`${props.params.styles} py-24`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 place-items-center gap-16 lg:grid-cols-12">
        <div className={`${isPromoReversed} col-span-full ${firstColumnSize} relative w-full`}>
          {showSingleImage ? (
            <SingleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              withShadows={withShadows}
            />
          ) : (
            <MultipleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              PromoImageTwo={props.fields.PromoImageTwo}
              PromoImageThree={props.fields.PromoImageThree}
              withShadows={withShadows}
            />
          )}
        </div>

        <div className={`col-span-full ${secondColumnSize} ${justifyContentClass}`}>
          <PromoContent {...props} />
        </div>
      </div>
    </section>
  );
};

export const WithFullImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? 'flex-col-reverse'
    : 'flex-col';

  return (
    <section className={`${props.params.styles} py-24`} id={id ? id : undefined}>
      <div className={`container flex ${isPromoReversed}`}>
        <div className="relative my-10 aspect-[1232/608] overflow-hidden rounded-2xl">
          <ContentSdkImage
            field={props.fields.PromoImageTwo}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="eyebrow">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="max-w-md">
                <Text field={props.fields.PromoTitle} />
              </h2>
            </div>

            <div className="flex max-w-md items-center">
              <ContentSdkRichText
                className="text-foreground-light leading-relaxed"
                field={props.fields.PromoDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithQuote = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed);

  const classesWhenReversed = {
    container: isReversed ? 'container-align-left' : 'container-align-right',
    contentOrder: isReversed ? 'order-1 lg:order-2' : 'order-2 lg:order-1',
    imageTransform: isReversed
      ? '-translate-x-[10%] xl:-translate-x-[20%]'
      : 'translate-x-[10%] xl:translate-x-[15%]',
  };

  return (
    <section
      className={`relative ${props.params.styles} z-10 overflow-hidden pb-15 xl:pb-[4%]`}
      id={id ? id : undefined}
    >
      <div className="font-display text-background-muted absolute top-8 left-8 z-20 text-[120px] leading-none opacity-60 lg:top-[20%] lg:left-1/2 lg:-translate-x-1/2 lg:text-[200px]">
        &ldquo;
      </div>
      <div className="bg-background">
        <div className={classesWhenReversed.container}>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div
              className={`relative mt-10 flex items-center justify-center lg:col-span-1 ${classesWhenReversed.contentOrder}`}
            >
              <div className="text-foreground mb-5 max-w-sm">
                <PromoContent {...props} />
              </div>
            </div>

            <div
              className={`relative z-30 order-2 mb-2 aspect-2/1 w-full translate-y-[25%] scale-100 place-self-end lg:order-1 lg:col-span-2 lg:h-3/4 xl:scale-90 ${classesWhenReversed.imageTransform}`}
            >
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
