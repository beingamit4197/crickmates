import { MapPin } from 'lucide-react';

export default function MapPreview() {
  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
      {/* Map Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Roads */}
      <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-300"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300"></div>
      
      {/* Location Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <div className="relative">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <MapPin size={20} className="text-white" />
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
            Match Venue
          </div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-green-500 rounded-full opacity-60"></div>
    </div>
  );
}
