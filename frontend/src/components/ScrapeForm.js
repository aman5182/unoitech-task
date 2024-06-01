//ScrapeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Box } from '@chakra-ui/react';

const ScrapeForm = () => {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState(null);
  const [companies, setCompanies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/scrape', { url });
    //   onScrape(response.data);
      setScrapedData(response.data);
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await axios.get('http://localhost:5000/companies');
    setCompanies(response.data);
    console.log('data hai ',response.data)
  };

  const jsonToCSV = (jsonData) => {
    const csvRows = [];
    const headers = Object.keys(jsonData[0]);
    csvRows.push(headers.join(','));

    for (const row of jsonData) {
      const values = headers.map(header => {
        const escape = (val) => ('' + val).replace(/"/g, '\\"');
        return `"${escape(row[header] || '')}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  const handleSaveDetails = () => {
    if (companies.length > 0) {
      const csvData = jsonToCSV(companies);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', 'companies.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn('No company data available to save.');
    }
  };


  return (
    <Box as="form" onSubmit={handleSubmit} mb={2}>
      <Input style={{ width: '250px' }}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter domain name"
        required
        mb={2}
      />
      <Button type="button" onClick={handleSaveDetails} style={{ margin: '20px', backgroundColor:'#ccccff' }}>Save Details</Button>
      <br />
      <Button type="submit" colorScheme="teal">Scrape</Button>
    </Box>
  );
};

export default ScrapeForm;
