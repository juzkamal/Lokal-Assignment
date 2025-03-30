export const fetchData = async (page) => {
  const API_URL = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
};
