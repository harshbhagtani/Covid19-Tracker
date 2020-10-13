import React from 'react';
import{FormControl,Select,MenuItem,CardContent,Card } from '@material-ui/core';
import Statsbox from './Statsbox';
import {sortdata} from './Usefun';
import Table from './Table.js';
import Linegraph from './Linegraph.js';
import './App.css';
import Map from './Map';
import "leaflet/dist/leaflet.css";

//https://disease.sh/v3/covid-19/countries
class App extends  React.Component {
constructor(){
super();

this.state={
  countries:[],
  country:'Worldwide',
  Cases:2200,
  Recoveries:1200,
  Deaths:200,
  CasesTotal:12000,
  RecoveriesTotal:1200,
  DeathsTotal:400,
  DataTable:[],
  Lastmonths:{},
  center:{lat:25.44,lng:-23.25},
  zoom:3,
  mapcountry:[]
}

}

componentDidMount(){
 // const {countries}=this.state;
  const getdata= async ()=>{
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      const countries2=data.map((country)=>{
        return{
          name:country.country,
          value:country.countryInfo.iso2
        }

      })

      const table=data.map((country)=>{
        return{
          name:country.country,
          cases:country.cases
        }

      })
      const mapi=data.map((country)=>{
        return{
          name:country.country,
          cases:country.cases,
          recovered:country.recovered,
          deaths:country.deaths,
          lat:country.countryInfo.lat,
          long:country.countryInfo.long,
          flag:country.countryInfo.flag
          
        }

      })
      
    //  console.log(countries2);
     const sorttable=sortdata(table);
      this.setState({
countries:countries2,
DataTable:sorttable,
mapcountry:mapi
      })

    })



    
  }

  getdata();
  let url=`https://disease.sh/v3/covid-19/all`
  fetch(url)
  .then(response=>response.json())
  .then(data=>{
    console.log(data);

    this.setState({
      Cases:data.todayCases,
      Recoveries:data.todayRecovered,
      Deaths:data.todayDeaths,
      CasesTotal:data.cases,
      RecoveriesTotal:data.recovered,
      DeathsTotal:data.deaths
  
    })

  })

  fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
  .then(response=>response.json())
  .then(data=>{
    console.log(data.cases);
    this.setState({
      Lastmonths:data.cases
    })
     
    
    /* const history = data.map((val)=>{
            return val;
      })*/

  })
  


}
onselectcountry=(e)=>{
  const {countries,country}=this.state;
  console.log(e.target.value);
  this.setState({
    country:e.target.value
  })
  if(e.target.value==='Worldwide')var url=`https://disease.sh/v3/covid-19/all`;
  else var url=`https://disease.sh/v3/covid-19/countries/${e.target.value}`;
   
  fetch(url)
  .then(response=>response.json())
  .then(data=>{
    console.log(data);
    var lat;
    var long;
   if(e.target.value==='Worldwide'){
    lat=25.44;
    long=-23.25;
   }
   else{lat=data.countryInfo.lat;
   long=data.countryInfo.long;}


    this.setState({
      Cases:data.todayCases,
      Recoveries:data.todayRecovered,
      Deaths:data.todayDeaths,
      CasesTotal:data.cases,
      RecoveriesTotal:data.recovered,
      DeathsTotal:data.deaths,
      center:{lat:lat,lng:long},
      zoom:5
      
  
    })

  })



setTimeout(()=>{
if(e.target.value==='Worldwide'){
  fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
  .then(response=>response.json())
  .then(data=>{
    console.log(data.cases);
    this.setState({
      Lastmonths:data.cases
    })
     
  })
  return;
}


  fetch(`https://disease.sh/v3/covid-19/historical/${e.target.value}?lastdays=120`)
  .then(response=>response.json())
  .then(data=>{
   
   // console.log('sss',country);
   if(data.timeline.cases!==undefined){
    this.setState({
     Lastmonths:data.timeline.cases
    })
   }
  })
  .catch((error)=>{

  })
},800)

}
  




  render(){
    const {countries,country,Cases,Recoveries,Deaths
    ,CasesTotal,RecoveriesTotal,DeathsTotal,DataTable,Lastmonths,center,zoom,mapcountry}=this.state;
   

   
  return (
    <div className="App">
      <div className="appleft">
      <div className="appheader">
     <h1 style={{color:'red'}}>Covid-19 tracker</h1>
    <FormControl className='appdropdown' style={{background:'white'}}>
      <Select variant='outlined' onChange={this.onselectcountry} value={country}>
        <MenuItem value="Worldwide">Worldwide</MenuItem>
       {countries.map(country=>{
         return <MenuItem value={country.value}>{country.name}({country.value})</MenuItem>
       })}
       {/* <MenuItem>Worldwide</MenuItem>
         <MenuItem>India</MenuItem>
         <MenuItem>America</MenuItem>
       <MenuItem>Russia</MenuItem>*/}
      </Select>
    </FormControl>
    </div>

    <div className="appstats">
      <Statsbox title="Covid-19 Cases" cases={Cases} total={CasesTotal} color='red'/>
      <Statsbox title="Covid-19 Recoveries" cases={Recoveries} total={RecoveriesTotal}  color='green'/>
      <Statsbox  title="Covid-19 Deaths" cases={Deaths} total={DeathsTotal}  color='red'/>

    </div>
   <Map center={center}
   zoom={zoom}
   countries={mapcountry}/>
    </div>

    <Card className="appright">
      <CardContent>
        <h2>Live Cases by Countries</h2>
        <br></br>
        <Table countries={DataTable}/>
        <br></br>
         <h2>{country} New Cases(Last 3 Months)</h2>
         
         <Linegraph data={Lastmonths}
         />
      </CardContent>

    </Card>
    </div>
  );
      }
}

export default App;
