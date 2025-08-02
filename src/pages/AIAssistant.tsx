import React, { useState } from 'react';
import { Bot, Send, Lightbulb, TrendingUp, AlertTriangle, MessageSquare, Sparkles } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const chatHistory = [
  {
    id: '1',
    type: 'user',
    message: 'What should I prioritize from my latest scan results?',
    timestamp: '2024-01-15 14:30:00'
  },
  {
    id: '2',
    type: 'assistant',
    message: 'Based on your latest scan of example.com, I recommend prioritizing these issues:\n\n1. **Critical SQL Injection** (CVSS 9.1) - Immediate fix required\n2. **Weak SSL Configuration** (CVSS 7.4) - High priority\n3. **Directory Listing** (CVSS 5.3) - Medium priority\n\nThe SQL injection poses the highest risk as it could lead to data breach. Would you like me to provide specific remediation steps?',
    timestamp: '2024-01-15 14:30:15'
  },
  {
    id: '3',
    type: 'user',
    message: 'Yes, please provide remediation steps for the SQL injection',
    timestamp: '2024-01-15 14:31:00'
  },
  {
    id: '4',
    type: 'assistant',
    message: 'Here are the recommended remediation steps for the SQL injection vulnerability:\n\n**Immediate Actions:**\n1. Use parameterized queries/prepared statements\n2. Implement input validation and sanitization\n3. Apply principle of least privilege to database accounts\n\n**Code Example:**\n```sql\n-- Instead of: "SELECT * FROM users WHERE id = " + userId\n-- Use: SELECT * FROM users WHERE id = ?\n```\n\n**Testing:**\n- Re-run the scan after fixes\n- Consider penetration testing\n\nWould you like me to generate a detailed remediation report?',
    timestamp: '2024-01-15 14:31:30'
  }
];

const suggestions = [
  {
    id: '1',
    title: 'Risk Assessment Summary',
    description: 'Get an AI-powered summary of your current security posture',
    icon: TrendingUp,
    action: 'Generate risk summary for all active targets'
  },
  {
    id: '2',
    title: 'Vulnerability Prioritization',
    description: 'AI-ranked list of vulnerabilities by business impact',
    icon: AlertTriangle,
    action: 'What vulnerabilities should I fix first?'
  },
  {
    id: '3',
    title: 'Remediation Guidance',
    description: 'Step-by-step fixes for identified security issues',
    icon: Lightbulb,
    action: 'How do I fix the critical vulnerabilities?'
  },
  {
    id: '4',
    title: 'Trend Analysis',
    description: 'Analyze security trends across your infrastructure',
    icon: TrendingUp,
    action: 'Show me security trends over the last 30 days'
  }
];

const insights = [
  {
    id: '1',
    title: 'Critical Vulnerability Trend',
    description: 'Critical vulnerabilities have decreased by 40% this month',
    type: 'positive',
    metric: '↓ 40%',
    details: 'Great progress on fixing SQL injection and RCE vulnerabilities'
  },
  {
    id: '2',
    title: 'New Attack Vector Detected',
    description: 'AI detected potential HTTP smuggling vulnerability pattern',
    type: 'warning',
    metric: 'New',
    details: 'Recommend immediate investigation of web server configuration'
  },
  {
    id: '3',
    title: 'Scan Coverage Optimization',
    description: 'AI suggests expanding scan scope to include 3 new subdomains',
    type: 'info',
    metric: '+3 targets',
    details: 'Discovered through passive reconnaissance analysis'
  }
];

export function AIAssistant() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsTyping(true);
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);
    setMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Security Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">Get intelligent insights and recommendations for your security posture</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className={`border-l-4 ${
            insight.type === 'positive' ? 'border-l-green-500' :
            insight.type === 'warning' ? 'border-l-yellow-500' :
            'border-l-blue-500'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
              <Badge variant={
                insight.type === 'positive' ? 'success' :
                insight.type === 'warning' ? 'warning' : 'info'
              }>
                {insight.metric}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{insight.details}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card title="Chat with AI Assistant" description="Ask questions about your security findings">
            <div className="space-y-4">
              {/* Chat History */}
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                    }`}>
                      {chat.type === 'assistant' && (
                        <div className="flex items-center mb-2">
                          <Bot className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-sm font-medium text-red-600">AI Assistant</span>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-wrap">{chat.message}</div>
                      <div className={`text-xs mt-1 ${
                        chat.type === 'user' ? 'text-red-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-red-600" />
                        <span className="text-sm font-medium text-red-600 mr-2">AI Assistant</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about your security findings..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={isTyping || !message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions" description="Common AI-powered analysis">
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.action)}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <suggestion.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              View All Suggestions
            </Button>
          </div>
        </Card>
      </div>

      {/* AI Capabilities */}
      <Card title="AI Capabilities" description="What our AI assistant can help you with">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent risk scoring and prioritization based on business context</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Smart Recommendations</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Contextual remediation guidance and best practices</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Threat Detection</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced pattern recognition for emerging threats</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Bot className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Natural Language</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ask questions in plain English about your security posture</p>
          </div>
        </div>
      </Card>
    </div>
  );
}