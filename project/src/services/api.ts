const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function saveLead(email: string, inputs: any, results: any) {
  // For development - skip actual API call
  return new Promise((resolve) => {
    console.log('Saving lead:', { email, inputs, results });
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
  
  // Original implementation
  /*
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        inputs,
        results,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
  */
}