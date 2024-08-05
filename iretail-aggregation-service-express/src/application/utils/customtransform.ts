import { ExposeOptions, Transform, TransformFnParams } from "class-transformer";
import "reflect-metadata";

export function customTransform(value: any): string {
  if ("value" in value) {
    if (value && value?.obj[value?.key]) {
      return value?.obj[value?.key].toString();
    } else return "";
  }
  return "";
}

export const ExposeId =
  (options?: ExposeOptions) => (target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(
      target,
      propertyKey
    );
  };

export function TransformProperties(
  sourceKey: string,
  targetKey?: string,
  childKey?: string
) {
  return Transform((value: any) =>
    customTransformForFields(value, sourceKey, targetKey, childKey)
  );
}

export function customTransformForFields(
  obj: any,
  value: any,
  key?: string,
  childKey?: string
): any {
  if (value in obj?.obj) {
    if (key) {
      return childKey
        ? obj?.obj[value] &&
            obj?.obj[value][key] &&
            obj?.obj[value][key][childKey]
        : obj?.obj[value] && obj?.obj[value][key];
    } else {
      return obj?.obj[value];
    }
  }
}
