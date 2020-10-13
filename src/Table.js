import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';

function Table(props){
const {countries}=props;
return(

<div className='table'>
{countries.map((country)=>{
   // console.log(country);
   return (<tr>
        <td><b>{country.name}</b></td>
        <td><b>{country.cases}</b></td>
      
    </tr>
    );
})}
</div>

);

}

export default Table;