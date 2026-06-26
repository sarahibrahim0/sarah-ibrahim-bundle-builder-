import staticData from './bundle-data.json';

export async function fetchBundleData(): Promise<any> {
  const res = await fetch('/api/bundle-data');
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

let _data: any = null;

export async function initBundleData(): Promise<void> {
  try {
    _data = await fetchBundleData();
  } catch {
    _data = staticData;
  }
}

export function getBundleData<T = any>(): T {
  if (!_data) throw new Error('Bundle data not loaded — call initBundleData() first');
  return _data as T;
}
