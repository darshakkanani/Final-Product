import React, { useState } from 'react';
import { FileText, Download, Mail, Settings, Eye, Calendar, User, Building } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const reportTemplates = [
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'High-level overview for management',
    sections: ['Executive Summary', 'Risk Overview', 'Recommendations'],
    format: 'PDF',
    pages: '2-3'
  },
  {
    id: 'technical',
    name: 'Technical Report',
    description: 'Detailed technical findings',
    sections: ['Methodology', 'Findings', 'Evidence', 'Remediation'],
    format: 'PDF',
    pages: '15-25'
  },
  {
    id: 'compliance',
    name: 'Compliance Report',
    description: 'Regulatory compliance assessment',
    sections: ['Compliance Status', 'Gaps', 'Action Plan'],
    format: 'PDF',
    pages: '8-12'
  },
  {
    id: 'custom',
    name: 'Custom Report',
    description: 'Build your own report structure',
    sections: ['Customizable'],
    format: 'PDF/HTML',
    pages: 'Variable'
  }
];

const generatedReports = [
  {
    id: '1',
    name: 'Q1 2024 Security Assessment - example.com',
    template: 'Technical Report',
    generatedDate: '2024-01-15',
    status: 'completed',
    size: '2.4 MB',
    pages: 18
  },
  {
    id: '2',
    name: 'Executive Summary - API Security Review',
    template: 'Executive Summary',
    generatedDate: '2024-01-14',
    status: 'completed',
    size: '856 KB',
    pages: 3
  },
  {
    id: '3',
    name: 'Compliance Assessment - GDPR',
    template: 'Compliance Report',
    generatedDate: '2024-01-13',
    status: 'generating',
    size: null,
    pages: null
  }
];

export function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState(reportTemplates[0]);
  const [reportConfig, setReportConfig] = useState({
    title: 'Security Assessment Report',
    client: 'Example Corp',
    analyst: 'Security Team',
    date: new Date().toISOString().split('T')[0],
    logo: true,
    executiveSummary: true,
    technicalDetails: true,
    charts: true,
    recommendations: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and manage security assessment reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Settings className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            <FileText className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <Card title="Report Templates" description="Choose a report template">
          <div className="space-y-4">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate.id === template.id
                    ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="info">{template.format}</Badge>
                  <span className="text-gray-500 dark:text-gray-400">{template.pages} pages</span>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sections: {template.sections.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Configuration */}
        <Card title="Report Configuration" description="Customize your report">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Title
              </label>
              <input
                type="text"
                value={reportConfig.title}
                onChange={(e) => setReportConfig({...reportConfig, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={reportConfig.client}
                onChange={(e) => setReportConfig({...reportConfig, client: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Analyst Name
              </label>
              <input
                type="text"
                value={reportConfig.analyst}
                onChange={(e) => setReportConfig({...reportConfig, analyst: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Date
              </label>
              <input
                type="date"
                value={reportConfig.date}
                onChange={(e) => setReportConfig({...reportConfig, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Include Sections:</h4>
              
              {[
                { key: 'executiveSummary', label: 'Executive Summary' },
                { key: 'technicalDetails', label: 'Technical Details' },
                { key: 'charts', label: 'Charts & Graphs' },
                { key: 'recommendations', label: 'Recommendations' },
                { key: 'logo', label: 'Company Logo' }
              ].map((section) => (
                <div key={section.key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={section.key}
                    checked={reportConfig[section.key as keyof typeof reportConfig] as boolean}
                    onChange={(e) => setReportConfig({
                      ...reportConfig,
                      [section.key]: e.target.checked
                    })}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor={section.key} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {section.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button onClick={handleGenerateReport} disabled={isGenerating} className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
                <Button variant="secondary">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Generated Reports */}
        <Card title="Generated Reports" description="Your report history">
          <div className="space-y-4">
            {generatedReports.map((report) => (
              <div key={report.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{report.name}</h4>
                  <Badge variant={report.status === 'completed' ? 'success' : 'warning'}>
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{report.template}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{report.generatedDate}</span>
                  {report.size && <span>{report.size} • {report.pages} pages</span>}
                </div>
                {report.status === 'completed' && (
                  <div className="flex space-x-2 mt-3">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View All Reports
            </Button>
          </div>
        </Card>
      </div>

      {/* Report Preview */}
      <Card title="Report Preview" description="Preview of your generated report">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Building className="h-12 w-12 text-red-600 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{reportConfig.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{reportConfig.client}</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {reportConfig.analyst}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(reportConfig.date).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {reportConfig.executiveSummary && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Executive Summary</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  This security assessment identified several critical vulnerabilities that require immediate attention. 
                  The assessment covered web applications, network infrastructure, and configuration reviews.
                </p>
              </div>
            )}

            {reportConfig.technicalDetails && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Findings</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">2</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Critical</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">5</div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">High</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Low</div>
                  </div>
                </div>
              </div>
            )}

            {reportConfig.recommendations && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recommendations</h2>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Immediately patch critical SQL injection vulnerabilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Update SSL/TLS configuration to disable weak ciphers
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Implement proper input validation across all forms
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}