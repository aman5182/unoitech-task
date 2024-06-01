import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faTwitter, faInstagram, faFacebook } from '@fortawesome/free-solid-svg-icons';


const CompanyDetails = ({ companyId }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompanyDetails();
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/companies/${companyId}`);
      setCompany(response.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  if (!company) return <Box>Loading...</Box>;

  return (
    <div>
      <div style={{ height: '150px', width: '100%', float: 'left',backgroundColor:'#d9d9d9' }}>
        <div style={{ height: '150px', width: '50%', float: 'left' }}>
          <div style={{ height: '150px', width: '25%', float: 'left' }}>
            <Image src={company.logo} alt={company.name} height="80px" width="auto" />
          </div>
          <div style={{ height: '150px', width: '25%', float: 'left' }}>
          <p>{company.description.substring(0, 60)}</p>

          </div>
        </div>
        <div style={{ height: '100px', width: '50%', float: 'left' }}>
  <p style={{color: 'blue'}}><FontAwesomeIcon icon={faPhone} /> Phone :</p>
  <p> 51515151</p>
  <p style={{color: 'blue'}}><FontAwesomeIcon icon={faEnvelope} /> Email : </p>
  <p> contact@gmail.com</p>
</div>

      </div>

      <div>
        <div style={{ height: 'auto', width: '100%', float: 'left' }}>
        <div  style={{ height: 'auto', width: '30%', float: 'left',backgroundColor:'#d9d9d9' }}>
        <div >
            <h1 style={{ textAlign: 'center' ,fontWeight: 'bold'}}>Company Details</h1>
            <p style={{marginTop:'30px',marginLeft:'30px'}}>description : </p>
            <p style={{marginLeft:'30px'}}>{company.description}</p>

            

            <p style={{marginTop:'30px',marginLeft:'30px'}}> Facebook : </p>
            <p style={{color: 'blue',marginLeft:'30px'}}>https://www.facebook.com/</p>

            <p style={{marginTop:'30px',marginLeft:'30px'}}>LinkedIn : </p>
            <p style={{color: 'blue',marginLeft:'30px'}}>https://www.linkedIn.com/</p>

            <p style={{marginTop:'30px',marginLeft:'30px'}}>Twitter : </p>
            <p style={{color: 'blue',marginLeft:'30px'}}>https://www.twitter.com/</p>

            <p style={{marginTop:'30px',marginLeft:'30px'}}>Instagram : </p>
            <p style={{color: 'blue',marginLeft:'30px'}}>https://www.instagram.com/</p>

            <p style={{marginTop:'30px',marginLeft:'30px'}}>Address : </p>
            <p style={{color: 'blue',marginLeft:'30px'}}>United States of America</p>
          </div>
        </div>
         
          <div style={{ height: 'auto', width: '70%', float: 'left' }}>
            <Image src={`data:image/png;base64,${company.screenshot}`} alt={`${company.name} screenshot`} width="100%" height="auto" objectFit="contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
