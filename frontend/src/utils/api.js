const API_URL = import.meta.env.VITE_API_URL;

export const fetchLogs = async (params) => {
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams(params);
  
  const response = await fetch(${API_URL}/api/logs?${queryParams}, {
    headers: {
      Authorization: Bearer ${token}
    }
  });

  if (!response.ok) throw new Error('Failed to fetch logs');
  return response.json();
};

export const deleteLog = async (logId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(${API_URL}/api/logs/${logId}, {
    method: 'DELETE',
    headers: {
      Authorization: Bearer ${token}
    }
  });

  if (!response.ok) throw new Error('Failed to delete log');
  return response.json();
};

export const exportLogs = async (format) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(${API_URL}/api/logs/export?format=${format}, {
    headers: {
      Authorization: Bearer ${token}
    }
  });

  if (!response.ok) throw new Error('Failed to export logs');
  return response.blob();
};
