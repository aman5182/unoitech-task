import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, Link } from '@chakra-ui/react';

const CompanyDetails = ({ companyId }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompanyDetails();
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    const response = await axios.get(`http://localhost:5000/companies/${companyId}`);
    setCompany(response.data);
  };

  if (!company) return <Box>Loading...</Box>;

  return (
    <Box>
      <Text fontSize="2xl">{company.name}</Text>
      <Text>{company.description}</Text>
      <Image src={`data:image/png;base64,${company.screenshot}`} alt={`${company.name} screenshot`} />
      <Text>Address: {company.address}</Text>
      <Text>Phone: {company.phone}</Text>
      <Text>Email: {company.email}</Text>
      <Text>Facebook: <Link href={company.facebook} isExternal>{company.facebook}</Link></Text>
      <Text>LinkedIn: <Link href={company.linkedin} isExternal>{company.linkedin}</Link></Text>
      <Text>Twitter: <Link href={company.twitter} isExternal>{company.twitter}</Link></Text>
      <Text>Instagram: <Link href={company.instagram} isExternal>{company.instagram}</Link></Text>
    </Box>
  );
};

export default CompanyDetails;
