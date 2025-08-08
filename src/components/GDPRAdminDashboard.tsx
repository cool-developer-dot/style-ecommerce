"use client";

import { useState } from "react";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye
} from "lucide-react";

interface DataRequest {
  id: string;
  userId: string;
  type: "access" | "rectification" | "erasure" | "portability";
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: Date;
  completedAt?: Date;
  description: string;
  userEmail: string;
}

interface ConsentRecord {
  id: string;
  userId: string;
  userEmail: string;
  consentType: "marketing" | "analytics" | "essential";
  granted: boolean;
  grantedAt: Date;
  withdrawnAt?: Date;
  ipAddress: string;
  userAgent: string;
}

interface DataBreach {
  id: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  discoveredAt: Date;
  reportedAt: Date;
  status: "investigating" | "contained" | "resolved";
  affectedUsers: number;
}

export default function GDPRAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([
    {
      id: "1",
      userId: "user123",
      type: "access",
      status: "completed",
      createdAt: new Date("2024-01-15"),
      completedAt: new Date("2024-01-20"),
      description: "Request for personal data access",
      userEmail: "user@example.com",
    },
    {
      id: "2",
      userId: "user456",
      type: "erasure",
      status: "pending",
      createdAt: new Date("2024-01-18"),
      description: "Request for account deletion",
      userEmail: "another@example.com",
    },
  ]);

  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([
    {
      id: "1",
      userId: "user123",
      userEmail: "user@example.com",
      consentType: "marketing",
      granted: true,
      grantedAt: new Date("2024-01-10"),
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0...",
    },
  ]);

  const [dataBreaches, setDataBreaches] = useState<DataBreach[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-stone-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  GDPR Compliance Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor and manage data protection compliance
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="text-blue-600 dark:text-blue-400" size={32} />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Compliant
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-gray-200 dark:border-stone-700">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "requests"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Data Requests
            </button>
            <button
              onClick={() => setActiveTab("consent")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "consent"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Consent Management
            </button>
            <button
              onClick={() => setActiveTab("breaches")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "breaches"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Data Breaches
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "audit"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Audit Trail
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Compliance Status */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-600 dark:text-green-400 mr-3" size={24} />
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Compliance Status</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">100%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Users className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Users</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,234</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="text-yellow-600 dark:text-yellow-400 mr-3" size={24} />
                      <div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending Requests</p>
                        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">5</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="text-purple-600 dark:text-purple-400 mr-3" size={24} />
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Data Breaches</p>
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Data Requests
                    </h3>
                    <div className="space-y-3">
                      {dataRequests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-stone-700 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                              {request.type} Request
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {request.userEmail}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Consent Statistics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Marketing Consent</span>
                          <span className="text-gray-900 dark:text-white">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-stone-600 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Analytics Consent</span>
                          <span className="text-gray-900 dark:text-white">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-stone-600 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Data Subject Requests
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Report
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-stone-600">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Created</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-200 dark:border-stone-600">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{request.userEmail}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">ID: {request.userId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize text-gray-900 dark:text-white">{request.type}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                request.status
                              )}`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            {request.createdAt.toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                                <CheckCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "consent" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Consent Management
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Marketing Consent</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Granted</span>
                        <span className="font-medium text-gray-900 dark:text-white">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Withdrawn</span>
                        <span className="font-medium text-gray-900 dark:text-white">22%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Analytics Consent</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Granted</span>
                        <span className="font-medium text-gray-900 dark:text-white">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Withdrawn</span>
                        <span className="font-medium text-gray-900 dark:text-white">35%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Essential Cookies</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Active</span>
                        <span className="font-medium text-gray-900 dark:text-white">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Required</span>
                        <span className="font-medium text-gray-900 dark:text-white">Always</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "breaches" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Data Breach Monitoring
                  </h3>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Report Breach
                  </button>
                </div>
                
                {dataBreaches.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="mx-auto text-green-600 dark:text-green-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-300">No data breaches detected</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      All systems are secure and compliant
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dataBreaches.map((breach) => (
                      <div key={breach.id} className="p-4 border border-gray-200 dark:border-stone-600 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{breach.description}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Discovered: {breach.discoveredAt.toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                              breach.severity
                            )}`}
                          >
                            {breach.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "audit" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Audit Trail
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Data Access Log</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          User data accessed by admin user
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm">Authorized</span>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Consent Updated</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Marketing consent withdrawn by user
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 text-sm">User Action</span>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Data Export</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Personal data exported for user request
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                      <span className="text-purple-600 dark:text-purple-400 text-sm">GDPR Request</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
