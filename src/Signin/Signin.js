import React, { useState } from 'react'
import {
    AppBar,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent, FormControlLabel,
    makeStyles,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.paper,
    },
    actions: {
        justifyContent: 'space-between',
        padding: theme.spacing(1, 3, 3),
        backgroundColor: theme.palette.background.paper,
        '& label': {
            marginRight: 0,
        },
    },
}), {
    name: Singin.name,
})

export default function Singin(props) {
    const classes = useStyles(props)
    const [ singinState, setSinginState ] = useState({
        message: '',
        pending: false,
    })
    const [ rememberMe, setRememberMe ] = useState(false)
    const [ values, setValues ] = useState({ email: '', password: '' })

    function handlerChangeInput(data) {
        setValues(prev => ({ ...prev, ...data }))
    }

    function authenticate(values) {
        return new Promise((resolve, reject) =>{
            if (values.email && values.password) {
                resolve({token: 'simple-search-app-token', refreshToken: 'simple-search-app-refresh-token' })
            } else {
                reject(new Error('fill all values'))
            }
        })

    }

    function handlerChangeCheckbox() {
        setRememberMe(prev => !prev)
    }

    function onSubmit(e) {
        e.preventDefault()
        authenticate(values)
            .then((res) => {
                sessionStorage.setItem('SIMPLE-TOKEN', res.token)
                sessionStorage.setItem('SIMPLE-REFRESH_TOKEN', res.refreshToken)
                if (rememberMe) {
                    localStorage.setItem('SIMPLE-TOKEN', res.token)
                    localStorage.setItem('SIMPLE-REFRESH_TOKEN', res.refreshToken)
                }
                window.dispatchEvent(new Event("storage"));
            })
            .catch((error) => {
                setSinginState({...singinState, message: error.message})
                console.error(error)
            })

    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={true}
        >
            <AppBar
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h6">Enter</Typography>
                </Toolbar>
            </AppBar>
            <form id="app-auth" onSubmit={onSubmit}>
                <DialogContent className={classes.content}>
                    <TextField
                        id="email"
                        label="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.email}
                        onChange={({ target: { value: email } }) => {
                            handlerChangeInput({ email })
                        }}
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.password}
                        onChange={({ target: { value: password } }) => {
                            handlerChangeInput({ password })
                        }}
                        error={!!singinState.message}
                        helperText={singinState.message}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button
                        form="app-auth"
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                    >
                        Sign in
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={handlerChangeCheckbox}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="remember"
                    />
                </DialogActions>
            </form>
        </Dialog>
    )
}
