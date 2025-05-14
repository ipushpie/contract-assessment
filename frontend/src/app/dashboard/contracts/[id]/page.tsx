'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { contractApi, assessmentApi } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  FileText,
  BarChart,
  Plus
} from 'lucide-react';

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const [contract, setContract] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchContractData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const contractData = await contractApi.getById(params.id, token);
        setContract(contractData);
        
        // Fetch assessments for this contract
        const allAssessments = await assessmentApi.getAll(token);
        const contractAssessments = allAssessments.filter(
          (assessment: any) => assessment.contractId === params.id
        );
        setAssessments(contractAssessments);
      } catch (err: any) {
        console.error('Error fetching contract data:', err);
        setError(err.message || 'Failed to load contract data');
      } finally {
        setLoading(false);
      }
    };

    fetchContractData();
  }, [token, params.id]);

  const handleDeleteContract = async () => {
    if (!token || !contract) return;
    
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await contractApi.delete(contract.id, token);
        router.push('/dashboard/contracts');
      } catch (err: any) {
        console.error('Error deleting contract:', err);
        setError(err.message || 'Failed to delete contract');
      }
    }
  };

  // Get contract status
  const getContractStatus = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { 
        status: 'expired', 
        icon: <AlertTriangle size={18} className="text-red-500" />,
        message: 'This contract has expired.',
        color: 'text-red-500'
      };
    } else if (diffDays <= 90) {
      return { 
        status: 'expiring soon', 
        icon: <Clock size={18} className="text-yellow-500" />,
        message: `This contract will expire in ${diffDays} days.`,
        color: 'text-yellow-500'
      };
    } else {
      return { 
        status: 'active', 
        icon: <CheckCircle size={18} className="text-green-500" />,
        message: `This contract is active for ${diffDays} more days.`,
        color: 'text-green-500'
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!contract && !loading) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4">
        Contract not found
      </div>
    );
  }

  const statusInfo = contract ? getContractStatus(contract.endDate) : null;

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/dashboard/contracts"
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">{contract?.name}</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      {statusInfo && (
        <div className="flex items-center mb-6">
          {statusInfo.icon}
          <span className={`ml-2 ${statusInfo.color}`}>{statusInfo.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contract Details</h2>
              <div className="flex space-x-2">
                <Link
                  href={`/dashboard/contracts/${contract?.id}/edit`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                >
                  <Edit size={18} />
                </Link>
                <button
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  onClick={handleDeleteContract}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vendor</p>
                  <p className="text-base text-gray-900 dark:text-white">{contract?.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contract Number</p>
                  <p className="text-base text-gray-900 dark:text-white">{contract?.contractNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {new Date(contract?.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {new Date(contract?.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Annual Value</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    ${contract?.annualValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Value</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    ${contract?.totalValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {contract?.duration} months
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Auto Renewal</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {contract?.autoRenewal ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Termination Notice</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {contract?.terminationNotice ? `${contract.terminationNotice} days` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created By</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {contract?.createdBy?.name || 'N/A'}
                  </p>
                </div>
              </div>

              {contract?.customerDefinition && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Customer Definition</p>
                  <p className="text-base text-gray-900 dark:text-white">{contract.customerDefinition}</p>
                </div>
              )}

              {contract?.geographicLimits && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Geographic Limitations</p>
                  <p className="text-base text-gray-900 dark:text-white">{contract.geographicLimits}</p>
                </div>
              )}

              {contract?.auditObligations && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Audit Obligations</p>
                  <p className="text-base text-gray-900 dark:text-white">{contract.auditObligations}</p>
                </div>
              )}

              {contract?.documentUrl && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contract Document</p>
                  <a
                    href={contract.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <FileText size={16} className="mr-1" />
                    View Document
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
              <Link
                href={`/dashboard/contracts/${contract?.id}/products/new`}
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus size={16} />
                Add Product
              </Link>
            </div>
            <div className="p-6">
              {contract?.products && contract.products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {contract.products.map((product: any) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {product.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {product.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            ${product.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            ${product.totalPrice.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No products found for this contract.</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assessments</h2>
              <Link
                href={`/dashboard/assessments/new?contractId=${contract?.id}`}
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus size={16} />
                New Assessment
              </Link>
            </div>
            <div className="p-6">
              {assessments.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {assessments.map((assessment) => (
                    <li key={assessment.id} className="py-4">
                      <Link
                        href={`/dashboard/assessments/${assessment.id}`}
                        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md -mx-2"
                      >
                        <BarChart size={18} className="text-indigo-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Assessment {new Date(assessment.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Status: {assessment.status.replace('_', ' ').toLowerCase()}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No assessments yet</p>
                  <Link
                    href={`/dashboard/assessments/new?contractId=${contract?.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <BarChart size={16} className="mr-2" />
                    Create Assessment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
