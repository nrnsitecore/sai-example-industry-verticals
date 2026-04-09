import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import StarRating from './StarRating';
import { SitecoreItem } from '@/types/common';
import { User } from 'lucide-react';

type ReviewCardProps = SitecoreItem<{
  Avatar: ImageField;
  ReviewerName: TextField;
  Caption: TextField;
  Description: TextField;
  ReviewImage: ImageField;
  Rating: Field<number>;
}> & { isPageEditing?: boolean };

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <>
      <div className="aspect-square min-h-96 w-full overflow-hidden rounded-2xl">
        <ContentSdkImage className="image-cover rounded-2xl" field={props.fields.ReviewImage} />
      </div>
      <div className="px-4">
        <div className="border-border shadow-soft relative -top-14 flex min-h-64 flex-col items-center justify-between rounded-2xl border bg-white p-6 text-center">
          <div className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={48}
                height={48}
                field={props.fields.Avatar}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <div className="bg-background-muted text-foreground-muted flex h-12 w-12 items-center justify-center rounded-full">
                <User className="size-7" />
              </div>
            )}
          </div>
          <div className="text-foreground mt-6">
            <div className="text-center text-lg leading-normal font-bold capitalize">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-foreground-muted text-center text-sm leading-normal">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="text-foreground-light text-center text-sm leading-5">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
