// components/LayoutContext.tsx
import React, { createContext, useContext, ReactNode, useRef } from "react";

interface LayoutContextType {
  // Define the variables or data you want to pass
  neoline: any;
  neolineN3: any;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [neoline, setNeoline] = React.useState<any>();
  const [neolineN3, setNeolineN3] = React.useState<any>();

  React.useEffect(() => {
    console.log("TRYIG");
    window.addEventListener("NEOLine.NEO.EVENT.READY", () => {
      console.log("NEOLine.NEO.EVENT.READY");

      setNeoline(new window.NEOLineN3.Init());
    });
    window.addEventListener("NEOLine.N3.EVENT.READY", () => {
      setNeolineN3(new window.NEOLineN3.Init());
    });
  }, []);
  return (
    <LayoutContext.Provider value={{ neoline, neolineN3 }}>
      {children}
    </LayoutContext.Provider>
  );
};
