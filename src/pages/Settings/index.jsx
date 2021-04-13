import React, { useState, useEffect, useContext, useRef } from 'react';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';
import SaveIcon from '@material-ui/icons/Save';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  CssBaseline,
  CircularProgress
} from '@material-ui/core';

import api from '../../services/api';
import Menus from '../../components/Menus';
import Copyright from '../../components/Copyright';
import getCookie from '../../utils/functions';
import { Context } from '../../Context/AuthContext';
import useStyles from './styles';

import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  const classes = useStyles();
  const { handleLogout } = useContext(Context);
  const timer = useRef();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error,
  });

  useEffect(() => {
    async function getUser() {
      try {
        await api.get('/users/profile');
      } catch (error) {
        const { data } = error.response;
        toast.error(`${data.detail}`);
        setTimeout(() => {
          handleLogout();
        }, 5000);
      }
    }
    getUser();
  }, [handleLogout]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function handleButtonClickProgress() {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  function handleButtonClickProgressError() {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setError(true);
        setLoading(false);
      }, 2000);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    const csrfToken = getCookie('csrftoken');

    try {
      await api.put('/users/change_password/', {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      handleButtonClickProgress();
      setTimeout(() => {
        setNewPassword('');
        setOldPassword('');
        toast.success('Senha alterada com sucesso!');
      }, 2000);
    } catch (error) {
      const { data, status } = error.response;
      handleButtonClickProgressError();
      setTimeout(() => {
        toast.error(`${data.detail}`);
      }, 2000);
      setTimeout(() => {
        if (status === 401) {
          handleLogout();
        }
      }, 7000);
    }
  }

  return (
    <div className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <Menus title="Configurações" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container} maxWidth="lg">
          <form
            onSubmit={(e) => handleChangePassword(e)}
          >
            <Card>
              <CardHeader
                subheader="Atualize sua senha"
                title="Senha"
              />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Senha antiga"
                  margin="normal"
                  name="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  value={oldPassword}
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Nova senha"
                  margin="normal"
                  name="confirm"
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  value={newPassword}
                  variant="outlined"
                  required
                />
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={buttonClassname}
                  disabled={loading}
                  startIcon={<SaveIcon />}
                >
                  Salvar alterações
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
              </Box>
            </Card>
          </form>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}