import type { Metadata } from "next";
import { Shield, Lock, Users, FileText, Mail, Phone, MapPin, Calendar, CheckCircle, AlertTriangle, Download, Edit, Target, Info, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance - StyleHub",
  description: "Learn about StyleHub's commitment to GDPR compliance and how we protect your personal data.",
};

export default function GDPRInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            GDPR Compliance
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-stone-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-stone-700 dark:to-stone-600 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    What is GDPR?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The General Data Protection Regulation (GDPR) is a comprehensive data protection law that gives individuals 
                    control over their personal data and requires organizations to handle data responsibly and transparently.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Commitment */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Our Commitment to GDPR
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Transparency",
                    description: "We are transparent about how we collect, use, and protect your personal data.",
                    icon: "🔍",
                    color: "blue"
                  },
                  {
                    title: "Accountability",
                    description: "We take responsibility for our data processing activities and demonstrate compliance.",
                    icon: "⚖️",
                    color: "green"
                  },
                  {
                    title: "Security",
                    description: "We implement appropriate technical and organizational measures to protect your data.",
                    icon: "🔒",
                    color: "purple"
                  },
                  {
                    title: "User Rights",
                    description: "We respect and facilitate your rights under GDPR, including access and deletion.",
                    icon: "👤",
                    color: "orange"
                  },
                  {
                    title: "Data Minimization",
                    description: "We only collect and process data that is necessary for our legitimate purposes.",
                    icon: "📊",
                    color: "red"
                  },
                  {
                    title: "Consent Management",
                    description: "We obtain clear, informed consent for data processing activities.",
                    icon: "✅",
                    color: "indigo"
                  }
                ].map((commitment, index) => (
                  <div key={index} className={`p-6 bg-${commitment.color}-50 dark:bg-${commitment.color}-900/20 rounded-xl border border-${commitment.color}-200 dark:border-${commitment.color}-800 hover:shadow-lg transition-all duration-300`}>
                    <div className="text-3xl mb-3">{commitment.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {commitment.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Processing Principles */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Processing Principles
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Lawful Processing
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200 leading-relaxed">
                      We process personal data only when we have a legal basis to do so, such as consent, 
                      contract performance, or legitimate interests.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Purpose Limitation
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      We collect data for specified, explicit, and legitimate purposes and do not process 
                      it in a way that is incompatible with those purposes.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Data Minimization
                    </h3>
                    <p className="text-green-800 dark:text-green-200 leading-relaxed">
                      We only collect data that is adequate, relevant, and limited to what is necessary 
                      for the purposes for which it is processed.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center">
                      <Edit className="w-5 h-5 mr-2" />
                      Accuracy
                    </h3>
                    <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
                      We take reasonable steps to ensure that personal data is accurate and kept up to date, 
                      and we correct or delete inaccurate data.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Legal Basis for Processing
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Consent
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
                    We obtain your explicit consent for marketing communications and non-essential cookies.
                  </p>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Contract Performance
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                    We process data necessary to fulfill your orders and provide our services.
                  </p>
                </div>
                
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Legitimate Interests
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    We process data for security, fraud prevention, and service improvement.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Subject Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Rights Under GDPR
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Right to Access",
                    description: "Request a copy of your personal data and information about how we process it.",
                    icon: "👁️"
                  },
                  {
                    title: "Right to Rectification",
                    description: "Request correction of inaccurate or incomplete personal data.",
                    icon: "✏️"
                  },
                  {
                    title: "Right to Erasure",
                    description: "Request deletion of your personal data in certain circumstances.",
                    icon: "🗑️"
                  },
                  {
                    title: "Right to Portability",
                    description: "Receive your personal data in a structured, machine-readable format.",
                    icon: "📤"
                  },
                  {
                    title: "Right to Object",
                    description: "Object to processing of your personal data for certain purposes.",
                    icon: "🚫"
                  },
                  {
                    title: "Right to Withdraw Consent",
                    description: "Withdraw consent for data processing where consent is the legal basis.",
                    icon: "↩️"
                  }
                ].map((right, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300">
                    <div className="text-2xl mb-3">{right.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {right.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Security Measures
                </h2>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Technical Measures
                    </h3>
                    <ul className="space-y-2 text-green-800 dark:text-green-200">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        SSL encryption for data transmission
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Secure data storage with encryption
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Access controls and authentication
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Regular security assessments
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Organizational Measures
                    </h3>
                    <ul className="space-y-2 text-green-800 dark:text-green-200">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Employee training on data protection
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Data processing agreements
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Incident response procedures
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Regular compliance audits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Breach Response */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Breach Response
                </h2>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                      Our Response Plan
                    </h3>
                    <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
                      In the event of a data breach, we have procedures in place to:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Assess the breach within 72 hours</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Notify affected individuals</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Report to authorities if required</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Implement containment measures</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Document the incident</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Review and improve security</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Data Protection Officer
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-blue-800 dark:text-blue-200">Admin@tech2design.co.uk</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-blue-800 dark:text-blue-200">+44 20 1234 5678</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-blue-800 dark:text-blue-200">1 The Street, Mayfair, London W1J 8AJ</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    General Privacy Inquiries
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200">Admin@tech2design.co.uk</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200">Response Time: Within 24 hours</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200">Available: Monday-Friday, 9AM-6PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
