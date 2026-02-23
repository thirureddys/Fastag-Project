
# GateMaster: FASTag Automation Project Report

## 1. Introduction
GateMaster is an IoT-based gate automation solution designed specifically for the Indian market, leveraging the mandatory FASTag RFID system.

## 2. Problem Statement
Manual gate operation in apartments is slow, requires high manpower, and is prone to security lapses. Existing solutions often require expensive proprietary remotes.

## 3. The Solution
Use long-range UHF RFID readers to detect vehicle FASTags. Match the tag ID against an authorized database in a Python backend to trigger a gate motor automatically.

## 4. Hardware Costs (Standard Household Setup)
| Component | Approx Cost (INR) |
|-----------|-------------------|
| UHF RFID Reader | ₹6,000 |
| Raspberry Pi 4 | ₹4,500 |
| Relay Module | ₹300 |
| Power Supply (12V) | ₹1,200 |
| Actuator/Boom Barrier | ₹15,000 |
| **Total** | **₹27,000** |

## 5. Software Usage Instructions
1. **Backend**: Run `python server.py`. This starts the FastAPI server.
2. **Frontend**: Open `index.html` in a browser. The dashboard connects to the backend to display live logs.
3. **Hardware Link**: Connect the reader to the Pi via USB. The Python script listens to the serial port `/dev/ttyUSB0` (default) for tag data.

## 6. Traffic Management Logic
- **Single Gate**: Priority given to Entry. Exit is delayed if an entry vehicle is sensed.
- **Safety**: Magnetic loops detect the presence of metal underneath the boom to prevent it from lowering onto a vehicle.
