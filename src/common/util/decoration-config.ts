import { applyDecorators, BadRequestException } from '@nestjs/common';
import { IsString, Length, registerDecorator, ValidationOptions } from 'class-validator';

export function IsStringWithLen(min: number, max: number) {
  return applyDecorators(IsString(), Length(min, max));
}
export function IsStoryValidTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStoryValidTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(validTime: any) {
          if (validTime !== '12' && validTime !== '24') {
            throw new BadRequestException('TTL must be 12 or 24');
          }
          return true;
        },
      },
    });
  };
}
export function IsHashtag(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsHashtag',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(hashtags: string[]) {
          if (hashtags.length === 0 || hashtags === null) {
            return true;
          }
          hashtags.forEach((hashtag) => {
            if (!hashtag.startsWith('#')) {
              throw new BadRequestException('#누락');
            }
          });
          return true;
        },
      },
    });
  };
}
