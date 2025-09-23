"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import QR scanner
const QrScanner = dynamic<typeof import("react-qr-scanner").default>(
  () => import("react-qr-scanner"),
  { ssr: false }
);

interface VerifyResponse {
  valid: boolean;
  attendeeEmail?: string;
  attendeeName?: string;
  eventName?: string;
}

interface ScanResult {
  text?: string;
}

type Status = "idle" | "scanning" | "verifying" | "success" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function VerifyQRPage() {
  const [qrData, setQrData] = useState<string>("");
  const [manualCode, setManualCode] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Scan a QR code to verify ticket");
  const [messageStatus, setMessageStatus] = useState<string>("");
  const [attendeeInfo, setAttendeeInfo] = useState<{
    email?: string;
    name?: string;
    event?: string;
  }>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [scanHistory, setScanHistory] = useState<Array<{
    code: string;
    valid: boolean;
    timestamp: Date;
    attendeeName?: string;
  }>>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScan = async (result: ScanResult | string | null) => {
    if (!result || isProcessing) return;
    
    setIsProcessing(true);
    setStatus("verifying");
    setStatusMessage("Verifying ticket...");
    setMessageStatus("");

    try {
      const data = typeof result === "string" ? result : result.text;
      if (!data) return;

      setQrData(data);
      
      const res = await axios.post<VerifyResponse>(
        `${API_URL}/api/v1/verify`,
        { ticketCode: data },
        { 
          withCredentials: true, 
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Add to scan history
      const scanRecord = {
        code: data.substring(0, 8) + '...',
        valid: res.data.valid,
        timestamp: new Date(),
        attendeeName: res.data.attendeeName
      };
      
      setScanHistory(prev => [scanRecord, ...prev.slice(0, 4)]); // Keep last 5 scans

      if (res.data.valid) {
        setStatus("success");
        setStatusMessage("Ticket Valid ✅");
        setAttendeeInfo({
          email: res.data.attendeeEmail,
          name: res.data.attendeeName,
          event: res.data.eventName
        });
        
        if (res.data.attendeeEmail) {
          await sendImmediateMessage(res.data.attendeeEmail);
        }
      } else {
        setStatus("error");
        setStatusMessage("Ticket Invalid ❌");
        setAttendeeInfo({});
      }
    } catch (err: unknown) {
      setStatus("error");
      setAttendeeInfo({});
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setStatusMessage("Request timeout - please try again");
        } else if (err.response?.status === 404) {
          setStatusMessage("Ticket not found in system");
        } else if (err.response?.status === 400) {
          setStatusMessage("Invalid ticket format");
        } else {
          setStatusMessage(err.response?.data?.message || "Server error");
        }
      } else {
        setStatusMessage("Error verifying ticket");
      }
    } finally {
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  const sendImmediateMessage = async (email: string) => {
    try {
      setMessageStatus("Sending welcome message...");
      await axios.post(`${API_URL}/api/send-message`, {
        email,
        type: "welcome",
      });
      setMessageStatus("Welcome message sent ✅");
    } catch (err) {
      console.error(err);
      setMessageStatus("Failed to send message ❌");
    }
  };

  const handleManualVerify = async () => {
    if (!manualCode.trim() || isProcessing) return;
    await handleScan(manualCode.trim());
  };

  const handleError = (err: unknown) => {
    console.error(err);
    if (err instanceof Error) {
      if (err.name === "NotAllowedError") {
        setStatusMessage("Camera permission denied - please allow camera access");
      } else if (err.name === "NotFoundError") {
        setStatusMessage("No camera found on this device");
      } else {
        setStatusMessage("Camera error - try refreshing the page");
      }
    }
  };

  const resetScanner = () => {
    setQrData("");
    setStatus("idle");
    setStatusMessage("Scan a QR code to verify ticket");
    setMessageStatus("");
    setAttendeeInfo({});
    setIsProcessing(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case "success": return "bg-green-50 border-green-200 text-green-800";
      case "error": return "bg-red-50 border-red-200 text-red-800";
      case "verifying": return "bg-blue-50 border-blue-200 text-blue-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            QR Ticket Verifier
          </h1>
          <p className="text-lg text-gray-600">
            Scan event tickets to verify authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">QR Scanner</h2>
              <button
                onClick={resetScanner}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Scanner Container */}
            <div className="relative mb-6">
              <div className="aspect-square bg-black rounded-xl overflow-hidden relative">
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  constraints={{ 
                    facingMode: "environment",
                    aspectRatio: 1 
                  }}
                  style={{ 
                    width: "100%", 
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                
                {/* Scanner Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg relative">
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                  </div>
                </div>

                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                    <div className="text-white text-center">
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="font-semibold">Processing...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Input */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualVerify()}
                  placeholder="Or enter ticket code manually"
                  className="w-full p-4 pr-24 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  disabled={isProcessing}
                />
                <button
                  onClick={handleManualVerify}
                  disabled={isProcessing || !manualCode.trim()}
                  className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${getStatusColor()}`}>
              <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status === "success" ? "bg-green-100 text-green-800" :
                    status === "error" ? "bg-red-100 text-red-800" :
                    status === "verifying" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium block mb-2">Message:</span>
                  <p className="text-lg">{statusMessage}</p>
                </div>

                {qrData && (
                  <div>
                    <span className="font-medium block mb-2">Scanned Code:</span>
                    <p className="font-mono bg-gray-100 p-2 rounded-lg break-all">{qrData}</p>
                  </div>
                )}

                {messageStatus && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="font-medium">Message Status:</span>
                    <p className="mt-1">{messageStatus}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Attendee Info */}
            {attendeeInfo.name && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold mb-4 text-green-800">Attendee Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-lg">{attendeeInfo.name}</p>
                  </div>
                  {attendeeInfo.email && (
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-lg">{attendeeInfo.email}</p>
                    </div>
                  )}
                  {attendeeInfo.event && (
                    <div>
                      <span className="font-medium text-gray-600">Event:</span>
                      <p className="text-lg">{attendeeInfo.event}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Scan History */}
            {scanHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
                <div className="space-y-2">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          scan.valid ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-mono text-sm">{scan.code}</span>
                        {scan.attendeeName && (
                          <span className="text-sm text-gray-600">({scan.attendeeName})</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {scan.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Point the camera at the QR code to scan automatically, or enter the code manually</p>
        </div>
      </div>
    </div>
  );
}