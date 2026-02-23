
import React, { useState } from 'react';
import { Vehicle } from '../types';

interface Props {
  vehicles: Vehicle[];
  onAdd: (v: Omit<Vehicle, 'id'>) => void;
  onDelete: (id: string) => void;
}

const VehicleManager: React.FC<Props> = ({ vehicles, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tagId: '',
    ownerName: '',
    apartmentNo: '',
    vehicleNo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ tagId: '', ownerName: '', apartmentNo: '', vehicleNo: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Vehicle Registry</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Register Vehicle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border-b grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input label="FASTag ID" value={formData.tagId} onChange={v => setFormData({...formData, tagId: v.toUpperCase()})} placeholder="FTxxxxxxxx" required />
          <Input label="Owner Name" value={formData.ownerName} onChange={v => setFormData({...formData, ownerName: v})} placeholder="e.g. Rahul Singh" required />
          <Input label="Apartment No" value={formData.apartmentNo} onChange={v => setFormData({...formData, apartmentNo: v})} placeholder="e.g. C-404" required />
          <Input label="Vehicle No" value={formData.vehicleNo} onChange={v => setFormData({...formData, vehicleNo: v.toUpperCase()})} placeholder="KA-01-..." required />
          <div className="md:col-span-4 flex justify-end">
             <button type="submit" className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700">Save Vehicle</button>
          </div>
        </form>
      )}

      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b uppercase text-[10px] font-bold text-slate-500">
          <tr>
            <th className="px-6 py-4">Vehicle Details</th>
            <th className="px-6 py-4">Owner / Unit</th>
            <th className="px-6 py-4">FASTag ID</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {vehicles.map(vehicle => (
            <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-800">{vehicle.vehicleNo}</p>
                <p className="text-xs text-slate-400">ID: {vehicle.id}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-slate-700">{vehicle.ownerName}</p>
                <p className="text-xs text-slate-500">Unit: {vehicle.apartmentNo}</p>
              </td>
              <td className="px-6 py-4">
                <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-indigo-700 font-bold">{vehicle.tagId}</code>
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => onDelete(vehicle.id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, required }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" 
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default VehicleManager;
