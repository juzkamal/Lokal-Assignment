
import { useState, useEffect } from 'react';
import { fetchData } from './api';

const formatJobs = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true); 


  const loadData = async (pageNumber, isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchData(pageNumber);
      if (!response || !response.results || response.results.length === 0) {
        setHasMoreData(false); 
        return;
      }

      const newJobs = response.results
        .filter((item) => item.id) 
        .map((item) => ({
          id: item.id,
          title: item.title || 'No Title',
          place: item.primary_details?.Place || 'Not Available',
          salary: item.primary_details?.Salary || 'Unpaid',
          whatsapp_no: item.whatsapp_no || 'No WhatsApp Number',
          vacancies: item.openings_count || 'Not provided',
          job_hours: item.job_hours || 'Not provided',
          job_role: item.job_role || 'Not specified',
          img: item.creatives?.[0]?.file || 'N/A' 
        }));

      setData(isRefreshing ? newJobs : [...data, ...newJobs]);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleRefresh = () => {
    setHasMoreData(true); 
    loadData(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMoreData) {
      loadData(page + 1);
    }
  };

  return {
    data,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMoreData,
    handleRefresh,
    handleLoadMore,
  };
};

export default formatJobs;
