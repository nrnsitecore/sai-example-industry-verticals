import { ComponentProps } from '@/lib/component-props';
import { Field, Link, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Link: LinkField;
}

interface SectionWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: SectionWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const placeholderKey = `section-wrapper-content-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component section-wrapper py-24 ${styles}`} id={id}>
      <div className="container flex flex-col items-center">
        <h2 className="text-center">
          <Text field={fields.Title} />
        </h2>

        <div className="mt-8 mb-12 w-full">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>

        <Link field={fields.Link} className="pill-btn" />
      </div>
    </section>
  );
};
