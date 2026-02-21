import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  fetchContent,
  saveContent,
  subscribeToContent,
  defaultContent,
} from "../lib/firebase";

interface ContentContextType {
  content: typeof defaultContent;
  isLoading: boolean;
  updateContent: (section: string, data: any) => Promise<void>;
  updateNestedContent: (
    section: string,
    index: number,
    data: any,
  ) => Promise<void>;
  addItem: (section: string, item: any) => Promise<void>;
  removeItem: (section: string, index: number) => Promise<void>;
  resetContent: () => Promise<void>;
  saveToFirebase: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load content from Firebase on mount
  useEffect(() => {
    let unsubscribe = () => {};

    const loadContent = async () => {
      setIsLoading(true);
      const data = await fetchContent(); // this handles the initial write if needed
      if (data) {
        setContent(data as typeof defaultContent);
      }
      setIsLoading(false);

      // Only subscribe AFTER the initial fetch/write is complete
      unsubscribe = subscribeToContent((newContent) => {
        setContent(newContent as typeof defaultContent);
      });
    };

    loadContent();

    return () => unsubscribe();
  }, []);

  const saveToFirebase = useCallback(async (): Promise<boolean> => {
    return await saveContent(content);
  }, [content]);

  const updateContent = async (section: string, data: any) => {
    const newContent = {
      ...content,
      [section]: { ...content[section as keyof typeof content], ...data },
    };
    setContent(newContent);
    await saveContent(newContent);
  };

  const updateNestedContent = async (
    section: string,
    index: number,
    data: any,
  ) => {
    const sectionData = content[section as keyof typeof content] as any;
    const items = [...sectionData.items];
    items[index] = { ...items[index], ...data };

    const newContent = {
      ...content,
      [section]: { ...sectionData, items },
    };
    setContent(newContent);
    await saveContent(newContent);
  };

  const addItem = async (section: string, item: any) => {
    const sectionData = content[section as keyof typeof content] as any;
    const newContent = {
      ...content,
      [section]: { ...sectionData, items: [...sectionData.items, item] },
    };
    setContent(newContent);
    await saveContent(newContent);
  };

  const removeItem = async (section: string, index: number) => {
    const sectionData = content[section as keyof typeof content] as any;
    const items = sectionData.items.filter((_: any, i: number) => i !== index);

    const newContent = {
      ...content,
      [section]: { ...sectionData, items },
    };
    setContent(newContent);
    await saveContent(newContent);
  };

  const resetContent = async () => {
    setContent(defaultContent);
    await saveContent(defaultContent);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        updateContent,
        updateNestedContent,
        addItem,
        removeItem,
        resetContent,
        saveToFirebase,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
