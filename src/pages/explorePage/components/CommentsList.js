import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Comment from './Comment';

function CommentsList({comments}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordionClick = () => {
    setIsExpanded(!isExpanded);
  };
  return ( 
  
    comments && comments.length ? 
    <Accordion sx={{ border: 'transparent'}} expanded={isExpanded} onChange={handleAccordionClick}>
      
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{  fontWeight: 'light', fontSize: 14 }}>
      View all comments
    </AccordionSummary>
    <AccordionDetails>
    {comments && comments.length ? 
      comments.map((comment, index) => (
        <Comment comment={comment} key={index} /> 
      ))
      : null}
    </AccordionDetails>
  </Accordion> : null )
  
  
}

export default CommentsList;