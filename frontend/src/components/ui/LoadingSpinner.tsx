import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;