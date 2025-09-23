// "use client";

// import { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";

// // Dynamically import QR scanner with better error handling
// const QrScanner = dynamic(
//   () => import("react-qr-scanner").then((mod) => mod.default),
//   { 
//     ssr: false,
//     loading: () => <CameraPlaceholder />
//   }
// );

// interface VerifyResponse {
//   valid: boolean;
//   attendeeEmail?: string;
//   attendeeName?: string;
//   eventName?: string;
// }

// interface ScanResult {
//   text?: string;
// }

// type Status = "idle" | "scanning" | "verifying" | "success" | "error" | "camera_error";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // Camera placeholder component
// function CameraPlaceholder() {
//   return (
//     <div className="w-full aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//           </svg>
//         </div>
//         <p className="text-gray-600">Loading camera...</p>
//       </div>
//     </div>
//   );
// }

// // Camera selector component
// function CameraSelector({ onCameraChange }: { onCameraChange: (deviceId: string) => void }) {
//   const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
//   const [selectedCamera, setSelectedCamera] = useState<string>("environment");

//   useEffect(() => {
//     const getCameras = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ video: true });
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');
//         setDevices(videoDevices);
//       } catch (err) {
//         console.log('Error getting cameras:', err);
//       }
//     };

//     getCameras();
//   }, []);

//   const handleCameraChange = (deviceId: string) => {
//     setSelectedCamera(deviceId);
//     onCameraChange(deviceId);
//   };

//   if (devices.length === 0) return null;

//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-2">Select Camera:</label>
//       <select 
//         value={selectedCamera}
//         onChange={(e) => handleCameraChange(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-lg"
//       >
//         <option value="environment">Back Camera (Auto)</option>
//         <option value="user">Front Camera</option>
//         {devices.map((device) => (
//           <option key={device.deviceId} value={device.deviceId}>
//             {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default function VerifyQRPage() {
//   const [qrData, setQrData] = useState<string>("");
//   const [manualCode, setManualCode] = useState<string>("");
//   const [status, setStatus] = useState<Status>("idle");
//   const [statusMessage, setStatusMessage] = useState<string>("Scan a QR code to verify ticket");
//   const [messageStatus, setMessageStatus] = useState<string>("");
//   const [attendeeInfo, setAttendeeInfo] = useState<{
//     email?: string;
//     name?: string;
//     event?: string;
//   }>({});
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);
//   const [scanHistory, setScanHistory] = useState<Array<{
//     code: string;
//     valid: boolean;
//     timestamp: Date;
//     attendeeName?: string;
//   }>>([]);
//   const [cameraError, setCameraError] = useState<string>("");
//   const [selectedCamera, setSelectedCamera] = useState<string>("environment");
//   const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(true);

//   const scannerRef = useRef<any>(null);

//   // Check camera permissions on component mount
//   useEffect(() => {
//     checkCameraPermissions();
//   }, []);

//   const checkCameraPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       // Stop all tracks to release camera
//       stream.getTracks().forEach(track => track.stop());
//       setHasCameraPermission(true);
//       setCameraError("");
//     } catch (err: any) {
//       setHasCameraPermission(false);
//       setCameraError(getCameraErrorMessage(err));
//       setStatus("camera_error");
//     }
//   };

//   const getCameraErrorMessage = (error: Error) => {
//     if (error.name === 'NotAllowedError') {
//       return 'Camera access denied. Please allow camera permissions in your browser settings.';
//     } else if (error.name === 'NotFoundError') {
//       return 'No camera found on this device.';
//     } else if (error.name === 'NotSupportedError') {
//       return 'Camera not supported in this browser.';
//     } else if (error.name === 'NotReadableError') {
//       return 'Camera is already in use by another application.';
//     } else {
//       return 'Unable to access camera. Please try again.';
//     }
//   };

//   const handleScan = async (result: ScanResult | string | null) => {
//     if (!result || isProcessing) return;
    
//     setIsProcessing(true);
//     setStatus("verifying");
//     setStatusMessage("Verifying ticket...");
//     setMessageStatus("");

//     try {
//       const data = typeof result === "string" ? result : result.text;
//       if (!data) return;

//       setQrData(data);
      
