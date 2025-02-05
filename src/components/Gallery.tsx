import React, { useRef } from 'react';
import { useStore } from '../store/useStore';
import { Grid, Trash2, FileText, Image, Upload } from 'lucide-react';

function Gallery() {
  const { photos, addPhotos } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'trash', icon: Trash2, label: 'Low Quality' },
    { id: 'blurred', icon: Image, label: 'Blurred' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    addPhotos(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Photo Gallery</h1>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Photos
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {categories.map(({ id, icon: Icon, label }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{label}</h3>
              <p className="text-sm text-gray-600">
                {photos.filter(photo => photo.category === id).length} photos
              </p>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No photos yet</h3>
          <p className="text-gray-600 mb-4">Upload some photos to get started</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Upload Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="aspect-square relative group">
              <img
                src={photo.thumbnail}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;