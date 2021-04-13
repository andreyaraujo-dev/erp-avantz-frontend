import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { orange } from '@material-ui/core/colors';
import {
  Box,
  Container,
  CssBaseline,
  Card,
  CardContent,
  IconButton,
  Grid,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core';
import { ArrowBack, Edit } from '@material-ui/icons';
import moment from 'moment';

import Menus from '../../../components/Menus';
import Copyright from '../../../components/Copyright';
import api from '../../../services/api';
import getCookie from '../../../utils/functions';
import useStyles from './styles';

import 'react-toastify/dist/ReactToastify.css';

export default function Users(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [access, setAccess] = useState([]);
  const [dateJoined, setDateJoined] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [userGroups, setUserGroups] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [nameGroup, setNameGroup] = useState('');
  const idUser = props.match.params.id;

  useEffect(() => {
    const csrfToken = getCookie('csrftoken');
    api.get(`/users/details/${idUser}`, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    }).then(response => {
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setUsername(response.data.username);
      setAccess(response.data.acess.split(''));
      setDateJoined(response.data.date_joined);
      setEmail(response.data.email);
      setGroup(response.data.idgrp_id);
    }).catch(reject => {
      console.log(reject);
    });
  }, [idUser]);

  useEffect(() => {
    const csrfToken = getCookie('csrftoken');
    api.get('/groups/', {
      headers: {
        'X-CSRFToken': csrfToken
      }
    }).then(response => {
      setUserGroups(response.data);
    }).catch(reject => {
      console.log(reject);
    });
  }, []);

  useEffect(() => {
    userGroups.map(userGroup => {
      if (userGroup.id_grupo === group) {
        setNameGroup(userGroup.grupo);
      }
      return true;
    });
  }, [userGroups, group]);

  useEffect(() => {
    const csrfToken = getCookie('csrftoken');
    api.get('/permissions/', {
      headers: {
        'X-CSRFToken': csrfToken
      }
    }).then(response => {
      setUserPermissions(response.data);
    }).catch(reject => {
      console.log(reject);
    });
  }, []);

  return (
    <div className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <Menus title="Detalhes do usuário" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container} maxWidth="lg">
          <Card>
            <CardContent>
              <Box
                maxWidth={600}
                display="flex"
                justifyContent="flex-start"
              >
                <Link to="/users" className="link">
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                </Link>

                <Link to={`/users/edit/${idUser}`} className="link" >
                  <IconButton>
                    <Edit style={{ color: orange[300] }} />
                  </IconButton>
                </Link>
              </Box>
            </CardContent>
          </Card>

          <Card className={classes.cardContent}>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  xl={12}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar className={classes.avatarLarge} />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  xl={6}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Primeiro nome"
                    name="firstName"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  xl={6}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Segundo nome"
                    name="lastName"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={8}
                  xl={8}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="E-mail"
                    name="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={4}
                  sm={4}
                  xl={4}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Username"
                    name="username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={4}
                  sm={4}
                  xl={4}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Data de criação"
                    name="dateJoined"
                    variant="outlined"
                    value={moment(dateJoined).format('DD/MM/YYYY')}
                    onChange={(e) => setDateJoined(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={8}
                  xl={8}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Grupo"
                    name="groups"
                    variant="outlined"
                    value={nameGroup}
                    onChange={(e) => setNameGroup(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className={classes.cardContent}>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  xl={12}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <List >
                      <h2>Permissões do usuário</h2>
                      <Divider />
                      {userPermissions.map(permission => (
                        <ListItem key={permission.id} role={undefined} dense button>
                          <ListItemText primary={permission.descr} />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              disabled
                              checked={access[permission.id - 1] === '1' ? true : false}
                              tabIndex={-1}
                              disableRipple
                              color="primary"
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}