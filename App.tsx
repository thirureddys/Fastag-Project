
import React, { useState, useEffect, useCallback } from 'react';
import { GateStatus, Vehicle, AccessLog, GateSystemConfig } from './types';
import Dashboard from './components/Dashboard';
import GateControl from './components/GateControl';
import VehicleManager from './components/VehicleManager';
import LogTable from './components/LogTable';
import HardwareDocs from './components/HardwareDocs';
import ProjectReport from './components/ProjectReport';

const API_BASE = "http://localhost:8000";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'control' | 'vehicles' | 'logs' | 'docs' | 'report'>('dashboard');
  const [gateStatus, setGateStatus] = useState<GateStatus>(GateStatus.CLOSED);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', tagId: 'FT12345678', ownerName: 'Rajesh Kumar', apartmentNo: 'A-101', vehicleNo: 'KA-01-MH-1234' },
    { id: '2', tagId: 'FT87654321', ownerName: 'Priya Sharma', apartmentNo: 'B-205', vehicleNo: 'KA-05-NB-5678' },
  ]);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [config, setConfig] = useState<GateSystemConfig>({
    mode: 'SINGLE_GATE',
    autoCloseDelay: 5
  });

  // Fetch real logs from Python Backend
  const refreshLogs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/logs`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (e) {
      console.warn("Backend not reachable, using local simulation.");
    }
  }, []);

  useEffect(() => {
    refreshLogs();
    const interval = setInterval(refreshLogs, 3000); // Polling for hardware updates
    return () => clearInterval(interval);
  }, [refreshLogs]);

  const triggerGate = useCallback(async (direction: 'IN' | 'OUT', tagId: string) => {
    // 1. Tell the Python backend to process the scan
    try {
      const res = await fetch(`${API_BASE}/scan?tag_id=${tagId}&direction=${direction}`, { method: 'POST' });
      const result = await res.json();
      
      // 2. If Backend authorized, animate the UI Gate
      if (result.status === 'AUTHORIZED' || gateStatus === GateStatus.CLOSED) {
        setGateStatus(GateStatus.OPENING);
        setTimeout(() => {
          setGateStatus(GateStatus.OPEN);
          setTimeout(() => {
            setGateStatus(GateStatus.CLOSING);
            setTimeout(() => {
              setGateStatus(GateStatus.CLOSED);
            }, 2000);
          }, config.autoCloseDelay * 1000);
        }, 2000);
      }
      refreshLogs();
    } catch (e) {
      // Fallback for demo when server isn't running
      console.error("Backend Error", e);
    }
  }, [gateStatus, config.autoCloseDelay, refreshLogs]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-gate"></i> GateMaster
          </h1>
          <p className="text-indigo-300 text-xs mt-1">FASTag Automation Pro</p>
        </div>
        
        <nav className="flex-1 mt-6">
          <SidebarItem icon="fas fa-chart-line" label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon="fas fa-door-open" label="Live Control" active={activeTab === 'control'} onClick={() => setActiveTab('control')} />
          <SidebarItem icon="fas fa-car" label="Authorized Vehicles" active={activeTab === 'vehicles'} onClick={() => setActiveTab('vehicles')} />
          <SidebarItem icon="fas fa-history" label="Access Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <SidebarItem icon="fas fa-microchip" label="Hardware Guide" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} />
          <SidebarItem icon="fas fa-file-invoice" label="Project Report" active={activeTab === 'report'} onClick={() => setActiveTab('report')} />
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${gateStatus === GateStatus.CLOSED ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm font-medium">Gate: {gateStatus}</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center print:hidden">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 capitalize">
              {activeTab === 'report' ? 'Project Report' : activeTab}
            </h2>
            <p className="text-slate-500 font-medium">Management Console</p>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard logs={logs} vehicles={vehicles} />}
        {activeTab === 'control' && <GateControl gateStatus={gateStatus} onScan={triggerGate} mode={config.mode} />}
        {activeTab === 'vehicles' && (
          <VehicleManager 
            vehicles={vehicles} 
            onAdd={(v) => setVehicles([...vehicles, { ...v, id: Date.now().toString() }])}
            onDelete={(id) => setVehicles(vehicles.filter(v => v.id !== id))}
          />
        )}
        {activeTab === 'logs' && <LogTable logs={logs} />}
        {activeTab === 'docs' && <HardwareDocs />}
        {activeTab === 'report' && <ProjectReport />}
      </main>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: string, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${active ? 'bg-indigo-800 border-l-4 border-indigo-400' : 'hover:bg-indigo-800/50'}`}>
    <i className={`${icon} w-5 text-indigo-300`}></i>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default App;
