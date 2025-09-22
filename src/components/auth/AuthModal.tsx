import { useState } from 'react';
import { X } from 'lucide-react';
import Login from './Login';
import Register from './Register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  if (!isOpen) return null;

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        
        {mode === 'login' ? (
          <Login onToggleMode={toggleMode} onClose={onClose} />
        ) : (
          <Register onToggleMode={toggleMode} onClose={onClose} />
        )}
      </div>
    </div>
  );
}