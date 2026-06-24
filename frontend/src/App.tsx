import { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import SVGPreview from './components/SVGPreview';

function App() {
  const [svg, setSVG] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Chat */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ChatPanel
          setSVG={setSVG}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1 p-6">
        <SVGPreview svg={svg} />
      </div>
    </div>
  );
}

export default App;
