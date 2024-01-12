

// chatgpt 

import { Typography, Card, Button,Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,



    


    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,


  TablePagination } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';
import { Footer } from '../Footer';
import './index.css'



const token = localStorage.getItem("token");

export const Subpurchase = () => {
  const [products, setProducts] = useState([]);
  const [storedPurchaseId, setStoredPurchaseId] = useState(null);
  const [lineItem,setLineItem]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [drnlist,setDrnList]=useState([])
  const [purchaseDataVisible, setPurchaseDataVisible] = useState(false);
const [drnDataVisible, setDrnDataVisible] = useState(true);

  const [dataVisible, setDataVisible] = useState(false);
  const [drnVisible, setDrnVisible] = useState(true);
  const navigate=useNavigate()
  const {orders,setOrders,setPurchaseData,apiUrl,purchaseId,setPurchaseId}=useAuthContext()
 

  const itemsPerPage = 10;
 
console.log(purchaseId)
useEffect(() => {
  if (!localStorage.getItem('token')) {
    // Redirect to the login page if the token is not present
    navigate('/login');
  } else {
    const storedId = localStorage.getItem('purchaseId');
    setPurchaseId(storedId); // Update context purchaseId with the stored value

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/orders/${storedId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            search: searchTerm,
            per_page: itemsPerPage,
          },
        });

        if (!response.data) {
          throw new Error('No data received');
        }

        const companyName = response.data.data;
        setProducts([companyName]);
        setLineItem(response.data.data.line_items);
        setDrnList(response.data.data.deliveries);

     

        localStorage.setItem('purchaseData', JSON.stringify([companyName]));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
}, [apiUrl, token, setPurchaseId, currentPage, searchTerm]);

  // useEffect(() => {
  //   if (drnlist && drnlist.length > 0) {
  //     const totalPages = Math.ceil(drnlist.length / itemsPerPage);
  //     setTotalPages(totalPages);
  //   } else {
  //     setTotalPages(1);
  //   }
  // }, [drnlist]);
  
//   drn search
const handlePageChange = (event, newPage) => {
    // console.log(newPage)
    setCurrentPage(newPage);
    // fetchData(newPage);
    
  };

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const finalTotal = lineItem.reduce(
    (total, item) => total + parseFloat(item.total_price),
    0
  ).toFixed(2);
  
// const handlePurchaseDataOpen=()=>{
//   setPurchaseData(true)
// }
// const handlePurchaseDataClose=()=>{
//   setPurchaseData(false)
// }


//   const handleShowData = () => {
//     setDataVisible(true);
//   };
//   const handleClose = () => {
//     setDataVisible(false);
//   };

const handlePurchaseDataOpen = () => {
  setPurchaseDataVisible(true);
};

const handlePurchaseDataClose = () => {
  setPurchaseDataVisible(false);
};

const handleShowData = () => {
  setDataVisible(true);
};

const handleClose = () => {
  setDataVisible(false);
};

  const handleEyeIconClick = useCallback((drn_id, deliveryId) => {
    // Find the specific delivery based on drn_id
    const selectedDelivery = drnlist.find((item) => item.drn_id === drn_id);
  
    // Set the purchaseId in local storage
    // localStorage.setItem('purchaseId', deliveryId);
  // console.log(deliveryId)
    // Update the context purchaseId
    // setPurchaseId(deliveryId);

  
    // Store the selectedDelivery in local storage
    localStorage.setItem('deliveryId', JSON.stringify(deliveryId));
  
    // Navigate to the drn-detail page
    navigate('/dashboard/subpurchase/drnlist/drn-detail');
  }, [drnlist, setPurchaseId, navigate]);

  // ... rest of your component ...

  // console.log(purchaseId)

  return (
    <>
        <Typography variant="h4" gutterBottom
        style={{
          marginLeft:'30px',
          marginBottom:'30px'
        }}
        >
        Purchase Overview
          </Typography>
    <Card
    id='cardrowfor8div'
    style={{
      width:'95%',
      height:"auto",
      marginLeft:'25px',
     // border:"1px solid lightblue",
    }}
    >
      <Typography variant="h4" gutterBottom >
        {products.length > 0 && (
          products.map((item, index) => (

      <div>

            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', 
            width: "25%" ,marginTop:'30px',marginLeft:"20px",marginBottom:'20px'
          }}>
              <h4
              style={{
                // margin:'auto'
              }}
              >{item.company_name}</h4>
              <h6 style={{ color: '#18dcff',marginTop:'5px' }}><VerifiedIcon /></h6>
            </div>
        
        <h4
        style={{
          marginTop:'8px',marginLeft:"20px"
        }}
        >
{/* {item.title} */}
Test
        </h4>
        <div className='container'
  style={{

  }}
>


{/* 1st row */}

<div className='row  ' style={{display:'flex'}} >
  {/* 1st */}
  <div className="col-sm-3 me-3 " 
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      // display: 'flex',
      // flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#e2e8f0',
      color:'#061B64'
    }}
  >
  <p style={{color:'#061B64'}}>{item.oid}</p>
    <p style={{ color:'#061B64', fontSize: '12px', margin: '-10px 0px 0px 0px' }}>Purchase Order Id</p>
  </div>
  {/* 2nd */}
  <div className="col-sm-3 me-3"
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#D0F2FF',
      color:'#061B64'
    }}
  >
   <p style={{ textAlign: 'center' }}>{item.subsidiary_name}</p>
    <p style={{ color:'#061B64', fontSize: '12px', textAlign: 'center', marginTop: '-15px' }}>Subsidiary</p>
  </div>
  {/* 3rd */}
  <div className="col-sm-3 me-3"
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#FFF7CD',
      color:'#7A4F01'
    }}
  >
    <p> {item.location_name}</p>
    <p style={{color:'#7A4F01', fontSize: '12px', marginTop: '-15px' }}>Location</p>
  </div>
  {/* 4th */}
  <div className="col-sm-2  "
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#FFE7D9',
      color:'#7A0C2E',
    }}
  >
    <p> {item.total_products}</p>
    <p style={{ color: 'gray', fontSize: '12px', marginTop: '-15px' }}>Products</p>
  </div>
