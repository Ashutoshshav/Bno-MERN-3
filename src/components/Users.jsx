import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  console.log(users);
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5" gutterBottom>Users list</Typography>
        {loading ? (
          <CircularProgress />
        ) : users.length > 0 ? (
          <List>
            {users.map(user => (
              <ListItem key={user.id} button onClick={() => handleUserSelect(user)}>
                <Avatar src={user.avatar} />
                <ListItemText primary={user.profile.firstName + " " + user.profile.lastName} style={{marginLeft : "10px"}} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h5" gutterBottom>No data to show</Typography>
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" gutterBottom>User details</Typography>
        {loading ? (
          <CircularProgress />
        ) : selectedUser ? (
          <div>
            <Avatar src={selectedUser.avatar} />
            <Typography variant="h6" gutterBottom textAlign="left">Username: {selectedUser.profile.username}</Typography>
            <Typography variant="h6" gutterBottom textAlign="left">Name: {selectedUser.profile.firstName + " " + selectedUser.profile.lastName}</Typography>
            <Typography variant="h6" gutterBottom textAlign="left">Email: {selectedUser.profile.email}</Typography>
            <Typography variant="h6" gutterBottom textAlign="left">Bio: {selectedUser.Bio}</Typography>
            <Typography variant="h6" gutterBottom textAlign="left">jobTitle: {selectedUser.jobTitle}</Typography>
          </div>
        ) : (
          <Typography variant="h5" gutterBottom>No user selected</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
