import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Accordion } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { AccordionDetails} from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginBottom: '30px'
      },
    main: {
        border: '1px solid #d6d7df',
        backgroundColor: '#f9f9f9',
    
    },  

    heading: {
      fontSize: theme.typography.pxToRem(13),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(11),
      color: theme.palette.text.secondary,
      margin: '0 auto'
    },
    details: {
        fontFamily: 'Raleway',
        fontSize: theme.typography.pxToRem(10),
        margin: '0 auto',
    }
    
  }));



const InfoAccordion = ({mode, empty}) => {
      
    useEffect(() => {
        setExpanded(mode)
      }, [mode]); 

    const classes = useStyles();
    const [expanded, setExpanded] = useState();
    const handlePanel = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
        <div className={classes.root}>
        <Accordion className={classes.main} expanded={expanded === 'normal-search'} onChange={handlePanel('normal-search')}>
            <AccordionSummary
                expandIcon={<i className='material-icons'>expand_more</i>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>General search</Typography>
                <Typography className={classes.secondaryHeading}><span style={{padding:'3px', backgroundColor: '#ebebeb'}}>query</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.details}>
                    Search <span className='emp-span'>title</span> and <span className='emp-span'>content</span> of body <br/><br/>
                    <span className='emp-span'>ex)</span> To find post with title 'please translate this song' 
                    <span className='search-list'>
                        <p> search 'song', 'translate'</p>
                        <p> search substring of the query 'son','trans', etc </p> 
                    </span>
                </div>
            </AccordionDetails>
            </Accordion>

            <Accordion className={classes.main} expanded={expanded === 'language-search'} onChange={handlePanel('language-search')}>
                <AccordionSummary
                    expandIcon={<i className='material-icons'>expand_more</i>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Language search</Typography>
                    <Typography className={classes.secondaryHeading}>
                        <span style={{padding: '3px', backgroundColor: '#dddddd'}}> Original 
                        <span className='search-char'>-></span> Target </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className={classes.details}>
                    Search post within specified  <span className='emp-span'>language</span> <br/><br/>
                    <span className='emp-span'>ex)</span> To find post that need to be translated from Korean to English <br/>
                    <span className='search-list'>
                        <p> search by full title or substring (Korean -> English, Korea -> Eng)</p>
                        <p> search by language code (ko -> en) </p> 
                        <p> search by native title (한국어 -> english, 한국 -> eng) </p> 
                    </span>
                    <br/>
                    <span className='emp-span'>ex)</span> To find all post with Korean as original language <br/>
                    <span className='search-list'>
                        <p> Korean -></p> 
                        <p> ko ->  </p> 
                        <p> 한국어 ->  </p> 
                    </span>
                    <br/>
                     <span className='emp-span'>ex)</span> To find all post with Japanese as target language <br/>
                     <span className='search-list'>
                        <p>  -> Japanese  </p   > 
                        <p>  -> ja  </p> 
                        <p>  -> 日本語  </p> 
                    </span>

                </div>
                </AccordionDetails>
         </Accordion>

         <Accordion className={classes.main} expanded={expanded === 'tag-search'} onChange={handlePanel('tag-search')}>
                <AccordionSummary
                    expandIcon={<i className='material-icons'>expand_more</i>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Tag (domain) search</Typography>
                    <Typography className={classes.secondaryHeading}>
                        <span style={{padding: '3px', backgroundColor: '#e1ddde'}}>
                        <span className='search-char'>[</span>Tagname<span className='search-char'>]</span>
                        </span> 
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className={classes.details}>
                    Search post by <span className='emp-span'>tag (domain)</span><br/><br/>
                    <span className='emp-span'>ex)</span> To find all post tagged IT as domain <br/>
                     <span className='search-list'>
                        <p> search by wrapping query in square brackets [IT] </p> 
                    </span>
                </div>
                </AccordionDetails>
         </Accordion>                               
      </div>  
    )
   
}

export default InfoAccordion