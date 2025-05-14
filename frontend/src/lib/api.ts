// API client for the contract assessment application

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch function with authentication
const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Contract API
export const contractApi = {
  // Get all contracts
  getAll: (token: string) => 
    fetchWithAuth('/contracts', { method: 'GET' }, token),

  // Get contract by ID
  getById: (id: string, token: string) => 
    fetchWithAuth(`/contracts/${id}`, { method: 'GET' }, token),

  // Create contract
  create: (contractData: any, token: string) => 
    fetchWithAuth('/contracts', { 
      method: 'POST', 
      body: JSON.stringify(contractData) 
    }, token),

  // Update contract
  update: (id: string, contractData: any, token: string) => 
    fetchWithAuth(`/contracts/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(contractData) 
    }, token),

  // Delete contract
  delete: (id: string, token: string) => 
    fetchWithAuth(`/contracts/${id}`, { method: 'DELETE' }, token),

  // Get products for a contract
  getProducts: (contractId: string, token: string) => 
    fetchWithAuth(`/contracts/${contractId}/products`, { method: 'GET' }, token),

  // Add product to contract
  addProduct: (contractId: string, productData: any, token: string) => 
    fetchWithAuth(`/contracts/${contractId}/products`, { 
      method: 'POST', 
      body: JSON.stringify(productData) 
    }, token),
};

// Assessment API
export const assessmentApi = {
  // Get all assessments
  getAll: (token: string) => 
    fetchWithAuth('/assessments', { method: 'GET' }, token),

  // Get assessment by ID
  getById: (id: string, token: string) => 
    fetchWithAuth(`/assessments/${id}`, { method: 'GET' }, token),

  // Create assessment
  create: (assessmentData: any, token: string) => 
    fetchWithAuth('/assessments', { 
      method: 'POST', 
      body: JSON.stringify(assessmentData) 
    }, token),

  // Update assessment
  update: (id: string, assessmentData: any, token: string) => 
    fetchWithAuth(`/assessments/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(assessmentData) 
    }, token),

  // Delete assessment
  delete: (id: string, token: string) => 
    fetchWithAuth(`/assessments/${id}`, { method: 'DELETE' }, token),

  // Generate assessment report
  generateReport: (id: string, token: string) => 
    fetchWithAuth(`/assessments/${id}/report`, { method: 'GET' }, token),
};

// User API
export const userApi = {
  // Get user profile
  getProfile: (token: string) => 
    fetchWithAuth('/users/profile', { method: 'GET' }, token),

  // Get all users (admin only)
  getAll: (token: string) => 
    fetchWithAuth('/users', { method: 'GET' }, token),
};
