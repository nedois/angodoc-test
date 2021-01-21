import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { AuthContextData } from 'src/contexts/AuthContext/interfaces';

export default function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
