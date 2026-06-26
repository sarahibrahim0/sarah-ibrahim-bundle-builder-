import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let _data = null;

export function loadBundleData() {
  if (_data) return _data;
  const raw = readFileSync(
    join(__dirname, '..', '..', 'src', 'data', 'bundle-data.json'),
    'utf-8'
  );
  _data = JSON.parse(raw);
  return _data;
}

export function getProducts() {
  return loadBundleData().products ?? [];
}

export function getSteps() {
  return loadBundleData().steps ?? [];
}

export function getContent() {
  return loadBundleData().content ?? {};
}
