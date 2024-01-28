// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../AuthProvider';



// export const Drnconcern = () => {
//     const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const { apiUrl } = useAuthContext();
//   const token = localStorage.getItem('token');

//   const fetchData = async () => {
//     try {
//       const page = 1; // Set your page accordingly
//       const perPage = 10; // Set your per_page accordingly
//       const from = ''; // Set your from accordingly
//       const to = ''; // Set your to accordingly

//       const params = {
//         page,
//         per_page: perPage,
//         from,
//         to,
//       };

//       // Check if search is provided and add it to params
//       // For simplicity, I'm assuming you get it as a prop or state
//       const search = ''; // Replace with your actual search value
//       if (search) {
//         params.search = search;
//       }

//       // Check if status is provided and add it to params
//       // For simplicity, I'm assuming you get it as a prop or state
//       const status = ''; // Replace with your actual status value
//       if (status && this.concern_status.includes(status)) {
//         params.status = status;
//       }

//       const response = await axios.get(`${apiUrl}/getConcerns`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: params, // Corrected this line
//       });
// console.log(response)
//       if (response.data.status) {
//         setData(response.data.data);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError('Failed to communicate with the server!');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); 
  
//     return (
//       <div>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <ul>
//             {data.map(item => (
//               <li key={item.id}>{item.name}</li> 
//             ))}
//           </ul>
//         )}
//       </div>
//     );
            
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthProvider';

export const Drnconcern  = () => {
    const [data,setData]=useState()
    const {apiUrl}=useAuthContext()
  const endpoint = apiUrl;
  const token = localStorage.getItem('token');
  console.log(token)

  const logError = (errorMessage) => {
    console.error(errorMessage);
    // Handle error logging or display as needed
  };
console.log(data)
  const getApiData = async (url, params) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        params: params,
      });
setData(response.data)
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return { ...response.data, status: 1 };
    } catch (error) {
      logError(error.message);
      return { status: 0, message: 'Failed to communicate with the server!' };
    }
  };

  const markConcern = async (id) => {
    const url = `${apiUrl}/concern/submit/${id}`;
    return await getApiData(url, {});
  };

  const revertConcern = async (id, multipart) => {
    const url = `${apiUrl}/concern/reply/${id}`;
    try {
      const response = await axios.post(url, multipart, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return { ...response.data, status: 1 };
    } catch (error) {
      logError(error.message);
      return { status: 0, message: 'Failed to communicate with the server!' };
    }
  };

  const getDefectives = async (params) => {
    const url = `${apiUrl}/defective`;
    return await getApiData(url, params);
  };

  const viewDefective = async (id) => {
    const response = await getDefectives(id);

    if (response.status) {
      // Handle success, e.g., redirect or display data
      console.log(response.data);
    } else {
      // Handle failure, e.g., redirect with error message
      console.error(response.message);
    }
  };

  // Add other functions as needed

  // Example usage
  useEffect(() => {
    const fetchData = async () => {
      const data = await markConcern(123);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Your React component content here */}
   <h4>Drn Concern</h4>
    </div>
  );
};


