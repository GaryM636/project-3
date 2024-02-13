import React from "react";
import { useState } from "react";
import { CREATE_BIO } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'; 

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import "./bio.css"


function BioForm({ userId }) {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [birthday, setBirthday] = useState("");

    const [addBio, { error }] = useMutation(CREATE_BIO);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addBio({
                variables: { userId, text, location, website, birthday }
            })
            console.log("New text: ", text);
            navigate("/profile")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h2 id="title">Edit Bio</h2>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: "10%", display: "flex", flexDirection: "column" }}>
                <FormControl className="comment-form" sx={{ mt: 3 }}>
                    <Grid>
                        <InputLabel htmlFor="component-outlined">Text</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            label="Text"
                            required
                            fullWidth
                            name="text"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Grid>
                </FormControl>
                <FormControl className="comment-form" sx={{ mt: 3 }}>
                    <InputLabel htmlFor="component-outlined">Location</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Location"
                        required
                        fullWidth
                        name="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </FormControl>
                <FormControl className="comment-form" sx={{ mt: 3 }}>
                    <InputLabel htmlFor="component-outlined">Website</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Website"
                        required
                        fullWidth
                        name="website"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </FormControl>
                <FormControl className="comment-form" sx={{ mt: 3 }}>
                    <InputLabel htmlFor="component-outlined">Birthday</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Birthday"
                        required
                        fullWidth
                        name="birthday"
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </FormControl>
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "15%", left: "85%"}}
                >
                    Create
                </Button>
            </Box>
        </>
    )
}

export default BioForm;