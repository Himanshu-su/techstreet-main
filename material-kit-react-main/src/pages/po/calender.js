import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import './index.css'
import { useAuthContext } from '../AuthProvider';
import { Button, Card, TableHead, Typography } from '@mui/material';
import { Link, useLocation, useNavigate, useParams,useHistory, } from 'react-router-dom';
import { Footer } from '../Footer';


const token = localStorage.getItem('token');

export const Calender = () => {
    const [scheduleData, setScheduleData] = useState(null);
    const [qtySchedule,setqtySchedule]=useState([])
    const [realscheduleData, setRealScheduleData] = useState(null);
    const [itemName,setItemName] = useState(null);
    const [receivedqtyStatus,setreceivedQtyStatus] = useState(null);
    const [remainingqtyStatus,setremainingQtyStatus] = useState(null);
    const [orderedQty,setorederQty]=useState(null)
    const [itemSchedule,setitemSchedule] = useState(null);
    const [dateRange,setDateRange]=useState([])
    const [error, setError] = useState(null);
    const { purchaseId, apiUrl } = useAuthContext();
    const [month,setMonth]=useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [selectedMonthRangeUI, setSelectedMonthRangeUI] = useState('');
    const purchaseid = localStorage.getItem('purchaseId');
    const { index } = useParams();
    // Convert the index to a number
    const monthIndex = parseInt(index, 10);
    const navigate = useNavigate();
    const location = useLocation();
    // const history = useHistory(); 
    console.log(`'useParam index':${index}`)
    console.log(scheduleData);
  console.log(month)
  // console.log(realscheduleData)
  // console.log(itemName)
  // console.log(receivedqtyStatus)
  // console.log(remainingqtyStatus)
  // console.log(itemSchedule)
  // console.log(orderedQty)
  // console.log(dateRange)

    // Simulate API call
    const getSchedule = async (params, stype = 'monthly') => {
      try {
        const response = await axios.post(
          `${apiUrl}/${stype}-schedule`,
      {...params,daterange:params.dateRange},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data)
        const dash = response.data.purchase_order
        setScheduleData([dash]);
        setRealScheduleData(response.data.schedule)
        setItemName(response.data.schedule[0].items.product_name)
        setreceivedQtyStatus(response.data.schedule[0].qty_status.received_qty)
        setremainingQtyStatus(response.data.schedule[0].qty_status.remaining_qty)
        setitemSchedule(response.data.schedule[0].schedule_qty.item_schedule )
        setorederQty(response.data.schedule[0].schedule_qty.ordered_qty)
        setqtySchedule(data.schedule[0].qty_schedule)
        // const formattedDates = response.data.months[0].daterange.map((dateString) => {
        //   const dateObject = new Date(dateString);
        //   return `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
        // });
    
        // setDateRange(formattedDates)
        setMonth(response.data.months)
        
      }
       catch (error) {
        setError(error);
      }
    };
  
    useEffect(() => {
      const defaultMonth = index !== undefined ? parseInt(index, 10) : 0;
      getSchedule({ po_id: purchaseid, selected_month: defaultMonth });
      setCurrentMonthIndex(defaultMonth);
    }, [purchaseid, index]);
  
  
    const handleButtonClick = (e, selectedMonthIndex) => {
      e.preventDefault();
  
     
      let newMonthIndex = selectedMonthIndex;

  
    
      // Fetch data with the updated selected_month value
      getSchedule({ po_id: localStorage.getItem('purchaseId'), selected_month: newMonthIndex })
        .then(response => {
          // Update currentMonthIndex and dateRange states
          setCurrentMonthIndex(newMonthIndex);
    
          const selectedMonth = month[newMonthIndex];
          const daterange = selectedMonth ? selectedMonth.daterange : [];
          const formattedDates = daterange.map((dateString) => {
            const dateObject = new Date(dateString);
            return `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
          });
          setDateRange(formattedDates);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    

    const handleArrowClick = (e,type) => {
      e.preventDefault();
      let newMonthIndex = currentMonthIndex;

      if (type === 'backward' && currentMonthIndex > 0) {
        newMonthIndex = currentMonthIndex - 1;
      } else if (type === 'forward' && currentMonthIndex < month.length - 1) {
        newMonthIndex = currentMonthIndex + 1;
      }
    
      // Fetch data with the updated selected_month value
      getSchedule({ po_id: localStorage.getItem('purchaseId'), selected_month: newMonthIndex })
        .then(response => {
          // Update currentMonthIndex and dateRange states
          setCurrentMonthIndex(newMonthIndex);
    
          const selectedMonth = month[newMonthIndex];
          const daterange = selectedMonth ? selectedMonth.daterange : [];
          const formattedDates = daterange.map((dateString) => {
            const dateObject = new Date(dateString);
            return `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
          });
          setDateRange(formattedDates);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      };
    
  

    // Render your component with the fetched data
    return (
      <>
      <Typography
        variant='h4'
        gutterBottom
        style={{
          marginTop: '25px',
          marginLeft: '25px',
        }}
      >
        {/* Add your title text here */}
         Schedule Overview

      </Typography>
     <Card
     style={{
      marginTop:'50px'
     }}
     >
      <Typography
        variant='h4'
        gutterBottom
        style={{
          marginTop: '50px',
          marginLeft: '35px',
          marginBottom:'35px'
        }}
      >
        {/* Add your title text here */}
        View Schedule

      </Typography>

      <div>
        {scheduleData !== null &&
          scheduleData.map((item) => (
            <div className="container" key={item.id}>
              <div className="row">
                <div className="col-md-3">
                  <div className="border p-4" id='col1'>
                    <h5>{item.oid}</h5>
                    <h5 id='subheadingdetail'>Purchase Order id</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border p-4" id='col2'>
                    <h5> {item.total_products}</h5>
                    <h5 id='subheadingdetail'>Products</h5>
                  </div>
                </div>
                <div className="col-md-3" >
                  <div className="border" id='col3' 
                  style={{
                    paddingTop:'32px'
                  }}
                  >
                    <h5 id='subheadingmaindetail'>{item.issue_date}</h5>
                    <h5 id='subheadingdetail'>Issue Date</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border p-4" id='col4'>
                    <h5>{item.validity}</h5>
                    <h5 id='subheadingdetail'>Validity</h5>
                  </div>
                </div>
              </div>
              {/* 2nd row */}
              <div className="row">
                <div className="col-md-3">
                  <div className="border p-4" id='col5'>
                    <h5>{item.status}</h5>
                    <h5 id='subheadingdetail'>Status</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* button */}

      <div className="d-flex flex-row align-items-center ms-3 mt-3 "
      
      >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: location.pathname.includes('month')
          ? '#2065D1'
          : 'transparent',
        color: location.pathname.includes('month') ? 'white' : 'black',
        //   backgroundColor: '#2065D1',
        //   color: 'white',

        }}
        onClick={() => handleButtonClick('monthly')}
        className='btn-hover'
      >
        <EventNoteIcon style={{ marginRight: '5px' }} />
        Monthly
      </Button>

      <Button
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: location.pathname.includes('week')
              ? '#2065D1'
              : 'transparent',
            color: location.pathname.includes('week') ? 'white' : 'black',
          }}
          onClick={(e) => handleButtonClick(e, 'weekly')}
        className='ms-3'
      >
        <EventNoteIcon style={{ marginRight: '5px' }} />
       Weekly
      </Button>
    </div>
    {/* showing data */}
    <div className="d-flex flex-row align-items-center  mt-3" style={{
        width:'40%'
    }}>
          <Button 
          className='ms-2'
          // onClick={() => handleArrowClick('backward')}
          onClick={(e) => {
            handleArrowClick(e,'backward');
            // navigate(`/dashboard/purchase/schedule/monthly/${currentMonthIndex - 1}`);
          }}
          disabled={currentMonthIndex <= 0}
          >
            <ArrowBackIcon />
          </Button>
   
        
        {month.length > 0 &&
  month.map((monthItem, index) => (
    <div className="container" style={{
      // border:'1px solid red',
      marginLeft:'10px'
    }} key={index}>
      <Typography variant="h5" gutterBottom>
        <span
          onClick={(e) => {
            handleButtonClick(e, index);
          }}
          className={currentMonthIndex === index ? "activeMonth" : ""}
          style={{ cursor: 'pointer' }}
        >
          {monthItem.monthrangeui}
        </span>
      </Typography>
    </div>
  ))}
 

          <Button
          //  onClick={() => handleArrowClick('forward')} 
          onClick={(e) => {
            handleArrowClick(e,'forward');
          
          }}
          //  style={{
          //   marginRight:'30px',
       
          // }}
          disabled={currentMonthIndex >= month.length-1}
          >
            <ArrowForwardIcon 
           
            />
          </Button>
        </div>

<div className='ms-3 me-3 mb-4 mt-4' >
        <TableContainer style={{
  borderRadius:'10px'
}}>
            <Table>
<TableHead>
  <TableRow>
    <TableCell>Items</TableCell>
    <TableCell>Orederd Qty</TableCell>
    <TableCell>Pending Scheduled Qty</TableCell>


    {qtySchedule && qtySchedule.map((date, index) => (
      <TableCell key={index}>{date.label}</TableCell>
    ))}

  </TableRow>
</TableHead>
<TableBody>
  <TableCell>{itemName}</TableCell>
  <TableCell>{orderedQty}<br/>{itemSchedule}</TableCell>
  <TableCell>{remainingqtyStatus}/{receivedqtyStatus}</TableCell>
  {/* {qtySchedule.map((date, dateIndex) => (
            <TableCell key={dateIndex}>
              <input
                type="text"
                // Set the value based on your data object properties
                style={{ width: '100px', height: '40px',border:'1px solid gray'
              ,borderRadius:'10px'
              }}
                // Add any other input attributes or event handlers as needed
              />
            </TableCell>
          ))} */}
         {qtySchedule && qtySchedule.map((date, dateIndex) => (
    <TableCell key={dateIndex}>
      <input
        type="text"
        // Set the value based on your data object properties
        style={{ width: '100px', height: '40px', border: '1px solid gray', borderRadius: '10px' }}
        // Add any other input attributes or event handlers as needed
      />    </TableCell>
      ))}
    

          </TableBody>
            </Table>
          </TableContainer>
        
          </div>

        {/* show table */}
        {/* <div className="d-flex flex-row align-items-center">

          <Button onClick={handleShowButtonClick} variant="outlined" color="primary" 
          className=''
          style={{
            marginLeft:'40%',
            marginTop:'30px',
            marginBottom:'30px'
          }}
          >
            Show Table
          </Button>
        </div> */}

       
    </Card>
    <Footer/>
    

      </>
    );
   
  }
  // ;Dream Soft ;info@dreamssoftindia.com
  // mak infotech mubmbai9029075525
  // 8957060742