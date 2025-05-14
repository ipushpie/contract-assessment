'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { assessmentApi } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  FileText, 
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  BarChart3
} from 'lucide-react';

export default function AssessmentDetailPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const data = await assessmentApi.getById(params.id, token);
        setAssessment(data);
      } catch (err: any) {
        console.error('Error fetching assessment:', err);
        setError(err.message || 'Failed to load assessment');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [token, params.id]);

  const handleDeleteAssessment = async () => {
    if (!token || !assessment) return;
    
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      try {
        await assessmentApi.delete(assessment.id, token);
        router.push('/dashboard/assessments');
      } catch (err: any) {
        console.error('Error deleting assessment:', err);
        setError(err.message || 'Failed to delete assessment');
      }
    }
  };

  const handleGenerateReport = async () => {
    if (!token || !assessment) return;
    
    try {
      setReportLoading(true);
      const report = await assessmentApi.generateReport(assessment.id, token);
      
      // Create a downloadable JSON file
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessment-report-${assessment.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error generating report:', err);
      setError(err.message || 'Failed to generate report');
    } finally {
      setReportLoading(false);
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock size={18} className="text-yellow-500" />;
      case 'REVIEWED':
        return <CheckCircle size={18} className="text-blue-500" />;
      default:
        return <AlertTriangle size={18} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!assessment && !loading) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4">
        Assessment not found
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/dashboard/assessments"
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Assessment Details</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-3">Assessment Overview</h2>
                <div className="flex items-center">
                  {getStatusIcon(assessment?.status)}
                  <span className="ml-1 text-sm capitalize">
                    {assessment?.status.replace('_', ' ').toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/dashboard/assessments/${assessment?.id}/edit`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                >
                  <Edit size={18} />
                </Link>
                <button
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  onClick={handleDeleteAssessment}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Contract Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contract Name</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.contract?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vendor</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.contract?.vendorName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.contract?.endDate 
                        ? new Date(assessment.contract.endDate).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Annual Value</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.contract?.annualValue 
                        ? `$${assessment.contract.annualValue.toLocaleString()}` 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/dashboard/contracts/${assessment?.contractId}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                  >
                    <FileText size={16} className="mr-1" />
                    View Full Contract
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Forecasting & Strategic Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Volume Change Forecasts</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.volumeChangeForecasts || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Additional Products</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.additionalProducts || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Redundant Products</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.redundantProducts || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Downgrade Potential</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.downgradePotential || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Preferred Contract Length</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.preferredContractLength 
                        ? `${assessment.preferredContractLength} months` 
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Flexibility</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.paymentFlexibility ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vendor Switch Willingness</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.vendorSwitchWillingness ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Niche Vendor</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {assessment?.isNicheVendor ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Ratings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Satisfaction Rating</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          size={20}
                          className={`${
                            rating <= (assessment?.satisfactionRating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {assessment?.satisfactionRating || 'Not rated'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Impact Rating</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          size={20}
                          className={`${
                            rating <= (assessment?.impactRating || 0)
                              ? 'text-blue-400 fill-blue-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {assessment?.impactRating || 'Not rated'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {assessment?.recommendations && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recommendations</h3>
                  <p className="text-base text-gray-900 dark:text-white whitespace-pre-line">
                    {assessment.recommendations}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assessment Details</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Assessor</p>
                <p className="text-base text-gray-900 dark:text-white">
                  {assessment?.assessor?.name || 'N/A'}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created</p>
                <p className="text-base text-gray-900 dark:text-white">
                  {assessment?.createdAt 
                    ? new Date(assessment.createdAt).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                <p className="text-base text-gray-900 dark:text-white">
                  {assessment?.updatedAt 
                    ? new Date(assessment.updatedAt).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
              <button
                onClick={handleGenerateReport}
                disabled={reportLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reportLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-2" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Product Usage</h2>
            </div>
            <div className="p-6">
              {assessment?.contract?.products && assessment.contract.products.length > 0 ? (
                <div>
                  {assessment.contract.products.map((product: any) => (
                    <div key={product.id} className="mb-6 last:mb-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{product.name}</p>
                      
                      {product.usageData ? (
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Active Users</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${product.usageData.activeUserPercent || 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1">{product.usageData.activeUserPercent || 0}%</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Feature Utilization</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-green-500 h-2.5 rounded-full" 
                                style={{ width: `${product.usageData.featureUtilization || 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1">{product.usageData.featureUtilization || 0}%</p>
                          </div>
                          
                          {product.usageData.usageFrequency && (
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Usage Frequency</p>
                              <p className="text-sm text-gray-900 dark:text-white">{product.usageData.usageFrequency}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No usage data available</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No products found for this contract</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
