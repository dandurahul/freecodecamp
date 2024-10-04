import { ExposeOptions, Transform, TransformFnParams } from 'class-transformer';
import 'reflect-metadata';

export function customTransform(value: any): string {
  if ('value' in value) {
    return value?.obj[value.key]?.toString();
  }
  return '';
}

export const ExposeId =
  (options?: ExposeOptions) => (target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(
      target,
      propertyKey
    );
  };

export function TransformProperties(sourceKey: string, targetKey: string) {
  return Transform((value: any) =>
    customTransformForFields(value, sourceKey, targetKey)
  );
}

export function customTransformForFields(
  obj: any,
  value: any,
  key: string
): any {
  if (value in obj?.obj) {
    return obj?.obj[value] && obj?.obj[value][key];
  }
}
