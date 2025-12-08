import cs from './cs.json';

const translations = { cs };

export function getLangFromUrl(url: URL) {
    return 'cs';
}

export function useTranslations(lang: keyof typeof translations) {
    return function t(key: string) {
        const keys = key.split('.');
        let value: any = translations['cs']; // Always fallback to CS
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value;
    }
}
