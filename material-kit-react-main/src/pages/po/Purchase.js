

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Typography,
  TablePagination,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

const token = localStorage.getItem('token');


const UserPage = () => {
  // const { purchaseId } = useParams();
  const [orders, setOrders] = useState([]);
  const { status, setStatus } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  const { setPurchaseId,apiUrl,purchaseId} = useAuthContext();
  const navigate=useNavigate()

console.log(token)
  useEffect(() => {
    const fetchData = async (e) => {
      // e.preventDefault()
      try {
        // const apiToken = '140|cfoU9tEY6laZlTuD0NvfCEpyRPEcu5PEdVTYRVCD'
        // const apiUrl = `https://dev.techstreet.in/vmsglen/public/api/orders?status=${status}`; // Construct the dynamic API URL
        // const apiUrl = `${apiUrl}/orders?status=${status}`; // Construct the dynamic API URL
        const response = await axios.get(`${apiUrl}/orders?status=${status}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            search: searchTerm,
            
          },
        });
        // setPurchaseId(()=>{
        //   response.data.data[0].id
        //  })

        setOrders(response.data.data);
        console.log(response.data.data)
        // setTotalPages(response.data.last_page);
      
        //  setPurchaseId(response.data.data[0].id);
       
        //  console.log(purchaseId)
        // console.log(response.data.data.id);
        // console.log(response.data.data)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [status,
      currentPage,
      searchTerm, setPurchaseId]);

  const handlePageChange = (event, newPage) => {
    // console.log(newPage)
    setCurrentPage(newPage);
    // const orderID = orders[id];
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

const handleId=(item)=>{
  console.log(item)
  setPurchaseId(item.id)
  localStorage.setItem('purchaseId', item.id);
 
}

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {status}
      </Typography>
      {/* search */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        halfWidth
        margin="normal"
        align="right"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Purchase Order Id</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Total Products</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Issued</TableCell>
              <TableCell>Valid</TableCell>
            </TableRow>
          </TableHead>
          {/* body */}
          <TableBody>
            {orders.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {/* {item.location_id} */}
                      <div
                      // className={classes.iconContainer}
                      // onClick={()=>{
                      //  purchaseId(item.id)
                      //   localStorage.setItem('purchaseid',item.id)
                      //   console.log()
                      //   navigate(`/dashboard/purchase/product`);
                      // }}
                      >
                        
                         {/* <Link to={`/dashboard/purchase/product/${purchaseId}/${purchaseId}`}> */}
                         <Link
  onClick={(e) => {
    e.preventDefault();
    handleId(item);
    navigate(`/dashboard/purchase/schedule/monthly`); // Correct the URL to monthly
  }}
>
                    <CalendarMonthIcon />
                  </Link>
                  <Link
                    // to={`/dashboard/purchase/product`}
                    onClick={(e) => {
                       e.preventDefault();
                      handleId(item);
                      navigate(`/dashboard/purchase/product`);
                      
                    }}
                  >
                    <RadioButtonCheckedIcon />
                  </Link>
                </div>
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: '150px' }}>
                <Link
                  // to={`/dashboard/purchase/product`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/dashboard/purchase/product`);
                    handleId(item);
                  }}
                >
                  {item.oid}
                </Link>
</TableCell>

                    <TableCell component="th" scope="row">
                      {item.company_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.total_products}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.total_amount}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.issue_date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.validity}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="secondary" />
      </div>
    </Container>
  );
};
export default UserPage;
