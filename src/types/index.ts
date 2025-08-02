export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
  twoFactorEnabled: boolean;
}

export interface Target {
  id: string;
  name: string;
  type: 'domain' | 'ip' | 'cidr' | 'url';
  value: string;
  category: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'scanned' | 'excluded';
  lastScan?: Date;
  tags: string[];
}

export interface Vulnerability {
  id: string;
  cveId?: string;
  title: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  description: string;
  target: string;
  discoveredAt: Date;
  status: 'open' | 'fixed' | 'accepted' | 'false-positive';
  cvss?: number;
}

export interface ScanResult {
  id: string;
  targetId: string;
  type: 'recon' | 'enumeration' | 'cve' | 'custom' | 'chain';
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  vulnerabilities: number;
  findings: any[];
}

export interface Module {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  version: string;
}

export interface ChainStep {
  id: string;
  type: 'recon' | 'enumeration' | 'cve' | 'custom';
  config: any;
  position: { x: number; y: number };
}

export interface Chain {
  id: string;
  name: string;
  description: string;
  steps: ChainStep[];
  connections: Array<{ from: string; to: string }>;
}