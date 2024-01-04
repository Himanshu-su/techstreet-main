import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './index.css'
import { Token } from '@mui/icons-material';

const token = localStorage.getItem("token")

export const Drndetail = () => {

     const [products, setProducts] = useState([]);
    const { purchaseId,setPurchaseId } = useAuthContext();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [lineItem,setLineItem]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
const [activity,setActivty]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate=useNavigate()
    const {orders,setOrders,setPurchaseData,apiUrl}=useAuthContext()
    const itemsPerPage = 10;
    // const [lineItem,setLineItem]=useState([])
    const localLineItem=JSON.parse(localStorage.getItem('purchaseData'))
    const deliveryId=localStorage.getItem('deliveryId')
    console.log(deliveryId)
// const lineItem=localLineItem[0].line_items
  // console.log(lineItem)   
// s 
    const storedPurchaseData = JSON.parse(localStorage.getItem('selectedDelivery')) || [];
    const arrayStorePurchaseData=[storedPurchaseData]
 console.log('data',arrayStorePurchaseData)
    // const storedPurchaseDataDeliveries=storedPurchaseData[0].deliveries
   console.log("activity",activity)
console.log("products",products)
  console.log("lineItem",lineItem)
  console.log('purchaseId',purchaseId)
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        // Redirect to the login page if the token is not present
        navigate('/login')}
        else{
      const fetchData = async (currentPage) => {
        try {
          const storedPurchaseId = localStorage.getItem('purchaseId');

          // Save data to local storage
  
  
  // Retrieve data from local storage
  
          if (storedPurchaseId) {
        
            setPurchaseId(storedPurchaseId);
            // console.log(purchaseId)
          }
          // setLineItem(localLineItem.line_items)
  
          const response = await axios.get(`${apiUrl}/delivery/${deliveryId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params:{
              page: currentPage,
               search: searchTerm,
              per_page: itemsPerPage
            }
          });
         
setProducts([response.data.data])
  setActivty(response.data.data.activities)
  setLineItem(response.data.data.line_items)
  const total = response.data.data.line_items.reduce((acc, row) => acc + parseFloat(row.price), 0);
 setTotalPrice(total)

          if (!response.data) {
            throw new Error('No data received');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(currentPage);
    }}, [purchaseId,orders,setOrders,setPurchaseData, currentPage, searchTerm]);
  
  
    
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


    const handleDownload = async (url, fileName) => {
      console.log(url)
      try {
        const response = await axios.get(url, {
          responseType: 'blob', // Set the responseType to 'blob' to handle binary data
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Create a link element to trigger the download
        const urlObject = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = fileName;
        link.click();
  
        // Clean up the URL object
        window.URL.revokeObjectURL(urlObject);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };

    const handleShowProductTableClick = () => {
      setIsProductModalOpen(true);
    };
  
    const handleShowActivityTableClick = () => {
      setIsActivityModalOpen(true);
    };
  
    const handleProductModalClose = () => {
      setIsProductModalOpen(false);
    };
  
    const handleActivityModalClose = () => {
      setIsActivityModalOpen(false);
    };



    // style
    const commonColumnStyle = {
      fontSize: '18px',
      fontFamily: "serif",
      // backgroundColor: '#fff7cd',
      // color: '#7a4f01'
      backgroundColor:' #e2e8f0',
      color:'#061b64'
      // Adjust the font size as needed
    };
    // const commonColumnStyles = {
    //   fontSize: '18px',
    //   fontFamily: "serif",
    //   backgroundColor: 'black',
    //   color: '#7a4f01'
    //   // Adjust the font size as needed
    // };
  
// product-table
    const columns=[
      {
name:'Product Name',
selector:(row)=>row.product_name, 
style:commonColumnStyle
      },
      {
        name:'Product Code',
        selector:(row)=>row.product_code,
        style:commonColumnStyle
      },
      {
        name:'QTY',
        selector:(row)=>row.drn_quantity,
        style:commonColumnStyle
      },
      {
        name:'Price',
        selector:(row)=>row.product_price,
        style:commonColumnStyle
      },
      {
        name:'GST',
        selector:(row)=>row.gst,
        style:commonColumnStyle
      },
      {
        name:'Product Price',
        selector:(row)=>row.price,
        style:commonColumnStyle
      }
    ]

  // activity table
  const ActivityTable=[
    {
name:'Subject',
selector:(row)=><div dangerouslySetInnerHTML={{ __html: row.body }} />,
style:commonColumnStyle,
width:'300px'
    },
    {
      name:'Action',
      selector:(row)=>row.action,
      style:commonColumnStyle
    },
    {
      name:"Remark",
      selector:(row)=>row.remark,
      style:commonColumnStyle
    },
    {
      name:'Action By',
      selector:(row)=>row.action_by,
      style:commonColumnStyle
     
    },
    {
      name:'Date',
      selector:(row)=>row.date,
      style:commonColumnStyle
    }
  ]

  return (
    <div>
        <Typography variant="h4" gutterBottom
        style={{
          marginLeft:'30px',
          marginBottom:'30px'
        }}
        >
        Purchase Overview
          </Typography>

          <Card>


            <Typography
            variant='h6'
            gutterBottom
            style={{
                marginTop:'25px',
                marginLeft:'25px'
            }}
            >
              {products.map((item)=>{
                return (
                  <div>
<div className="container">
<div id='storedPurchaseDatadrndetail'>
                    <h4>
                      {item.vendor}
                    </h4>
                    <h6 
                    id='storedPurchaseDatadrndetailicon'
                    ><VerifiedIcon /></h6>
                  </div>
</div>
               
      
<div className="container mt-5" >
  {/* <!-- First Row --> */}

    <div className="row p-1">
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col1'>
       <p>{item.drn_id}</p>
       <p id='subheadingdetail'>DRN No.</p> 
        </div>
    </div>
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col2'>
    <p> {item.gtrn_date_time}</p>   
        <p id='subheadingdetail'>DRN Date</p> 
        </div>
    </div>
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col3'>
        <p id='subheadingmaindetail'>{item.subsidiary_name}</p>
        <p id='subheadingdetail'>Subsidiary</p>
        </div>
    </div>
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col4'>
      <p >{item.location_name}</p>  
        <p id='subheadingdetail'>Location</p>
        </div>
    </div>
  </div>

{/* 2nd */}
  <div className="row">
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col5'>

       <p>{item.total_products}</p> 
        <p id='subheadingdetail'>No. of Products</p>
        </div>
    </div>
    <div className="col-md-3 mb-3" >
      <div className="border p-3" id='col6'>
        <p>{item.status}</p>
       <p id='subheadingdetail' >Status</p>
 </div>
    </div>
    {/* drn attachment */}
    <div className="container">
      <h4 className="row p-3">DRN attachment</h4>
      <div className="row" id='drnattachment'>
        <div className="col-md-4">

          <div className='' id='downloaddrndetail'
          onClick={() => handleDownload(item.invoice, 'invoice.xlsx')}
          >
            <p className='downloadinvoicemain'>Download</p>
            <p id='subheadingdowndetail'>Invoice</p>
          </div>
{/* 2 */}
        </div>
        <div className="col-md-4">
        <div className='' id='downloaddrndetail' 
          onClick={() => handleDownload(item.e_way_bill, 'e_way_bill.xlsx')}
        >
            <p className='downloadinvoicemain'>Download</p>
            <p id='subheadingdowndetail'>E Way Bill</p>
          </div>
        </div>
        {/* 3 */}
        <div className="col-md-4">
        <div className='' id='downloaddrndetail' 
         onClick={() => handleDownload(item.e_way_bill, 'upload_drn.xlsx')}
        >
 
          <p className='downloadinvoicemain' >Download</p>

            <p id='subheadingdowndetail'>GRN</p>
          </div>
        </div>
      </div>
    </div>

  </div> 
</div>


                  </div>
                )
              })}
    </Typography>
</Card>

{/* 2 card */}
{/* <Typography variant="h4" gutterBottom className="mt-2" style={{ marginLeft: '40%' }}>
            Product 
          </Typography> */}

<Card className='mt-md-5' style={{
  width:'60%',
  height:'200px',
  marginLeft:'20%'
}}>
 <Typography variant="h4" gutterBottom className="mt-4" style={{ marginLeft: '30%',

}}>
            Products & Activities 
          </Typography>

      <div className="row" style={{marginTop:'20px'}}>
        {/* First Column (Product and Button) */}
        <div className="col-md-6">
          <div style={{display:'flex',flexDirection:'row',
        marginTop:'20px'}}>
          <Typography variant="h5" gutterBottom className="mt-2" style={{ marginLeft: '15%' }}>
            Products: 
          </Typography>
          <div className="container">
            <Button
              variant="contained"
              color="primary"
              className="mb-3 ms-3"
              onClick={handleShowProductTableClick}
              style={{marginLeft: '20%',width:'150px',height:'40px' }}
            >
              Show Table
            </Button>
            </div>
          </div>
        </div>

        {/* Second Column (Leave for other purpose) */}
        <div className="col-md-6">
          {/* Your content for the second column goes here */}
          <div style={{display:'flex',flexDirection:'row',
        marginTop:'20px'}}>
          <Typography variant="h5" gutterBottom className="mt-2" style={{ marginLeft: '5%' }}>
            Activity: 
          </Typography>
          <div className="container">
            <Button
              variant="contained"
              color="primary"
              className="mb-3 ms-3"
              onClick={handleShowActivityTableClick}
              style={{marginLeft: '20%',width:'150px',height:'40px' }}
            >
              Show Table
            </Button>
            </div>
            </div>
        </div>
      </div>
      </Card>

      {/* Modal */}
      <Dialog open={isProductModalOpen} onClose={handleProductModalClose} fullWidth maxWidth="lg">
        <DialogTitle
        style={{
          fontSize:'25px'
        }}
        >Product table</DialogTitle>
        <DialogContent>
          {/* Render your data table component inside the DialogContent */}
          <DataTable 
          columns={columns} 
           data={lineItem}
           pagination
           fixedHeader
           highlightOnHover
        //  footer={() => (
        //     <div style={{ textAlign: 'right', paddingRight: '15px', fontWeight: 'bold' }}>
        //       Total: {totalPrice}
        //     </div>  )}

           />
            <div style={{ textAlign: 'right', paddingRight: '15px', fontWeight: 'bold' }}>
      Total: {totalPrice}
    </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProductModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isActivityModalOpen} onClose={handleActivityModalClose} fullWidth maxWidth="lg">
        <DialogTitle
         style={{
          fontSize:'25px'
        }}
        >Activity table</DialogTitle>
        <DialogContent>
          {/* Render your data table component inside the DialogContent */}
          <DataTable 
          columns={ActivityTable}
           data={activity}
           pagination
           fixedHeader
           highlightOnHover
           />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActivityModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  )
}
