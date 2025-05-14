'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { contractApi, assessmentApi } from '@/lib/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Star } from 'lucide-react';

export default function NewAssessmentPage() {
  const { token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedContractId = searchParams.get('contractId');
  
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    contractId: preselectedContractId || '',
    volumeChangeForecasts: '',
    additionalProducts: '',
    redundantProducts: '',
    downgradePotential: '',
    preferredContractLength: '',
    paymentFlexibility: false,
    vendorSwitchWillingness: false,
    satisfactionRating: 0,
    impactRating: 0,
    isNicheVendor: false,
    recommendations: '',
    status: 'IN_PROGRESS'
  });

  useEffect(() => {
    const fetchContracts = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const data = await contractApi.getAll(token);
        setContracts(data);
      } catch (err: any) {
        console.error('Error fetching contracts:', err);
        setError(err.message || 'Failed to load contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('You must be logged in to create an assessment');
      return;
    }
    
    if (!formData.contractId) {
      setError('Please select a contract');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      const response = await assessmentApi.create(formData, token);
      
      // Redirect to the new assessment page
      router.push(`/dashboard/assessments/${response.assessment.id}`);
    } catch (err: any) {
      console.error('Error creating assessment:', err);
      setError(err.message || 'Failed to create assessment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/dashboard/assessments"
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">New Assessment</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contract Selection</h2>
            </div>
            <div className="p-6">
              <div>
                <label htmlFor="contractId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Contract *
                </label>
                <select
                  id="contractId"
                  name="contractId"
                  value={formData.contractId}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a contract</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.name} - {contract.vendorName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Forecasting & Strategic Review</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="volumeChangeForecasts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Volume Change Forecasts (next 2-3 years)
                  </label>
                  <textarea
                    id="volumeChangeForecasts"
                    name="volumeChangeForecasts"
                    value={formData.volumeChangeForecasts}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe expected changes in volume over the next 2-3 years"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="additionalProducts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Additional Products of Interest
                  </label>
                  <textarea
                    id="additionalProducts"
                    name="additionalProducts"
                    value={formData.additionalProducts}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="List any additional products that might be of interest"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="redundantProducts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Redundant Products
                  </label>
                  <textarea
                    id="redundantProducts"
                    name="redundantProducts"
                    value={formData.redundantProducts}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="List any products that are redundant or no longer needed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="downgradePotential" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Downgrade Potential
                  </label>
                  <textarea
                    id="downgradePotential"
                    name="downgradePotential"
                    value={formData.downgradePotential}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe any potential for downgrading licenses or services"
                  />
                </div>
                <div>
                  <label htmlFor="preferredContractLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Contract Length (months)
                  </label>
                  <input
                    type="number"
                    id="preferredContractLength"
                    name="preferredContractLength"
                    value={formData.preferredContractLength}
                    onChange={handleChange}
                    min="1"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="paymentFlexibility"
                    name="paymentFlexibility"
                    checked={formData.paymentFlexibility}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="paymentFlexibility" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Payment Flexibility Needed
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vendorSwitchWillingness"
                    name="vendorSwitchWillingness"
                    checked={formData.vendorSwitchWillingness}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="vendorSwitchWillingness" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Willing to Switch Vendors
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNicheVendor"
                    name="isNicheVendor"
                    checked={formData.isNicheVendor}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isNicheVendor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    This is a Niche Vendor
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ratings & Recommendations</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Satisfaction Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange('satisfactionRating', rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`${
                          rating <= formData.satisfactionRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        } hover:text-yellow-400 hover:fill-yellow-400 cursor-pointer`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {formData.satisfactionRating > 0 ? formData.satisfactionRating : 'Not rated'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Impact Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange('impactRating', rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`${
                          rating <= formData.impactRating
                            ? 'text-blue-400 fill-blue-400'
                            : 'text-gray-300 dark:text-gray-600'
                        } hover:text-blue-400 hover:fill-blue-400 cursor-pointer`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {formData.impactRating > 0 ? formData.impactRating : 'Not rated'}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="recommendations" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Recommendations
                </label>
                <textarea
                  id="recommendations"
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Provide recommendations for this contract"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assessment Status</h2>
            </div>
            <div className="p-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REVIEWED">Reviewed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard/assessments"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Assessment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
