import React, { useEffect ,useState} from 'react';
import NgoHeader from '../components/NgoHeader';
import axios from 'axios';
function NGODashboard() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const students=async()=>{
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          authorization: `${token}`,
        },
      };
      try {
        const response= await axios.get('http://localhost:3000/ngo/home', config);
        console.log(response.data);
        setStudent(response.data);
      } catch (error) {
        alert('Error:', error);
      }
    }
    students();
  },[])
  return (
    <div>
      <NgoHeader/>
      <div>
        <div>
          {student.map((student) => 
            (
            <div key={student._id}>
              <h1>Name:-{student.name}</h1>
              <h1>Email:-{student.email}</h1>
              <h1>Address:-{student.address}</h1>
              <h1>Contact:-{student.contact}</h1>
              <h1>Age:-{student.age}</h1>
            </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default NGODashboard;
