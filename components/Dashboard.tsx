
import React from 'react';
import { Vehicle, AccessLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Props {
  logs: AccessLog[];
  vehicles: Vehicle[];
}

const Dashboard: React.FC<Props> = ({ logs, vehicles }) => {
  const authorizedLogs = logs.filter(l => l.status === 'AUTHORIZED');
  const entriesCount = authorizedLogs.filter(l => l.direction === 'IN').length;
  const exitsCount = authorizedLogs.filter(l => l.direction === 'OUT').length;
  
  // Fake chart data
  const data = [
    { name: '06:00', count: 12 },
    { name: '09:00', count: 45 },
    { name: '12:00', count: 30 },
    { name: '15:00', count: 25 },
    { name: '18:00', count: 58 },
    { name: '21:00', count: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Registered Vehicles" value={vehicles.length.toString()} icon="fa-car" color="bg-blue-500" />
        <StatCard title="Total Entries (Today)" value={entriesCount.toString()} icon="fa-sign-in-alt" color="bg-green-500" />
        <StatCard title="Total Exits (Today)" value={exitsCount.toString()} icon="fa-sign-out-alt" color="bg-orange-500" />
        <StatCard title="Security Alerts" value={logs.filter(l => l.status === 'DENIED').length.toString()} icon="fa-exclamation-triangle" color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-bold mb-6">Traffic Intensity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-bold mb-6">System Health</h3>
          <div className="space-y-4">
            <HealthItem label="RFID Reader (Entry)" status="ONLINE" />
            <HealthItem label="RFID Reader (Exit)" status="ONLINE" />
            <HealthItem label="Gate Servo Motor" status="ONLINE" />
            <HealthItem label="Loop Sensor" status="OFFLINE" warning="Loop sensor check required" />
            <HealthItem label="Connectivity" status="ONLINE" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="divide-y">
          {logs.slice(0, 5).map(log => (
            <div key={log.id} className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.status === 'AUTHORIZED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  <i className={`fas ${log.direction === 'IN' ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
                </div>
                <div>
                  <p className="font-semibold text-sm">{log.vehicleNo}</p>
                  <p className="text-xs text-slate-500">{log.tagId} • {log.timestamp}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${log.status === 'AUTHORIZED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {log.status}
              </span>
            </div>
          ))}
          {logs.length === 0 && <p className="text-center text-slate-500 py-10">No recent logs found</p>}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-5">
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const HealthItem = ({ label, status, warning }: { label: string, status: 'ONLINE' | 'OFFLINE', warning?: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
    <div>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      {warning && <p className="text-[10px] text-amber-600 italic">{warning}</p>}
    </div>
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${status === 'ONLINE' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
      {status}
    </span>
  </div>
);

export default Dashboard;
