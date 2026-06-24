interface SVGPreviewProps {
  svg: string;
}

export default function SVGPreview({ svg }: SVGPreviewProps) {
  if (!svg) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center text-gray-400">
          <svg
            className="mx-auto h-16 w-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">No Preview</p>
          <p className="text-sm mt-1">Describe a diagram to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-medium text-gray-700">Preview</h2>
      </div>
      <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </div>
  );
}
