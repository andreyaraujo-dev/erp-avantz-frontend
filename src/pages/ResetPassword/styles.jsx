import { grey, green, red, blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle: {
    marginTop: theme.spacing(2),
    color: grey[700]
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonError: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default useStyles;