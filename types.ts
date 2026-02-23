
export enum GateStatus {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING'
}

export enum TrafficLight {
  RED = 'RED',
  GREEN = 'GREEN'
}

export interface Vehicle {
  id: string;
  tagId: string;
  ownerName: string;
  apartmentNo: string;
  vehicleNo: string;
  lastEntry?: string;
}

export interface AccessLog {
  id: string;
  tagId: string;
  vehicleNo: string;
  timestamp: string;
  direction: 'IN' | 'OUT';
  status: 'AUTHORIZED' | 'DENIED';
}

export interface GateSystemConfig {
  mode: 'SINGLE_GATE' | 'DUAL_GATE';
  autoCloseDelay: number; // in seconds
}
