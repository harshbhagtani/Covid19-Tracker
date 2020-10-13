import React from 'react';
import {Circle,Popup} from 'react-leaflet';

export const sortdata=(data)=>{
const sorteddata=[...data];

sorteddata.sort((a,b)=>b.cases-a.cases);
return sorteddata;
}

export const showdatamap=(data)=>(

data.map((country)=>(

    <Circle
    center={[country.lat,country.long]}
    fillOpacity={.3}
    color='#fb4443'
    fillColor='#fb4443'
    radius={country.cases/7}
  

    >
          <Popup>
              <img src={country.flag} className="flag"></img>
              <div><b>Country-</b>{country.name}</div>
              <div><b>Cases-</b>{country.cases}</div>
              <div><b>Recovered-</b>{country.recovered}</div>
              <div><b>Deaths-</b>{country.deaths}</div>
          </Popup>
    </Circle>
))


);