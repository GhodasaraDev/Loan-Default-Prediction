const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const normalizedBase = rawBaseUrl.replace(/\/+$/, '');
const BASE_URL = normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;

/**
 * Sends applicant data to FastAPI /predict endpoint.
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
export const predictLoanDefault = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server error (${response.status}): Unable to generate prediction.`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Prediction Error:', error);
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error(
        `Cannot connect to Backend API at "${BASE_URL}". ` +
        (rawBaseUrl.includes('localhost') 
          ? 'Make sure your FastAPI server is running: "uvicorn backend.main:app --reload --port 8000"'
          : 'Please check your deployed backend URL and ensure VITE_API_URL is configured in Vercel.')
      );
    }
    throw error;
  }
};

/**
 * Fetches model metadata and accuracy metrics from /model-info endpoint.
 * @returns {Promise<Object>}
 */
export const getModelInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/model-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch model information (${response.status}).`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Model Info Error:', error);
    throw error;
  }
};
