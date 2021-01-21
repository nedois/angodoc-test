import { useContext } from 'react';
import { BreadcrumbContext, BreadcrumbContextData } from 'src/contexts/BreadcrumbContext';

function useBreadcrumb(): BreadcrumbContextData {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }

  return context;
}

export default useBreadcrumb;
