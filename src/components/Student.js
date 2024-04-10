import { useState ,useEffect} from 'react'; 

import TextField from '@mui/material/TextField';
import {Container,Paper,Button} from '@material-ui/core'
export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[id,setId]=useState('')
    const[students,setStudents]=useState([])

    // const initialValues = {
    //     id:"",
    //     name: "",
    //     address: "",
    //         };
    // const [isEdit, setIsEdit] = useState(false);
    // const [studentData, setstudentData] = useState(initialValues);
    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     // if (!formErrors) {}   else {
    //     //   setErrorsMessage("Please enter all fields; all are required ");
    //     // }
    //     try {
    //       if (isEdit) {
    //         // Handle edit logic, make a PUT request
    //         const response = await axios
    //           .put("http://localhost:8080/students/${id}", students)
    //           .then((response) => {
    //             console.log("Record edited:", response.data);
    //             setSuccessMessage("Data Updated successfully!");
    //             setTimeout(() => {
    //               setSuccessMessage("");
    //             }, 6000);
    //             setstudentData(initialValues);
    //             setIsEdit(false);
    //           })
    //           .then((error) => {
    //             console.error("Error:", error);
    //           });
    //       } else {
    //         const res = await axios
    //           .post("http://localhost:8080/students/add", formData)
    //           .then((res) => {
    //             console.log("crete", res.data);
    //             setSuccessMessage("Data submitted successfully!");
    //             setTimeout(() => {
    //               setSuccessMessage("");
    //             }, 3000);
    //             setFormData(initialValues);
    //           })
    //           .then((error) => {
    //             console.error("Error:", error);
    //           });
    //       }
    
    //       setFormSubmitted((prev) => prev + 1);
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
    //   };

    // const handleUpdate= async (e)=>{
    //     e.preventDefault()
    //     const student={name,address,id}
    //     console.log(student)
    //     if(id)
    //     {
    //         const response = await axios
    //         .put("http://localhost:8080/students/id", student)
    //         .then((response) =>{
    //             console.log("Record edited:", response.data);
    //         })
    //         .then((error) => {
    //             console.error("Error:", error);
    //           });
    //     } else
    //     {
    //         handleClick();
    //     }
    // }
    const handleUpdate= (e)=>{
        e.preventDefault()
        const student={name,address,id}
        console.log(student)
        if(id)
        {
           fetch("http://localhost:8080/students/id",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
           }).then(()=>{
            console.log("New Student updated")
          })
        } else
        {
            handleClick();
        }
    }

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address,id}
        console.log(student)
        fetch("http://localhost:8080/students/add",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(student)
    
      }).then(()=>{
        console.log("New Student added")
      })
    }
    useEffect(()=>{
        fetch("http://localhost:8080/students/getall")
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result);
        }
      )
      },[students])

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"blue"}}><u>Add Student</u></h1>
    <form
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField id="outlined-basic" label="Student ID" variant="filled" fullWidth
      value={id}
      onChange={(e)=>setId(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="filled-basic" label="Student Address" variant="filled" fullWidth 
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
         <Button variant="contained" color="secondary"onClick={handleClick}>
  Submit
</Button>
<Button variant="contained" color="secondary"onClick={handleUpdate}>
  update
</Button>
    
    </form>
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>
    </Container>
    
  );
}