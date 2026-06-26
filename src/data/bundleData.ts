import staticData from './bundle-data.json';

let _data: any = staticData;

export async function initBundleData(): Promise<void> {
  try {
    const res = await fetch('/api/bundle-data');
    if (res.ok) {
      _data = await res.json();
      return;
    }
  } catch {}
}

export function getBundleData<T = any>(): T {
  return _data as T;
}
