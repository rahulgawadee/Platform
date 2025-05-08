import React from 'react';
import { FiUpload } from 'react-icons/fi';

const ProfileForm = ({ teacherProfile, setTeacherProfile, handleSignatureUpload, updateProfile }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Full Name</label>
            <input 
              type="text" 
              value={teacherProfile.name}
              onChange={(e) => setTeacherProfile({...teacherProfile, name: e.target.value})}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Email</label>
            <input 
              type="email" 
              value={teacherProfile.email}
              onChange={(e) => setTeacherProfile({...teacherProfile, email: e.target.value})}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Department</label>
            <input 
              type="text" 
              value={teacherProfile.department}
              onChange={(e) => setTeacherProfile({...teacherProfile, department: e.target.value})}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Signature</label>
            <div className="flex items-center gap-4">
              {teacherProfile.signaturePreview ? (
                <img 
                  src={teacherProfile.signaturePreview} 
                  alt="Signature" 
                  className="w-24 h-12 object-contain border rounded" 
                />
              ) : (
                <div className="w-24 h-12 border flex items-center justify-center rounded text-sm text-gray-400">
                  No signature
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer text-blue-600">
                <FiUpload />
                <span className="text-sm">Upload</span>
                <input 
                  type="file" 
                  onChange={handleSignatureUpload} 
                  accept="image/*" 
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="font-medium text-sm mb-1">Bio</label>
          <textarea 
            value={teacherProfile.bio}
            onChange={(e) => setTeacherProfile({...teacherProfile, bio: e.target.value})}
            className="border rounded px-3 py-2 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={updateProfile}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
