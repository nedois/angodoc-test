import React, { createContext, useState } from 'react';
import { BreadcrumbItem } from 'src/components/molecules/navigation/Breadcrumb';

export interface BreadcrumbContextData {
  items: BreadcrumbItem[];
  setItems(items: BreadcrumbItem[]): void;
}

const BreadcrumbContext = createContext<BreadcrumbContextData>({} as BreadcrumbContextData);

const BreadcrumbProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return <BreadcrumbContext.Provider value={{ items, setItems }}>{children}</BreadcrumbContext.Provider>;
};

export { BreadcrumbContext, BreadcrumbProvider };
