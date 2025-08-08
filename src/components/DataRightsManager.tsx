"use client";

import { useState } from "react";
import { Download, Edit, Trash2, FileText, Mail, Shield, Eye } from "lucide-react";

interface DataRequest {
  id: string;
  type: "access" | "rectification" | "erasure" | "portability";
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: Date;
  description: string;
}

export default function DataRightsManager() {
  const [activeTab, setActiveTab] = useState("rights");
  const [requests, setRequests] = useState<DataRequest[]>([
    {
      id: "1",
      type: "access",
      status: "completed",
      createdAt: new Date("2024-01-15"),
      description: "Request for personal data access",
    },
  ]);

  const [formData, setFormData] = useState({
    email: "",
    reason: "",
    specificData: "",
  });

  const handleSubmit = (type: DataRequest["type"]) => {
    const newRequest: DataRequest = {
      id: Date.now().toString(),
      type,
      status: "pending",
      createdAt: new Date(),
      description: `Request for ${type} of personal data`,
    };
    setRequests([newRequest, ...requests]);
    setFormData({ email: "", reason: "", specificData: "" });
  };

  const getStatusColor = (status: DataRequest["status"]) => {
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

  const getTypeIcon = (type: DataRequest["type"]) => {
    switch (type) {
      case "access":
        return <Eye size={16} />;
      case "rectification":
        return <Edit size={16} />;
      case "erasure":
        return <Trash2 size={16} />;
      case "portability":
        return <Download size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-stone-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-stone-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Data Rights
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Exercise your rights under GDPR to control your personal data
            </p>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-gray-200 dark:border-stone-700">
            <button
              onClick={() => setActiveTab("rights")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "rights"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Your Rights
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "requests"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Request History
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "rights" && (
              <div className="space-y-8">
                {/* Rights Overview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Eye className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Right to Access
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Request a copy of all personal data we hold about you and information about how we process it.
                    </p>
                    <button
                      onClick={() => handleSubmit("access")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Request Access
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Edit className="text-green-600 dark:text-green-400 mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Right to Rectification
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Correct inaccurate or incomplete personal data we hold about you.
                    </p>
                    <button
                      onClick={() => handleSubmit("rectification")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Request Correction
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Trash2 className="text-red-600 dark:text-red-400 mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Right to Erasure
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Request deletion of your personal data (&quot;right to be forgotten&quot;).
                    </p>
                    <button
                      onClick={() => handleSubmit("erasure")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Request Deletion
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-stone-600 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Download className="text-purple-600 dark:text-purple-400 mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Right to Portability
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Receive your data in a structured, machine-readable format.
                    </p>
                    <button
                      onClick={() => handleSubmit("portability")}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Request Data Export
                    </button>
                  </div>
                </div>

                {/* Request Form */}
                <div className="mt-8 p-6 bg-gray-50 dark:bg-stone-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Submit a Data Request
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Reason for Request
                      </label>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white"
                      >
                        <option value="">Select a reason</option>
                        <option value="verification">Data verification</option>
                        <option value="correction">Data correction</option>
                        <option value="deletion">Account deletion</option>
                        <option value="export">Data export</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      value={formData.specificData}
                      onChange={(e) => setFormData({ ...formData, specificData: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white"
                      placeholder="Please provide any specific details about your request..."
                    />
                  </div>
                </div>

                {/* Information Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="text-blue-600 dark:text-blue-400 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Important Information
                      </h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• We will respond to your request within 30 days</li>
                        <li>• You may be asked to provide proof of identity</li>
                        <li>• Some data may be retained for legal or regulatory purposes</li>
                        <li>• You can contact our DPO at dpo@stylehub.com for urgent requests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Your Request History
                </h3>
                {requests.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-300">No requests found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 border border-gray-200 dark:border-stone-600 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getTypeIcon(request.type)}
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                                {request.type} Request
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {request.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Submitted: {request.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
