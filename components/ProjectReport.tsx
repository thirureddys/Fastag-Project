
import React from 'react';

const ProjectReport: React.FC = () => {
  return (
    <div className="report-container max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border mb-10">
      {/* Header Banner */}
      <div className="bg-indigo-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <i className="fas fa-gate text-indigo-400 text-3xl"></i>
             <span className="font-black tracking-widest text-xl">GATEMASTER AI</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">Project Proposal &<br/>Investment Estimate</h1>
          <p className="text-indigo-200 text-lg max-w-xl">
            Professional Grade Gate Automation: A Comprehensive Deployment Strategy.
          </p>
        </div>
      </div>

      <div className="p-12 space-y-12 text-slate-800">
        {/* Cover Info */}
        <div className="flex justify-between border-b pb-8">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Prepared For</h3>
            <p className="font-bold text-lg">Residential Welfare Associations (RWA)</p>
            <p className="text-slate-500 text-sm">Property Management Agencies</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Reference ID</h3>
            <p className="font-bold text-lg text-indigo-600">GM-2024-PR-PRO-V2</p>
            <p className="text-slate-500 text-sm">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Investment Table */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">01</span>
              Comprehensive Cost Estimation
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full italic">Excludes Manual Labor</span>
          </div>
          
          <div className="border rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 font-bold text-sm text-slate-500">Core Hardware Components</th>
                  <th className="p-4 font-bold text-sm text-slate-500 text-right">Estimate (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4">
                    <p className="font-bold">UHF Long-Range Reader & Controller</p>
                    <p className="text-xs text-slate-500 italic">12dbi Integrated Reader + Raspberry Pi 4 Edge Unit</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹12,700.00</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Heavy Duty Boom Barrier Kit</p>
                    <p className="text-xs text-slate-500 italic">24V Brushless Motor, 3m Arm, 2x Wireless Remotes</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹16,500.00</td>
                </tr>
                
                {/* Infrastructure & Safety Section */}
                <tr className="bg-slate-50/50">
                  <th colSpan={2} className="p-3 px-4 text-[10px] font-black uppercase text-indigo-600 tracking-widest">Safety & Infrastructure (Essential for Production)</th>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">IR Safety Photocells (Pair)</p>
                    <p className="text-xs text-slate-500 italic">Anti-collision beam for pedestrians/pets detection</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹1,800.00</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">1KVA Online UPS + Battery Backup</p>
                    <p className="text-xs text-slate-500 italic">Ensures 2-hour operation during power outages/surges</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹4,500.00</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Mounting Hardware & Networking</p>
                    <p className="text-xs text-slate-500 italic">Steel Reader Pole, Outdoor Router, Weatherproof Junction Box</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹3,200.00</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Industrial Surge Protection Device (SPD)</p>
                    <p className="text-xs text-slate-500 italic">Protects logic boards from lightning/voltage spikes</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹1,200.00</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Civil Materials (Foundation)</p>
                    <p className="text-xs text-slate-500 italic">Concrete, Grouting, PVC Conduits for underground cabling</p>
                  </td>
                  <td className="p-4 text-right font-medium">₹2,500.00</td>
                </tr>

                <tr className="bg-indigo-900 text-white">
                  <td className="p-5 font-black text-lg uppercase tracking-wider">Total Investment (Hardware Only)</td>
                  <td className="p-5 text-right font-black text-2xl">₹42,400.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 p-8 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">Why these extras are mandatory:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex gap-3">
              <i className="fas fa-check-circle text-green-500 mt-1"></i>
              <p><strong>Safety Photocells:</strong> Prevents legal liability. The boom barrier will never hit a child walking under it, even if the car has already passed the loop sensor.</p>
            </div>
            <div className="flex gap-3">
              <i className="fas fa-check-circle text-green-500 mt-1"></i>
              <p><strong>UPS Backup:</strong> Gates are critical infrastructure. A 5-minute power cut shouldn't trap residents inside or leave the gate manually unlocked.</p>
            </div>
            <div className="flex gap-3">
              <i className="fas fa-check-circle text-green-500 mt-1"></i>
              <p><strong>Surge Protection:</strong> Outdoor RFID readers are "lightning magnets." Without an SPD, a single thunderstorm can fry ₹12,000 worth of electronics.</p>
            </div>
            <div className="flex gap-3">
              <i className="fas fa-check-circle text-green-500 mt-1"></i>
              <p><strong>Networking:</strong> Allows the RWA manager to update the "Authorized List" from their office laptop without walking to the gate with a USB drive.</p>
            </div>
          </div>
        </section>

        {/* Closing Terms */}
        <section className="text-xs text-slate-500 italic space-y-2">
          <p>• Prices are indicative market rates and subject to change based on specific brand selections.</p>
          <p>• Estimated civil work time: 2 days (for concrete curing).</p>
          <p>• Software license: Lifetime local usage with optional cloud sync at ₹500/month.</p>
        </section>
      </div>

      {/* Interactive Footer (Hidden on Print) */}
      <div className="p-8 border-t flex flex-col md:flex-row justify-between items-center bg-slate-50 print:hidden gap-4">
        <div>
          <p className="text-sm font-bold text-slate-800">Print Professional Quote</p>
          <p className="text-xs text-slate-500">Includes full production hardware breakdown.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-95"
        >
          <i className="fas fa-file-pdf text-xl"></i> 
          DOWNLOAD PDF PROPOSAL
        </button>
      </div>
    </div>
  );
};

export default ProjectReport;
