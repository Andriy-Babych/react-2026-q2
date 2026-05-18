import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue;
    });

    const updateValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };

    return [value, updateValue] as const;
}