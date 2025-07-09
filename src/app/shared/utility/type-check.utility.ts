export class TypeCheckUtility {
  static isUndefined(value: unknown): boolean {
    return typeof value === 'undefined';
  }

  static isNull(value: unknown): boolean {
    return value === null;
  }

  static isNumber(value: unknown): boolean {
    return typeof value === 'number';
  }

  static isString(value: unknown): boolean {
    return typeof value === 'string';
  }

  static isBoolean(value: unknown): boolean {
    return typeof value === 'boolean';
  }

  static isDefined(value: unknown): boolean {
    return value !== undefined && value !== null;
  }
}
