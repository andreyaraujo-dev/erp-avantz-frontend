import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
} from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';

import { Search as SearchIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const PageHeader = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={6}
              xs={6}
              sm={6}
            >
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Pesquisar pessoa"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
              xl={6}
              sm={6}
            >
              <Box
                display="flex"
                justifyContent="flex-end"
              >

                <Link to="/legal/person/register" className="link" >
                  <Button
                    color="primary"
                    variant="contained"
                  >
                    Adicionar Pessoa
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default PageHeader;
