
import React from 'react';
import { AccessLog } from '../types';

interface Props {
  logs: AccessLog[];
}

const LogTable: React.FC<Props> = ({ logs }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800">Full Access History</h3>
        <button className="text-indigo-600 text-sm font-bold flex items-center gap-2 hover:underline">
          <i className="fas fa-download"></i> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 uppercase text-[10px] font-black tracking-wider text-slate-400 border-b">
            <tr>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Tag ID</th>
              <th className="px-6 py-4">Direction</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map(log => (
              <tr key={log.id} className="text-sm">
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.timestamp}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{log.vehicleNo}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">{log.tagId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 font-bold ${log.direction === 'IN' ? 'text-indigo-600' : 'text-orange-600'}`}>
                    <i className={`fas ${log.direction === 'IN' ? 'fa-arrow-circle-right' : 'fa-arrow-circle-left'}`}></i>
                    {log.direction}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    log.status === 'AUTHORIZED' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'AUTHORIZED' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <i className="fas fa-folder-open text-4xl mb-4 block opacity-20"></i>
                  No logs recorded yet. Start simulation in the control panel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogTable;
