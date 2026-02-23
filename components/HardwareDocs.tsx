
import React from 'react';

const HardwareDocs: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <section>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Pro Tip:</strong> Most gate automation failures happen due to poor power supply or lightning. Investing in a UPS and Surge Protection is 100% mandatory for production sites.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-microchip text-indigo-600"></i> Full Production Hardware List
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <HardwareCard 
              name="UHF RFID Reader" 
              desc="8-12m Range. Use 12dbi gain for wide entrances."
              cost="₹7,500"
              img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200&h=150"
           />
           <HardwareCard 
              name="Raspberry Pi 4" 
              desc="The brain. Handles database and relay triggers."
              cost="₹5,200"
              img="https://images.unsplash.com/photo-1631553127989-49341893c5d6?auto=format&fit=crop&q=80&w=200&h=150"
           />
           <HardwareCard 
              name="Boom Barrier" 
              desc="24V DC motor with manual override key."
              cost="₹16,500"
              img="https://images.unsplash.com/photo-1590496793907-44023220465a?auto=format&fit=crop&q=80&w=200&h=150"
           />
           <HardwareCard 
              name="Safety Photocells" 
              desc="Infrared beam to prevent hitting pedestrians."
              cost="₹1,800"
              img="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=200&h=150"
           />
           <HardwareCard 
              name="Online UPS" 
              desc="1KVA battery backup for constant operation."
              cost="₹4,500"
              img="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=200&h=150"
           />
           <HardwareCard 
              name="Surge Protector" 
              desc="Industrial SPD to protect against lightning."
              cost="₹1,200"
              img="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=200&h=150"
           />
        </div>
      </section>

      <section className="bg-slate-50 border p-8 rounded-2xl">
        <h4 className="text-xl font-bold mb-4 text-slate-800">Infrastructure & Civil Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="text-sm text-slate-600 leading-relaxed">
            <h5 className="font-bold text-slate-800 mb-2">Wiring & Conduits</h5>
            <p>Use 1.5mm sq. Finolex cables for power and Cat6 for networking. All cables must run through 1-inch PVC conduits buried at least 1 foot deep under the asphalt/paver blocks to avoid damage from heavy vehicle weight.</p>
          </div>
          <div className="text-sm text-slate-600 leading-relaxed">
            <h5 className="font-bold text-slate-800 mb-2">Concrete Pad</h5>
            <p>The Boom Barrier requires a solid PCC (Plain Cement Concrete) foundation block of at least 1.5ft x 1.5ft x 2ft. Use M20 grade concrete for maximum stability against wind and arm vibrations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const HardwareCard = ({ name, desc, cost, img }: { name: string, desc: string, cost: string, img: string }) => (
  <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex">
    <div className="w-1/3 overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover opacity-80" />
    </div>
    <div className="w-2/3 p-4">
      <h4 className="font-bold text-slate-800 text-sm mb-1">{name}</h4>
      <p className="text-[11px] text-slate-500 mb-2 leading-tight">{desc}</p>
      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{cost}</span>
    </div>
  </div>
);

export default HardwareDocs;
