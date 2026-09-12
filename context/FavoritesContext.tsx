import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type FavoritesContextValue = {
  ids: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      ids,
      isSaved: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((current) =>
          current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
        ),
    }),
    [ids]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
