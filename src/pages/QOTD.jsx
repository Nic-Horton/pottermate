import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function QOTD() {
  const [quote, setQuote] = useState({ text: '', speaker: '' });

  useEffect(() => {
    const currentDate = new Date();
    const today = currentDate.toDateString();
    const qod = localStorage.getItem('quote');
    const lastUpdateDate = localStorage.getItem('lastUpdateDate');

    if (qod && lastUpdateDate === today) {
      setQuote(JSON.parse(qod));
    } else {
      fetch('https://api.portkey.uk/quote')
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        const newQuote = {text:data.quote, speaker:data.speaker}
        setQuote(newQuote)
        localStorage.setItem('quote', JSON.stringify(newQuote))
        localStorage.setItem('lastUpdateDate', today);
      })
    }
  }, []);

  return (
      <Card sx={{ mt:6, mx:2 ,minWidth: 250, maxWidth:600}}>
      <CardContent>
        <Typography sx={{ fontSize: 14,fontFamily:'Lugrasimo' }} color="primary.dark" gutterBottom>
          Quote of the Day
        </Typography>
        <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Typography variant="h6" component="div" sx={{fontFamily:'Lugrasimo'}}>
        {quote.text}
        </Typography>
        <Typography sx={{ mb: 1.5,fontFamily:'Lugrasimo' }} color="text.primary">
        -{quote.speaker}
        </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default QOTD;