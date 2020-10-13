import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';

function Statsbox(props){

return(
<Card>
<CardContent className="cards">
    <h3><b>{props.title}</b></h3>
    
<h2 style={{color:props.color}}>+{props.cases}</h2>
<br></br>
<h3><b>Total-</b>{props.total}</h3>

</CardContent>


</Card>
);

}

export default Statsbox;
