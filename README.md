
# GateMaster Production Checklist

This project is structured for immediate deployment. To move from your laptop to a client site:

## 1. Hardware Integration
- **UHF Reader**: Connect via USB/RS485. Ensure the `SERIAL_PORT` in `server.py` matches (e.g., `/dev/ttyUSB0` or `COM3`).
- **Relay**: Connect the gate motor's trigger wire to the Raspberry Pi GPIO 17 through a 5V/12V relay module.
- **Power**: Use a separate 12V supply for the motor and reader; do not power the motor directly from the Pi.

## 2. Software Deployment
1. **Host on Raspberry Pi**:
   ```bash
   # Install system deps
   sudo apt-get update
   sudo apt-get install python3-pip
   
   # Install python deps
   pip install -r requirements.txt RPi.GPIO pyserial
   
   # Run background service
   python3 server.py
   ```
2. **Auto-Start**: Configure `systemd` to run `server.py` on boot so the gate works even after a power cut.

## 3. Production Hardening
- **Database**: For 500+ vehicles, replace `gate_data.json` with **SQLite** (supported natively by Python) to prevent file corruption during simultaneous entries.
- **Networking**: Assign a static IP to the Raspberry Pi so the frontend tablets/guard PCs can always find the dashboard.
- **Security**: Add a simple API key to the headers of `fetch` requests in `App.tsx` and verify them in `server.py` to prevent unauthorized gate triggering via Wi-Fi.
