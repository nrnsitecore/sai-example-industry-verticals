import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;
  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 py-24 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="mb-16 lg:mb-0">
          <h2 className="max-w-md font-semibold">
            <Text field={featureSectionTitle.jsonValue} />
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="flex flex-col" key={index}>
                <div className="font-heading mb-4 text-xl font-semibold">
                  <Text field={title} />
                </div>
                <div className="text-foreground-light mb-4 flex-auto leading-relaxed">
                  <Text field={description} />
                </div>
                <div>
                  <Link field={link} className="arrow-btn" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-2 gap-4 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div
              className="flex items-center justify-center py-6 opacity-40 grayscale transition-all duration-400 hover:opacity-100 hover:grayscale-0 lg:py-4"
              key={index}
            >
              {imageField && <Image field={imageField} className="max-h-16 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-16 py-24 md:flex-row">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
              <div className="bg-background-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Image field={image} className="size-10 opacity-70" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  <Text tag="h5" className="text-foreground" field={title} />
                </div>
                <div className="text-foreground-muted text-center">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-6 py-24 md:grid-cols-2 lg:grid-cols-4">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group hover:border-border hover:shadow-soft cursor-pointer rounded-2xl border border-transparent p-8 transition-all duration-400"
              key={index}
            >
              <h1 className="font-display text-foreground/10 group-hover:text-foreground/30 mb-2 text-7xl leading-none transition-colors duration-400">
                {generateIndexes(index)}
              </h1>
              <div>
                <div className="font-heading text-foreground mb-3 text-xl font-semibold">
                  <Text field={title} />
                </div>
                <div className="text-foreground-muted leading-relaxed">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-16 py-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-3" key={index}>
              <div className="flex items-center justify-center">
                <Image field={image} className="opacity-70" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-heading text-lg font-semibold">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-foreground-muted leading-relaxed">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div key={index} className="group">
              <div className="bg-background-accent mb-6 aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  field={image}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h6 className="font-heading">
                <Text field={title} />
              </h6>
              <p className="text-foreground-muted mt-1">
                <Text field={description} />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
