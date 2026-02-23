
import React, { useState } from 'react';
import { GateStatus } from '../types';

interface Props {
  gateStatus: GateStatus;
  onScan: (direction: 'IN' | 'OUT', tagId: string) => void;
  mode: 'SINGLE_GATE' | 'DUAL_GATE';
}

const GateControl: React.FC<Props> = ({ gateStatus, onScan, mode }) => {
  const [inputTag, setInputTag] = useState('');

  const handleSimulateScan = (direction: 'IN' | 'OUT') => {
    if (!inputTag.trim()) {
      alert("Please enter a Tag ID for simulation");
      return;
    }
    onScan(direction, inputTag);
    setInputTag('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Simulation Visualization */}
      <div className="bg-slate-900 rounded-2xl p-8 relative min-h-[400px] flex flex-col justify-between overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-2">
           <div className={`w-4 h-4 rounded-full ${gateStatus === GateStatus.CLOSED ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-slate-700'}`}></div>
           <div className={`w-4 h-4 rounded-full ${gateStatus === GateStatus.OPEN ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-700'}`}></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Gate Visual */}
          <div className="w-full h-2 bg-slate-700 absolute bottom-1/4"></div>
          
          {/* Arm Simulation */}
          <div 
            className={`w-full max-w-md h-4 bg-amber-500 rounded-full origin-left transition-all duration-[2000ms] ease-in-out absolute bottom-1/4 left-1/2 -translate-x-1/2
              ${gateStatus === GateStatus.OPEN ? '-rotate-90' : 'rotate-0'}`}
            style={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              border: '2px solid #b45309'
            }}
          >
            <div className="h-full w-full flex items-center justify-around px-10">
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>

          <div className="text-white text-center z-10">
            <i className={`fas ${gateStatus === GateStatus.CLOSED ? 'fa-lock' : 'fa-lock-open'} text-6xl mb-4 text-indigo-400`}></i>
            <h3 className="text-2xl font-bold tracking-widest">{gateStatus}</h3>
            <p className="text-slate-400 text-sm mt-2">
              {mode === 'SINGLE_GATE' ? 'Bi-directional Single Lane' : 'Entry/Exit Split Mode'}
            </p>
          </div>
        </div>

        {/* Lane Indicators */}
        <div className="flex justify-between w-full mt-4 border-t border-slate-800 pt-6">
           <div className="text-center">
             <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Entry Sensor</div>
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
               <i className="fas fa-satellite-dish text-indigo-500"></i>
             </div>
           </div>
           <div className="text-center">
             <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Exit Sensor</div>
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
               <i className="fas fa-satellite-dish text-indigo-500"></i>
             </div>
           </div>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="bg-white rounded-2xl p-8 border shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Manual Simulation Tool</h3>
        
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
             <label className="block text-sm font-bold text-indigo-900 mb-2">Simulate FASTag Scan</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Enter Tag ID (e.g. FT12345678)"
                 value={inputTag}
                 onChange={(e) => setInputTag(e.target.value.toUpperCase())}
                 className="flex-1 bg-white border border-indigo-200 px-4 py-3 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-400 outline-none"
               />
             </div>
             <div className="grid grid-cols-2 gap-3 mt-4">
               <button 
                 onClick={() => handleSimulateScan('IN')}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
               >
                 <i className="fas fa-sign-in-alt"></i> Entry Scan
               </button>
               <button 
                 onClick={() => handleSimulateScan('OUT')}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
               >
                 <i className="fas fa-sign-out-alt"></i> Exit Scan
               </button>
             </div>
          </div>

          <div>
             <h4 className="text-sm font-bold text-slate-700 mb-4">Quick Test Scenarios</h4>
             <div className="space-y-3">
               <TestScenarioButton 
                 label="Resident Entry (Rajesh)" 
                 onClick={() => { setInputTag('FT12345678'); handleSimulateScan('IN'); }} 
               />
               <TestScenarioButton 
                 label="Resident Exit (Priya)" 
                 onClick={() => { setInputTag('FT87654321'); handleSimulateScan('OUT'); }} 
               />
               <TestScenarioButton 
                 label="Unauthorized Vehicle" 
                 variant="danger"
                 onClick={() => { setInputTag('BAD-TAG-99'); onScan('IN', 'BAD-TAG-99'); }} 
               />
             </div>
          </div>

          <div className="pt-6 border-t">
            <p className="text-xs text-slate-500 leading-relaxed italic">
              * In a real scenario, the UHF RFID reader will push these Tag IDs automatically to the system via WebSockets or MQTT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestScenarioButton = ({ label, onClick, variant = 'primary' }: { label: string, onClick: () => void, variant?: 'primary' | 'danger' }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg border flex items-center justify-between text-sm transition-all hover:translate-x-1 
    ${variant === 'primary' ? 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-700' : 'bg-red-50 border-red-100 text-red-700 hover:border-red-300'}`}
  >
    <span className="font-medium">{label}</span>
    <i className="fas fa-chevron-right opacity-30"></i>
  </button>
);

export default GateControl;
