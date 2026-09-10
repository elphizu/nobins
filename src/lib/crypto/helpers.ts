import _sodium from 'libsodium-wrappers';

import type { PasteEnvelopeSecret } from '@/lib/crypto/types';

export function encodeBytes(bytes: Uint8Array) {
  return _sodium.to_base64(bytes, _sodium.base64_variants.URLSAFE_NO_PADDING);
}

export function decodeBytes(value: string) {
  return _sodium.from_base64(value, _sodium.base64_variants.URLSAFE_NO_PADDING);
}

export function encodeJson(value: PasteEnvelopeSecret) {
  return encodeBytes(_sodium.from_string(JSON.stringify(value)));
}

export function decodeJson(value: string): unknown {
  return JSON.parse(_sodium.to_string(decodeBytes(value)));
}

export function toArrayBuffer(bytes: Uint8Array) {
  return new Uint8Array(bytes).buffer;
}

export function concatBytes(chunks: Uint8Array[]) {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);

  const result = new Uint8Array(length);

  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result;
}
