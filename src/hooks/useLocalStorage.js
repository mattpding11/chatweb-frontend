import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initial) {

  // Estado local inicial
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  //Cuando state cambia, actualiza localStorage y lanza evento propio
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent('local-storage', { detail: { key, value } })
    );
  }, [key, value]);

  //Escucha cambios de
  //otras pestañas => storage
  //esta pestaña   => local-storage
  useEffect(() => {

    const handler = (e) => {
      const sameKey =
        e.key === key || (e.detail && e.detail.key === key);
      if (!sameKey) return;

      const newVal =
        e.detail?.value ?? JSON.parse(e.newValue ?? 'null');

      setValue(newVal);
    };

    window.addEventListener('storage', handler);
    window.addEventListener('local-storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('local-storage', handler);
    };
  }, [key]);

  return [value, setValue];

}