//       const res = await axios.post<VerifyResponse>(
//         `${API_URL}/api/v1/verify`,
//         { ticketCode: data },
//         { 
//           withCredentials: true, 
//           timeout: 10000,
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       const scanRecord = {
//         code: data.substring(0, 8) + '...',
//         valid: res.data.valid,
//         timestamp: new Date(),
//         attendeeName: res.data.attendeeName
//       };
      
//       setScanHistory(prev => [scanRecord, ...prev.slice(0, 4)]);

//       if (res.data.valid) {
//         setStatus("success");
//         setStatusMessage("Ticket Valid ✅");
//         setAttendeeInfo({
//           email: res.data.attendeeEmail,
//           name: res.data.attendeeName,
//           event: res.data.eventName
//         });
        
//         if (res.data.attendeeEmail) {
//           await sendImmediateMessage(res.data.attendeeEmail);
//         }
//       } else {
//         setStatus("error");
//         setStatusMessage("Ticket Invalid ❌");
//         setAttendeeInfo({});
//       }
//     } catch (err: unknown) {
//       setStatus("error");
//       setAttendeeInfo({});
      
//       if (axios.isAxiosError(err)) {
//         setStatusMessage(err.response?.data?.message || "Server error");
//       } else {
//         setStatusMessage("Error verifying ticket");
//       }
//     } finally {
//       setTimeout(() => setIsProcessing(false), 1500);
//     }
//   };

//   const sendImmediateMessage = async (email: string) => {
//     try {
//       setMessageStatus("Sending welcome message...");
//       await axios.post(`${API_URL}/api/send-message`, {
//         email,
//         type: "welcome",
//       });
//       setMessageStatus("Welcome message sent ✅");
//     } catch (err) {
//       console.error(err);
//       setMessageStatus("Failed to send message ❌");
//     }
//   };

//   const handleManualVerify = async () => {
//     if (!manualCode.trim() || isProcessing) return;
//     await handleScan(manualCode.trim());
//   };

//   const handleCameraError = (err: any) => {
//     console.error('Camera error:', err);
//     setCameraError(getCameraErrorMessage(err));
//     setStatus("camera_error");
//     setHasCameraPermission(false);
//   };

//   const handleCameraChange = (deviceId: string) => {
//     setSelectedCamera(deviceId);
//     setCameraError("");
//     setStatus("idle");
//   };

//   const requestCameraAccess = async () => {
//     try {
//       await checkCameraPermissions();
//       if (hasCameraPermission) {
//         setCameraError("");
//         setStatus("idle");
//       }
//     } catch (err) {
//       console.error('Error requesting camera access:', err);
//     }
//   };

//   const resetScanner = () => {
//     setQrData("");
//     setStatus("idle");
//     setStatusMessage("Scan a QR code to verify ticket");
//     setMessageStatus("");
//     setAttendeeInfo({});
//     setIsProcessing(false);
//     setCameraError("");
//   };

//   const getStatusColor = () => {
//     switch (status) {
//       case "success": return "bg-green-50 border-green-200 text-green-800";
//       case "error": return "bg-red-50 border-red-200 text-red-800";
//       case "verifying": return "bg-blue-50 border-blue-200 text-blue-800";
//       case "camera_error": return "bg-orange-50 border-orange-200 text-orange-800";
//       default: return "bg-gray-50 border-gray-200 text-gray-800";
//     }
//   };

//   const scannerConstraints: MediaStreamConstraints = {
//   video:
//     selectedCamera === "environment"
//       ? { facingMode: { ideal: "environment" } }
//       : selectedCamera === "user"
//       ? { facingMode: { ideal: "user" } }
//       : selectedCamera
//       ? { deviceId: { exact: selectedCamera } }
//       : true, // ✅ fallback ensures video is always requested
// };



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             QR Ticket Verifier
//           </h1>
//           <p className="text-lg text-gray-600">
//             Scan event tickets to verify authenticity
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Scanner Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">QR Scanner</h2>
//               <button
//                 onClick={resetScanner}
//                 className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 Reset
//               </button>
//             </div>

//             {/* Camera Selector */}
//             <CameraSelector onCameraChange={handleCameraChange} />

//             {/* Scanner Container */}
//             <div className="relative mb-6">
//               {cameraError ? (
//                 <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
//                   <div className="text-center p-4">
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                       </svg>
//                     </div>
//                     <p className="text-red-600 mb-4">{cameraError}</p>
//                     <button
//                       onClick={requestCameraAccess}
//                       className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                       Grant Camera Access
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="aspect-square bg-black rounded-xl overflow-hidden relative">
//                   <QrScanner
//                     ref={scannerRef}
//                     delay={500}
//                     onError={handleCameraError}
//                     onScan={handleScan}
//                     constraints={scannerConstraints}
//                     style={{ 
//                       width: "100%", 
//                       height: "100%",
//                       objectFit: "cover"
//                     }}
//                   />
                  
//                   {/* Scanner Overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg relative">
//                       <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
//                       <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
//                       <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
//                       <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
//                     </div>
//                   </div>

//                   {/* Processing Overlay */}
//                   {isProcessing && (
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
//                       <div className="text-white text-center">
//                         <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                         <p className="font-semibold">Processing...</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Manual Input */}
//             <div className="space-y-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={manualCode}
//                   onChange={(e) => setManualCode(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleManualVerify()}
//                   placeholder="Or enter ticket code manually"
//                   className="w-full p-4 pr-24 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
//                   disabled={isProcessing}
//                 />
//                 <button
//                   onClick={handleManualVerify}
//                   disabled={isProcessing || !manualCode.trim()}
//                   className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Verify
//                 </button>
//               </div>
//             </div>
//           </div>

//            {/* Results Section */}
//           <div className="space-y-6">
//             {/* Status Card */}
//             <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${getStatusColor()}`}>
//               <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
              
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium">Status:</span>
//                   <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     status === "success" ? "bg-green-100 text-green-800" :
//                     status === "error" ? "bg-red-100 text-red-800" :
//                     status === "verifying" ? "bg-blue-100 text-blue-800" :
//                     "bg-gray-100 text-gray-800"
//                   }`}>
//                     {status.toUpperCase()}
//                   </span>
//                 </div>
                
//                 <div>
//                   <span className="font-medium block mb-2">Message:</span>
//                   <p className="text-lg">{statusMessage}</p>
//                 </div>

//                 {qrData && (
//                   <div>
//                     <span className="font-medium block mb-2">Scanned Code:</span>
//                     <p className="font-mono bg-gray-100 p-2 rounded-lg break-all">{qrData}</p>
//                   </div>
//                 )}

//                 {messageStatus && (
//                   <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                     <span className="font-medium">Message Status:</span>
//                     <p className="mt-1">{messageStatus}</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Attendee Info */}
//             {attendeeInfo.name && (
//               <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
//                 <h3 className="text-lg font-semibold mb-4 text-green-800">Attendee Information</h3>
//                 <div className="space-y-3">
//                   <div>
//                     <span className="font-medium text-gray-600">Name:</span>
//                     <p className="text-lg">{attendeeInfo.name}</p>
//                   </div>
//                   {attendeeInfo.email && (
//                     <div>
//                       <span className="font-medium text-gray-600">Email:</span>
//                       <p className="text-lg">{attendeeInfo.email}</p>
//                     </div>
//                   )}
//                   {attendeeInfo.event && (
//                     <div>
//                       <span className="font-medium text-gray-600">Event:</span>
//                       <p className="text-lg">{attendeeInfo.event}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Scan History */}
//             {scanHistory.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-xl p-6">
//                 <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
//                 <div className="space-y-2">
//                   {scanHistory.map((scan, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-3 h-3 rounded-full ${
//                           scan.valid ? 'bg-green-500' : 'bg-red-500'
//                         }`}></div>
//                         <span className="font-mono text-sm">{scan.code}</span>
//                         {scan.attendeeName && (
//                           <span className="text-sm text-gray-600">({scan.attendeeName})</span>
//                         )}
//                       </div>
//                       <span className="text-xs text-gray-500">
//                         {scan.timestamp.toLocaleTimeString()}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-gray-500 text-sm">
//           <p>Point the camera at the QR code to scan automatically, or enter the code manually</p>
//         </div>
//       </div>
//     </div>
//   );
// }