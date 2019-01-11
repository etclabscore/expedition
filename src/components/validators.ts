export function required(value: string | number | undefined | null) {
  return value ? undefined : 'Required';
}

export function address(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value) ? undefined : 'Not an address';
}

export function number(value: string) {
  return /^[+-]?\d+(\.\d+)?$/.test(value) ? undefined : 'Not a number';
}

export function isJson(value: string) {
  const errMsg = 'Invalid JSON';
  try {
    return JSON.parse(value) ? undefined : errMsg;
  } catch (e) {
    return errMsg;
  }
}

export function positive(value: string) {
  return value[0] !== '-' ? undefined : 'Should be positive number';
}

export function hex(value: string) {
  if ((value === '') || (value === undefined)) {
    return undefined;
  }
  const val = value.substring(0, 2) === '0x' ? value.substring(2) : value;
  return /^[0-9A-Fa-f]+$/.test(val) ? undefined : 'Invalid hex';
}

export function privateKey(value: string) {
  if ((value === '') || (value === undefined)) {
    return undefined;
  }
  const val = value.substring(0, 2) === '0x' ? value.substring(2) : value;
  return /^[0-9A-Fa-f]+$/.test(val) ? undefined : 'Invalid private key';
}