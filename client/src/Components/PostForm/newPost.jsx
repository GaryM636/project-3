import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 


const defaultTheme = createTheme();

export default function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { userId } = state;
    const [text, setText] = useState("");
    const [addPost, { error }] = useMutation(CREATE_POST);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addPost({
                variables: { userId, text }
            });
            setText('');
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create new post:
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
                        <Grid container maxWidth="xl" spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    multiline={true}
                                    rows = {5}
                                    required
                                    fullWidth
                                    name="text"
                                    label="Enter new post"
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
