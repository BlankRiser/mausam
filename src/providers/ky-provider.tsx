import ky from "ky";
import React from "react";

export const KyProvider: React.FC<KyProviderProps> = ({ children }) => {
  return (
    <KyContext.Provider value={ky.create({})}>{children}</KyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKy = () => React.useContext(KyContext);

export type KyProviderProps = React.PropsWithChildren;

const KyContext = React.createContext<KyContextValue>(ky.create({}));

export type KyContextValue = typeof ky;
