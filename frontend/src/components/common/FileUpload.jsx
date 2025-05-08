import React, { useCallback } from 'react';

const FileUpload = ({ onFileUpload, acceptedTypes }) => {
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="flex items-center justify-center w-full">
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow">
        <input 
          type="file" 
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
        />
        Choose File
      </label>
    </div>
  );
};

export default FileUpload;
