import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { ScanPage } from "../types/scan";

interface ScanContextType {
  pages: ScanPage[];

  addPage: (page: ScanPage) => void;

  updatePage: (
    id: string,
    updates: Partial<ScanPage>
  ) => void;

  deletePage: (id: string) => void;

  clearPages: () => void;
}

const ScanContext = createContext<ScanContextType | null>(
  null
);

export function ScanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pages, setPages] = useState<ScanPage[]>([]);

  function addPage(page: ScanPage) {
    setPages((prev) => [...prev, page]);
  }

  function updatePage(
    id: string,
    updates: Partial<ScanPage>
  ) {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id
          ? {
              ...page,
              ...updates,
            }
          : page
      )
    );
  }

  function deletePage(id: string) {
    setPages((prev) =>
      prev.filter((page) => page.id !== id)
    );
  }

  function clearPages() {
    setPages([]);
  }

  return (
    <ScanContext.Provider
      value={{
        pages,
        addPage,
        updatePage,
        deletePage,
        clearPages,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const context = useContext(ScanContext);

  if (!context) {
    throw new Error(
      "useScan must be used inside ScanProvider"
    );
  }

  return context;
}