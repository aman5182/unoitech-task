import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

const CompanyList = ({ onSelectCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await axios.get("http://localhost:5000/companies");
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
    await axios.delete("http://localhost:5000/companies", {
      data: { ids: selected },
    });
    fetchCompanies();
    setSelected([]);
  };

  return (
    <Box overflowX="auto" p={4}>
      <Button
        colorScheme="red"
        onClick={handleDelete}
        isDisabled={!selected.length}
        mb={4}
      >
        Delete Selected
      </Button>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Logo</Th>
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
                <Checkbox
                  isChecked={selected.includes(company._id)}
                  onChange={() => handleSelect(company._id)}
                />
              </Td>
              <Td>
                <Image
                  src={company.logo}
                  alt={company.name}
                  boxSize={["20px", "30px", "40px"]}
                  objectFit="contain"
                />
              </Td>
              <Td fontSize={["sm", "md", "lg"]}> <Text
                  noOfLines={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  width={["70px", "70px", "110px"]} // Adjust width as needed
                >
                  {company.description}
                </Text></Td>
              <Td fontSize={["sm", "md", "lg"]}>
                <Text
                  noOfLines={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  width={["150px", "200px", "350px"]} // Adjust width as needed
                >
                  {company.description}
                </Text>
              </Td>
              <Td fontSize={["sm", "md", "lg"]}>United States of America</Td>
              <Td fontSize={["sm", "md", "lg"]} color="blue.500">
                contact@gmail.com
              </Td>
              <Td fontSize={["sm", "md", "lg"]} color="blue.500">
                51-585858
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompanyList;
