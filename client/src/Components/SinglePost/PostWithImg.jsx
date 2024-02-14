import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CommentForm from '../CommentForm/index.jsx';

 function PostWithImg() {
  const [ isCommentActive, setIsCommentActive ] = React.useState( false );
  return (
    <Card className='cards'>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica, setIsCommentActive
        </Typography>
      </CardContent>
      <div className='card-media'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      </div>
      <CardActions id="LookingForComments" className='card-actions'>
        <BottomNav setIsCommentActive={setIsCommentActive} isCommentActive={isCommentActive}/>
      </CardActions>
      <Accordion expanded={isCommentActive}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentForm />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}