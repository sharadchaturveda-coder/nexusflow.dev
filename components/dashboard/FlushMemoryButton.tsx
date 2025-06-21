import React from 'react';

interface FlushMemoryButtonProps {
  onClick: () => void;
}

const FlushMemoryButton: React.FC<FlushMemoryButtonProps> = ({ onClick }) => {
  return (
    <div className="col-span-full flex justify-center mt-4">
      <button
        onClick={onClick}
        className="bg-purple-gradient text-white font-bold py-2 px-6 rounded-md shadow-md hover:scale-105 transition-all"
      >
        Flush Memory System-Wide
      </button>
    </div>
  );
};

export default FlushMemoryButton;
