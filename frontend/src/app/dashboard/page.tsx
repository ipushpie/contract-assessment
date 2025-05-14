'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { contractApi, assessmentApi } from '@/lib/api';
import Link from 'next/link';
import { 
  FileText, 
  BarChart, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        
        // Fetch contracts and assessments in parallel
        const [contractsData, assessmentsData] = await Promise.all([
          contractApi.getAll(token),
          assessmentApi.getAll(token)
        ]);
        
        setContracts(contractsData);
        setAssessments(assessmentsData);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Calculate dashboard metrics
  const expiringContracts = contracts.filter(contract => {
    const endDate = new Date(contract.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  });

  const expiredContracts = contracts.filter(contract => {
    const endDate = new Date(contract.endDate);
    const today = new Date();
    return endDate < today;
  });

  const pendingAssessments = assessments.filter(
    assessment => assessment.status === 'IN_PROGRESS'
  );

  const completedAssessments = assessments.filter(
    assessment => assessment.status === 'COMPLETED' || assessment.status === 'REVIEWED'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Contracts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{contracts.length}</p>
            </div>
          </div>
        </div>
        
        {/* Expiring Contracts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiringContracts.length}</p>
            </div>
          </div>
        </div>
        
        {/* Expired Contracts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 mr-4">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expired</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiredContracts.length}</p>
            </div>
          </div>
        </div>
        
        {/* Assessments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
              <BarChart size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Assessments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assessments.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Contracts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contracts Expiring Soon</h2>
          </div>
          <div className="p-6">
            {expiringContracts.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {expiringContracts.slice(0, 5).map((contract) => {
                  const endDate = new Date(contract.endDate);
                  const today = new Date();
                  const diffTime = endDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  return (
                    <li key={contract.id} className="py-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{contract.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{contract.vendorName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                            Expires in {diffDays} days
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(contract.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No contracts expiring soon.</p>
            )}
            
            {expiringContracts.length > 0 && (
              <div className="mt-4">
                <Link
                  href="/dashboard/contracts"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  View all expiring contracts <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Pending Assessments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Assessments</h2>
          </div>
          <div className="p-6">
            {pendingAssessments.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {pendingAssessments.slice(0, 5).map((assessment) => (
                  <li key={assessment.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {assessment.contract.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {assessment.contract.vendorName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          In Progress
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(assessment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No pending assessments.</p>
            )}
            
            {pendingAssessments.length > 0 && (
              <div className="mt-4">
                <Link
                  href="/dashboard/assessments"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  View all assessments <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
