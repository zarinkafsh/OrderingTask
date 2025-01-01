export const fetcher = async (request: RequestInfo) => {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; 
  }
};