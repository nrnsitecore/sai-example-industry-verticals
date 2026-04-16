import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Link,
  LinkField,
  NextImage as ContentSdkImage,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="bg-[#0a0a0a] text-white">
        <div className="container grid gap-16 py-24 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-6">
            <div className="sm:max-w-34">
              <ContentSdkImage
                field={props.fields.Logo}
                className="h-8 w-auto max-w-full brightness-0 invert sm:h-10"
              />
            </div>
            <RichText
              field={props.fields.Description}
              className="text-sm leading-relaxed text-white/60 [&_a]:text-white/80 [&_a]:transition-colors [&_a]:hover:text-white"
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6 xl:gap-12">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="mb-6 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
                  {title}
                </div>
                <div className="space-y-3 [&_a]:text-sm [&_a]:text-white/50 [&_a]:transition-colors [&_a]:hover:text-white">
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="container flex items-center justify-between py-6 text-sm text-white/40 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="flex items-center justify-between gap-12 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <Link
              field={props.fields.TermsText}
              className="transition-colors hover:text-white/70"
            />
            <Link
              field={props.fields.PolicyText}
              className="transition-colors hover:text-white/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