</div>

{/* 2nd row */}
<div className='row mt-3 mb-3 ' style={{display:'flex'}}>
  {/* 1st */}
  <div className="col-sm-3 me-3 "
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      // display: 'flex',
      // flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#2ecc71',
      color:'white'
    }}
  >
    <p> {item.total_amount}</p>
    <p style={{   color:'white', fontSize: '12px', marginTop: '-15px' }}>Total Amount</p>
  </div>
  {/* 2nd */}
  <div className="col-sm-3 me-3"
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      color:'#7A0C2E',
      backgroundColor:'#FFE7D9'
    }}
  >
    <p> {item.issue_date}</p>
    <p style={{   color:'#7A0C2E', fontSize: '12px', marginTop: '-15px' }}>Issued</p>
  </div>
  {/* 3rd */}
  <div className="col-sm-3 me-3"
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#95a5a6',
      color:'white'
    }}
  >
    <p> {item.validity}</p>
    <p style={{color:'white', fontSize: '12px', marginTop: '-15px' }}>Validity</p>
  </div>
  {/* 4th */}
  <div className="col-sm-2  "
  style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      // margin: '0 20px 0 20px',
      
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#e2e8f0',
      color:'#061B64'
    }}
  >
    <p>{item.status}</p>
    <p style={{ color:'#061B64', fontSize: '12px', marginTop: '-15px' }}>Status</p>
  </div>
</div>
  {/* all 8 div */}
  {/* 1 */}
  
  
</div>

</div>
    
          ))
        )}
      </Typography>
    </Card>
   {/* purchase order card */}

    <Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

      <div
      style={{
        width:'95%',
        display:'flex',
    justifyContent:'space-between',
margin:'15px 25px 15px 25px'
      }}
      >
<h4
style={{
  fontFamily:'sans-serif,Public Sans'
}}
>Purchase Orders</h4>
{/* drn btn */}
<Link to={`/dashboard/profile/DRN/create`}><Button
>Create DRN</Button></Link>

