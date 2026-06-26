export async function fetchBundleData(): Promise<any> {
  const res = await fetch('/api/bundle-data');
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

let _data: any = null;

export async function initBundleData(): Promise<void> {
  _data = await fetchBundleData();
}

export function getBundleData<T = any>(): T {
  if (!_data) throw new Error('Bundle data not loaded — call initBundleData() first');
  return _data as T;
}
