import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export function MatchFields(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyKey: string) {
    registerDecorator({
      name: 'MatchFields',
      target: object.constructor,
      propertyName: propertyKey,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(
          value: string | number | boolean | null | undefined,
          args: ValidationArguments
        ): boolean {
          // ✅ Cast explícito para evitar any
          const [relatedProperty] = args.constraints as [string];
          const obj = args.object as Record<string, unknown>;
          const relatedValue = obj[relatedProperty] as typeof value;
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments): string {
          const [relatedProperty] = args.constraints as [string];
          return `${args.property} debe coincidir con ${relatedProperty}`;
        }
      }
    });
  };
}
