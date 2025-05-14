'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { contractApi } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function NewContractPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Contract form state
  const [formData, setFormData] = useState({
    name: '',
    vendorName: '',
    contractNumber: '',
    startDate: '',
    endDate: '',
    annualValue: '',
    totalValue: '',
    duration: '',
    terminationNotice: '',
    autoRenewal: false,
    customerDefinition: '',
    geographicLimits: '',
    auditObligations: '',
    documentUrl: ''
  });
  
  // Products state
  const [products, setProducts] = useState([
    { name: '', quantity: '', unitPrice: '', discount: '', totalPrice: '' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value
    };
    
    // Calculate total price if quantity and unitPrice are provided
    if (name === 'quantity' || name === 'unitPrice' || name === 'discount') {
      const quantity = name === 'quantity' ? parseFloat(value) || 0 : parseFloat(updatedProducts[index].quantity) || 0;
      const unitPrice = name === 'unitPrice' ? parseFloat(value) || 0 : parseFloat(updatedProducts[index].unitPrice) || 0;
      const discount = name === 'discount' ? parseFloat(value) || 0 : parseFloat(updatedProducts[index].discount) || 0;
      
      const totalBeforeDiscount = quantity * unitPrice;
      const totalAfterDiscount = totalBeforeDiscount - (totalBeforeDiscount * (discount / 100));
      
      updatedProducts[index].totalPrice = totalAfterDiscount.toFixed(2);
    }
    
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { name: '', quantity: '', unitPrice: '', discount: '', totalPrice: '' }
    ]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('You must be logged in to create a contract');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Filter out empty products
      const validProducts = products.filter(product => 
        product.name && product.quantity && product.unitPrice && product.totalPrice
      );
      
      // Create contract with products
      const contractData = {
        ...formData,
        products: validProducts
      };
      
      const response = await contractApi.create(contractData, token);
      
      // Redirect to the new contract page
      router.push(`/dashboard/contracts/${response.contract.id}`);
    } catch (err: any) {
      console.error('Error creating contract:', err);
      setError(err.message || 'Failed to create contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/dashboard/contracts"
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">New Contract</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contract Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contract Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vendor Name *
                </label>
                <input
                  type="text"
                  id="vendorName"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="contractNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contract Number
                </label>
                <input
                  type="text"
                  id="contractNumber"
                  name="contractNumber"
                  value={formData.contractNumber}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (months) *
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="annualValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Annual Value ($) *
                </label>
                <input
                  type="number"
                  id="annualValue"
                  name="annualValue"
                  value={formData.annualValue}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="totalValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Value ($) *
                </label>
                <input
                  type="number"
                  id="totalValue"
                  name="totalValue"
                  value={formData.totalValue}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="terminationNotice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Termination Notice (days)
                </label>
                <input
                  type="number"
                  id="terminationNotice"
                  name="terminationNotice"
                  value={formData.terminationNotice}
                  onChange={handleChange}
                  min="0"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="documentUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document URL
                </label>
                <input
                  type="url"
                  id="documentUrl"
                  name="documentUrl"
                  value={formData.documentUrl}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  name="autoRenewal"
                  checked={formData.autoRenewal}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoRenewal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Auto Renewal
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="customerDefinition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Customer Definition
              </label>
              <textarea
                id="customerDefinition"
                name="customerDefinition"
                value={formData.customerDefinition}
                onChange={handleChange}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="geographicLimits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Geographic Limitations
              </label>
              <textarea
                id="geographicLimits"
                name="geographicLimits"
                value={formData.geographicLimits}
                onChange={handleChange}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="auditObligations" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Audit Obligations
              </label>
              <textarea
                id="auditObligations"
                name="auditObligations"
                value={formData.auditObligations}
                onChange={handleChange}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
            <button
              type="button"
              onClick={addProduct}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>
          <div className="p-6">
            {products.map((product, index) => (
              <div key={index} className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">Product {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <label htmlFor={`product-name-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id={`product-name-${index}`}
                      name="name"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, e)}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor={`product-quantity-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id={`product-quantity-${index}`}
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, e)}
                      min="1"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor={`product-unitPrice-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unit Price ($)
                    </label>
                    <input
                      type="number"
                      id={`product-unitPrice-${index}`}
                      name="unitPrice"
                      value={product.unitPrice}
                      onChange={(e) => handleProductChange(index, e)}
                      min="0"
                      step="0.01"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor={`product-discount-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      id={`product-discount-${index}`}
                      name="discount"
                      value={product.discount}
                      onChange={(e) => handleProductChange(index, e)}
                      min="0"
                      max="100"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor={`product-totalPrice-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Total Price ($)
                    </label>
                    <input
                      type="number"
                      id={`product-totalPrice-${index}`}
                      name="totalPrice"
                      value={product.totalPrice}
                      onChange={(e) => handleProductChange(index, e)}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white bg-gray-50 dark:bg-gray-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/dashboard/contracts"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Contract'}
          </button>
        </div>
      </form>
    </div>
  );
}
