
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import uvicorn
import json
import os
import threading
import time

# --- PRODUCTION HARDWARE LIBRARIES ---
# On Raspberry Pi, these must be installed: pip install RPi.GPIO pyserial
try:
    import RPi.GPIO as GPIO
    import serial
    HAS_HARDWARE = True
except ImportError:
    HAS_HARDWARE = False
    print("Warning: Hardware libraries not found. Running in Simulation Mode.")

app = FastAPI(title="GateMaster Production API")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION ---
DB_FILE = "gate_data.json"
RELAY_PIN = 17      # Physical Pin for Gate Relay
SERIAL_PORT = "/dev/ttyUSB0" # Default for UHF Readers
BAUD_RATE = 115200

# --- DATABASE LOGIC ---
def load_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {"vehicles": [], "logs": []}

def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

# --- HARDWARE CONTROL ---
if HAS_HARDWARE:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.LOW)

def trigger_physical_gate():
    if not HAS_HARDWARE:
        print("[Sim] Triggering Relay...")
        return
    try:
        GPIO.output(RELAY_PIN, GPIO.HIGH)
        time.sleep(1) # Pulse for 1 second to trigger gate controller
        GPIO.output(RELAY_PIN, GPIO.LOW)
    except Exception as e:
        print(f"GPIO Error: {e}")

# --- BACKGROUND SERIAL LISTENER ---
def rfid_reader_loop():
    """Background thread to listen for FASTag scans from the hardware reader."""
    if not HAS_HARDWARE: return
    
    while True:
        try:
            with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
                print(f"Connected to RFID Reader on {SERIAL_PORT}")
                while True:
                    line = ser.readline().decode('utf-16').strip() # Most UHF readers use UTF-16 or Hex
                    if line:
                        # Extract Tag ID (Logic depends on your specific reader model)
                        tag_id = line.replace("TAG:", "").strip()
                        process_tag(tag_id, "IN")
        except Exception as e:
            print(f"Serial Error: {e}. Retrying in 5s...")
            time.sleep(5)

def process_tag(tag_id: str, direction: str):
    data = load_db()
    vehicle = next((v for v in data["vehicles"] if v["tagId"] == tag_id), None)
    
    status = "AUTHORIZED" if vehicle else "DENIED"
    new_log = {
        "id": str(int(time.time())),
        "tagId": tag_id,
        "vehicleNo": vehicle["vehicleNo"] if vehicle else "UNKNOWN",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "direction": direction,
        "status": status
    }
    
    data["logs"].insert(0, new_log)
    save_db(data)
    
    if status == "AUTHORIZED":
        trigger_physical_gate()
    return new_log

# --- API ENDPOINTS ---
@app.get("/status")
async def get_status():
    return {"status": "online", "hardware": HAS_HARDWARE}

@app.get("/logs")
async def get_logs():
    return load_db()["logs"]

@app.post("/scan")
async def api_scan(tag_id: str, direction: str = "IN"):
    """Manual scan endpoint for testing via UI."""
    return process_tag(tag_id, direction)

# Start background thread for RFID
if HAS_HARDWARE:
    threading.Thread(target=rfid_reader_loop, daemon=True).start()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
