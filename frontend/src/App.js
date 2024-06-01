import React, { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ScrapeForm from './components/ScrapeForm';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import CompanySpace from './components/CompanySpace';

const App = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  return (
    <Box p={4}>
      <Heading mb={4}>Web Scraper App</Heading>
      <ScrapeForm onScrape={(data) => console.log(data)} />
      <CompanyList onSelectCompany={setSelectedCompanyId} />
      <CompanySpace />

      {selectedCompanyId && <CompanyDetails companyId={selectedCompanyId} />}
    </Box>
  );
};

export default App;
