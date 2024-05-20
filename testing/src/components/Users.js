import  React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UpdateModal from './UpdateModal';
import DeleteIcon from '@mui/icons-material/Delete';


export default function BasicTextFields() {
    const forcont = {padding:'50px', margin:'auto', width:1000}
    const paperstyle = {padding:'50px 20px', width:600, margin:'20px auto', height:300}
    const forbutton = {margin:'40px'}
    const forbut1 = {left: '465px', bottom: '65px'}
    const forbut2 = {left: '350px', bottom: '20px'}
    const[name,setName] = useState('');
    const[phonenumber,setPhonenumber] = useState('');
    const[users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        const user = { name, phonenumber: phonenumber }; // Изменено здесь
        console.log(user);
        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(() => {
            console.log("New User added");
            fetchUsers(); 
        });
    };
    const handleOpenModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null); 
      };
      const handleUpdateUser = (updatedUser) => {
     
        updateUser(updatedUser);
      };
      

     

     
   


    

    useEffect(()=>{
        fetch("http://localhost:8080/user/getList")
        .then(res=>res.json())
        .then((result)=>{
            setUsers(result);
        })
    })
    const deleteUser = (id) => {
        fetch(`http://localhost:8080/user/${id}`, {
          method: "DELETE",
        }).then(() => {
         
          console.log("User deleted");
        
        });
      };

      const updateUser = (user) => {
        fetch(`http://localhost:8080/user/${user.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name: user.name, phonenumber: user.phonenumber }) // Изменено здесь
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            fetchUsers(); 
        })
        .catch(error => {
            console.error("Error updating user:", error);
        });
    };

      const fetchUsers = () => {
        fetch("http://localhost:8080/user/getList")
          .then(res => res.json())
          .then(data => setUsers(data))
          .catch(error => console.error("Error fetching users:", error));
      };

      useEffect(() => {
        fetchUsers();
      }, []) 

    
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <Container style={forcont}>
        <Paper elevation={3} style={paperstyle}>
            <h1 style={{color:"blue"}}><u>Add Users</u></h1>
      <TextField id="outlined-basic" label="Name n LastName" variant="outlined" fullWidth
      value={name}
      onChange = {(e)=>setName(e.target.value)} />
      
      <TextField id="outlined-basic" label="PhoneNumber" variant="outlined" fullWidth 
      value={phonenumber}
      onChange={(e)=>setPhonenumber(e.target.value)}
      />
      <Button style={forbutton} variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
               Send
        </Button>
      
      </Paper>
      <h1>Users</h1>

      <Paper elevation={3} style={paperstyle}>

        {users.map(user=>
        <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={user.id}>
            Id:{user.id}<br/>
            Name:{user.name}<br/>
            PhoneNumber:{user.phonenumber}<br/>
           
           
            <Button style={forbut1}  onClick={() => handleOpenModal(user)}>Update</Button>
            <Button style={forbut2}  variant="outlined" size="large" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(user.id)}> Delete</Button>



            </Paper>
)}

        
      </Paper>
      <UpdateModal
  open={isModalOpen}
  user={editingUser}
  handleClose={handleCloseModal}
  handleUpdate={handleUpdateUser}
/>
      
      </Container>
    </Box>
  );
}