import { getRawPhoneNumber } from '@/shared/utils/phoneNormalizer.ts'

export function phoneValidator(value: string): boolean {
  return getRawPhoneNumber(value).length === 11
}
