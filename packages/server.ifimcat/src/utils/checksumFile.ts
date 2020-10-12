import { ReadStream } from 'fs-capacitor';
import { createHash } from 'crypto';

export function checksumFile(
  hashName: string,
  createReadStream: () => ReadStream,
) {
  return new Promise((resolve, reject) => {
    const hash = createHash(hashName);
    const stream = createReadStream();
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}