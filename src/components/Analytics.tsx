import React from 'react';
import { BarChart3, Users, TrendingUp, AlertCircle, Calendar, MessageSquare } from 'lucide-react';

export default function Analytics() {
  const stats = [
    { label: 'Active Users', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Sessions Booked', value: '89', change: '+8%', trend: 'up' },
    { label: 'Crisis Interventions', value: '23', change: '-5%', trend: 'down' },
    { label: 'Peer Support Posts', value: '156', change: '+25%', trend: 'up' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Analytics Dashboard</h2>
        <p className="text-gray-600">
          Anonymous insights to help improve campus mental health services and identify trends.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.trend === 'down' ? 'transform rotate-180' : ''
                }`} />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Usage trend chart would appear here</p>
            </div>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Low Risk</span>
              </div>
              <span className="text-sm font-medium text-gray-900">742 (59%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Medium Risk</span>
              </div>
              <span className="text-sm font-medium text-gray-900">358 (29%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">High Risk</span>
              </div>
              <span className="text-sm font-medium text-gray-900">124 (10%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Crisis</span>
              </div>
              <span className="text-sm font-medium text-gray-900">23 (2%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Engagement</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Active Users</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Sessions Booked</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg. Risk Level</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Computer Science</td>
                <td className="py-3 px-4">342</td>
                <td className="py-3 px-4">28</td>
                <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium</span></td>
                <td className="py-3 px-4">76%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Business Administration</td>
                <td className="py-3 px-4">289</td>
                <td className="py-3 px-4">22</td>
                <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low</span></td>
                <td className="py-3 px-4">68%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Engineering</td>
                <td className="py-3 px-4">245</td>
                <td className="py-3 px-4">19</td>
                <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium</span></td>
                <td className="py-3 px-4">71%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Liberal Arts</td>
                <td className="py-3 px-4">198</td>
                <td className="py-3 px-4">15</td>
                <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low</span></td>
                <td className="py-3 px-4">82%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Medicine</td>
                <td className="py-3 px-4">173</td>
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">High</span></td>
                <td className="py-3 px-4">45%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert System */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-orange-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-orange-900">System Alerts</h3>
            <div className="mt-2 space-y-2">
              <div className="text-sm text-orange-800">
                • Increased crisis interventions in Computer Science department (+15% this week)
              </div>
              <div className="text-sm text-orange-800">
                • Low engagement from Medicine students - consider targeted outreach
              </div>
              <div className="text-sm text-orange-800">
                • Peer support forum activity increased significantly (+45% this month)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="font-medium text-gray-900">High Priority</p>
              <p className="text-sm text-gray-600">Schedule additional counselor availability for Computer Science students</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="font-medium text-gray-900">Medium Priority</p>
              <p className="text-sm text-gray-600">Create targeted wellness programming for Medicine department</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="font-medium text-gray-900">Low Priority</p>
              <p className="text-sm text-gray-600">Expand peer support volunteer program to meet growing demand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}