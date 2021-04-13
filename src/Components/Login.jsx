import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
}));


export default function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState([]);
    const [password, setPass] = useState([]);
    const [tokenInfo, setToken] = useState({
            token: "",
            personalDetails: {
            name: "",
            Team: "",
            joinedAt: "",
            avatar: ""
            }
    });

    async function handleClick(e){
        e.preventDefault();
        await axios.post('https://private-052d6-testapi4528.apiary-mock.com/authenticate', {email, password})
        .then(res=>{
            const tmpToken = res.data[0];
            setToken(preValue => { 
                return {
                    token: tmpToken.token,
                    personalDetails: {
                        name: tmpToken.personalDetails.name,
                        Team: tmpToken.personalDetails.Team,
                        joinedAt: tmpToken.personalDetails.joinedAt,
                        avatar: tmpToken.personalDetails.avatar
                    }
                };
            })
            props.handleLogin(true);
            props.handleUser({email, password})
        })
    }

    function handleChangeEmail(e){
        setEmail({
            [e.target.name] : e.target.value
        });
    }

    function handleChangePass(e) {
        setPass({
            [e.target.name] : e.target.value
        });
    }

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={handleClick} method="POST" className={classes.form}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeEmail}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePass}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign In
                </Button>
            </form>
            </div>
        </Grid>
        </Grid>
    );
}