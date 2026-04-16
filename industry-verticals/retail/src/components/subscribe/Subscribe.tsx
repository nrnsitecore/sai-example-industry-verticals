import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    ConsentText?: RichTextField;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner group py-16 md:py-20 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="grid items-center gap-y-8 md:grid-cols-2 md:gap-x-16 md:gap-y-0">
          <h2 className="text-2xl leading-tight font-semibold xl:text-3xl">
            <Text field={props.fields?.Title} />
          </h2>

          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="border-border text-foreground placeholder:text-foreground-muted focus:border-foreground h-14 w-full rounded-full border bg-white ps-6 pe-36 focus:outline-none"
              />

              <button
                type="submit"
                className="bg-foreground hover:bg-foreground/80 absolute top-1/2 right-2 h-10 -translate-y-1/2 rounded-full px-6 text-sm font-medium tracking-[0.1em] text-white uppercase transition-all duration-400"
              >
                {t('button_text') || 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const WithConsent = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const uid = props.rendering.uid;
  const { t } = useI18n();

  return (
    <section className={`component subscribe-banner group ${styles ?? ''}`} id={id || undefined}>
      <div className="max-w-sm">
        <div className="mb-6">
          <h2 className="text-lg leading-tight font-semibold xl:text-xl">
            <Text field={props.fields?.Title} />
          </h2>
        </div>

        <form className="w-full" action="">
          <label htmlFor={`subscribe-email-${uid}`} className="sr-only">
            {t('enter_email') || 'Enter your email'}
          </label>

          <input
            id={`subscribe-email-${uid}`}
            type="email"
            inputMode="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t('enter_email') || 'Enter your email'}
            className="border-border text-foreground placeholder:text-foreground-muted focus:border-foreground h-12 w-full rounded-full border bg-white ps-6 pe-6 focus:outline-none md:h-14"
          />

          <button
            type="submit"
            className="bg-foreground hover:bg-foreground/80 mt-3 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-medium tracking-[0.15em] text-white uppercase transition-all duration-400 md:h-12"
          >
            {t('button_text') || 'Subscribe'}
          </button>

          {props.fields?.ConsentText && (
            <div className="mt-4 flex items-start gap-3">
              <input
                id="subscribe-consent"
                type="checkbox"
                className="border-foreground/30 accent-foreground mt-1 size-4 rounded-sm border bg-white"
                required
              />
              <label
                htmlFor="subscribe-consent"
                className="text-foreground-muted text-sm leading-6"
              >
                <RichText field={props.fields.ConsentText} />
              </label>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