</div>
{/* tablediv */}
<div
        style={{
          margin: '15px 25px 15px 25px',
          maxWidth: '1500px',
          overflowX: 'auto',
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* ... Your table header cells */}
              </TableRow>
            </TableHead>
            <TableBody>
              <div
                style={{
                  display: 'flex',
                  width: '120px',
                  justifyContent: 'space-around',
                  marginTop: '20px',
                }}
              >   
                <Button
  variant="contained"
  color="primary"
  onClick={handlePurchaseDataOpen}
>
  {purchaseDataVisible ? 'Hide Data' : 'Show Data'}
</Button>

              </div>

              {lineItem.map((item, index) => (
                <TableRow key={item.id}>
                  {/* ... Your table body cells */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
         
        </TableContainer>
      </div>

      {/* Dialog to show data */}
      
      <Dialog open={purchaseDataVisible} onClose={handlePurchaseDataClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <h4>Purchase Order</h4>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >S No.</TableCell>
            <TableCell >Product Code </TableCell>
            <TableCell >Product Name</TableCell>
            <TableCell >Remark</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >GST(%) </TableCell>
            <TableCell >Ordered Qty</TableCell>
            <TableCell >Delivered Qty</TableCell>
            <TableCell >Pending Qty </TableCell>
            <TableCell >Total Amount</TableCell>
            <TableCell > Schedule</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineItem.map((item, index) => (
                  <TableRow key={item.id}>
                    {/* ... Your table body cells */}
                    <TableCell>{index+1}</TableCell>
      <TableCell>{item.product_code}</TableCell>
      <TableCell>{item.product_name}</TableCell>
      <TableCell>{item.remark}</TableCell>
      <TableCell>{item.product_price}</TableCell>
      <TableCell>{item.gst}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.quantityInvoiced}</TableCell>
      <TableCell>{item.outstandingQuantity}</TableCell>
      <TableCell>{item.total_price}</TableCell>
      <TableCell>{item.schedule}</TableCell>  
                  </TableRow>
                ))}
                 {dataVisible && (
                <TableRow>
                  <TableCell colSpan={10} align="right">
                    <h5>Final Total:</h5>
                  </TableCell>
                  <TableCell><strong>{finalTotal}</strong></TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

   
    </Card>

    {/* drn list card */}
    <Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

<div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 25px 15px 25px' }}>
  <h4 style={{ fontFamily: 'sans-serif,Public Sans', marginTop: '25px' }}>DRN List</h4>
  {/* drn search */}
  <div style={{ marginLeft: '30px', marginBottom: '30px' }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleShowData}
      style={{
        marginTop:'25px'
      }}
    >
      {dataVisible ? 'Hide Data' : 'Show DRN'}
    </Button>
  </div>
</div>

{/* tablediv */}
<Dialog open={dataVisible} onClose={handleClose} fullWidth maxWidth="lg">
<div style={{ display: 'flex',justifyContent:'space-between',width:'100%' }}>
        <DialogTitle style={{
          marginTop:'10px'
        }}>
          <h4>Drn List</h4>
        </DialogTitle>
        <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '20%',marginRight:'25px',marginTop:'20px' }}
        margin="normal"
        align="right"
      />
      </div>
        <DialogContent>
<div
style={{
  margin:'15px 25px 15px 25px',
  maxHeight: '500px', overflow: 'auto'
}}
>
<TableContainer component={Paper}

>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Action </TableCell>
            <TableCell >DRN No</TableCell>
            <TableCell >DRN Date </TableCell>
            <TableCell >No. of Products</TableCell>
            <TableCell >Total Amount</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <div style={{display:'flex'  , width:'120px',
            // border:'2px solid red'
            justifyContent:'space-around',
        marginTop:'20px'}}>
            <p
              style={{
             
              }}
            >  {drnVisible ? "Hide Data" : "Show Data"}</p>
        <KeyboardArrowDownIcon
  variant="contained"
  color="primary"
  onClick={() => setDrnVisible(!drnVisible)}

>
  {drnVisible ? "Hide Data" : "Show Data"}
</KeyboardArrowDownIcon>
            </div>
  {drnVisible &&drnlist.map((item,index) => (
    <TableRow key={item.id}>
      <TableCell>{index+1}</TableCell>
      {/* action */}
      {/* icon */}
      <div
      style={{
        display:'flex'
      }}
      >
      <TableCell
      ><RemoveRedEyeIcon
      style={{
      color:'#3498db',
      fontSize:'30px', cursor:'pointer'
      }}
      onClick={()=>{
         handleEyeIconClick(item.drn_id, item.id)
      
      }}
      /></TableCell>
      <TableCell
      ><DescriptionIcon
      style={{
        color:'#e74c3c' ,
        fontSize:'30px',
        cursor:'pointer'
              }}/></TableCell>
      </div>
      <TableCell>{item.drn_id}</TableCell>
      <TableCell>{item.created_at}</TableCell> 
         <TableCell>{item.total_products}</TableCell>
      <TableCell>{item.total_delivery_price}</TableCell>
      <TableCell>{item.status}</TableCell>
    </TableRow>
  ))}

  {/* total amount */}
  
  {/* <div>
    <h5>
      Final Total :{item.}
    </h5>
  </div> */}
</TableBody>

        </Table>
       
        </TableContainer>
        
        {/* pagination for drn list  */}
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      > 
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
     </div> 
     
</div>
</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>

{/* Activities */}
<Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

<h4
style={{
  fontFamily:'sans-serif,Public Sans',margin:'15px 25px 15px 25px'
}}
>Activities</h4>


{/* tablediv */}
<div
style={{
  margin:'15px 25px 15px 25px',
  maxHeight: '300px', overflow: 'auto'
}}
>
<TableContainer component={Paper}

>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Subject </TableCell>
            <TableCell >Action</TableCell>
            <TableCell >Remark</TableCell>
            <TableCell >ActionBy</TableCell>
            <TableCell >Date </TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>

<TableRow>
<div
 style={{
   textAlign:'center',
   marginLeft:'100%',
   marginTop:'20px',
//    border:'2px solid red',
   width:'100%'
}}
  >
    <p
   
    >Activities not found!</p>
  </div>
</TableRow>
</TableBody>
        </Table>
               </TableContainer>
</div>
    </Card>
    {/* footer  */}
<Footer/>
    </>
  );
};

