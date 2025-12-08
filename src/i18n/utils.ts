import cs from './cs.json';
import en from './en.json';

export const languages = {
    cs: 'cs',
    en: 'en',
};

export const defaultLang = 'cs';

export const ui = {
    cs,
    en,
};

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: string) {
        const keys = key.split('.');
        let value: any = ui[lang];
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
