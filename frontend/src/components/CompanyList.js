import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Button, Box , Image} from '@chakra-ui/react';

const CompanyList = ({ onSelectCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await axios.get('http://localhost:5000/companies');
    setCompanies(response.data);
  };

  const handleSelect = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = async () => {
    await axios.delete('http://localhost:5000/companies', { data: { ids: selected } });
    fetchCompanies();
    setSelected([]);
  };



  

  return (
    <Box>
      <Button colorScheme="red" onClick={handleDelete} isDisabled={!selected.length} mb={4}>
        Delete Selected
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Company</Th>     {/*  show logo */}
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Address</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
       
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company) => (
            <Tr key={company._id} onClick={() => onSelectCompany(company._id)}>
              <Td>
                <Checkbox isChecked={selected.includes(company._id)} onChange={() => handleSelect(company._id)} />
              </Td>
              <Td><Image src={company.logo} alt={company.name} boxSize="30px" objectFit="contain" /></Td> {/* Show logo */}
              <Td>{company.name}</Td>
              <Td>{company.description}</Td>
              <Td>united state america</Td>
              <Td>contact@gmail.com</Td>
              <Td>51-585858</Td>
            
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompanyList;
