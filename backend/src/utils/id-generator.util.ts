import { randomUUID } from 'node:crypto';

export class IdGeneratorUtil {
  /**
   * Generates a numeric unique id.
   */
  static generateNumericalId(): number {
    return IdGeneratorUtil.getHashCode(IdGeneratorUtil.generateUniqueId());
  }

  static generateUniqueId(): string {
    return randomUUID();
  }

  /**
   * Returns a hash code for a string.
   *
   * @param str String to generate hash code for
   */
  private static getHashCode(str: string): number {
    if (str.length === 0) return 0;

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);

      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return parseInt(String(hash).replace(/-/g, ''));
  }
}
