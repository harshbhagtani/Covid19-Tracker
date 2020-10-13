import { red } from '@material-ui/core/colors';
import React from 'react';

//https://disease.sh/v3/covid-19/historical/all?lastdays=



class Linegraph extends React.Component{

constructor(){
    super();
    this.state={
        date:'',
        newcases1:0,
        visi:'hidden',
        
    }
}

 buidldata=(data)=>{

    const ans=[];
     let last=0;
     let check=0;
     let mx=0;
    for(var i in data){
        
       if(check===0){
        check=1;
        last=data[i];
        continue;
       }
       if(mx<data[i]-last)mx=data[i]-last;
       const value=data[i]-last;
       last=data[i];
       const obj={
           date:i,
           newcases:value
       }
       ans.push(obj);
      
    }
console.log(mx);
   
    
    
return [ans,mx];
}



 hoverdata=(data)=>{
    const {date,newcases1}=this.state;
console.log(data);
this.setState({
    date:data.date,
newcases1:data.newcases,
visi:'visible'
})

}

checkvisible=()=>{
   this.setState({
    visi:'hidden'
   }) 
}

render(){
    
    console.log(this.props.data);
const Dataset=this.buidldata(this.props.data,mx);
const dataset=Dataset[0];
var mx=(Dataset[1]*3)/2;

const {date,newcases1,visi}=this.state;

return(

<div className="graph">
    <div className="date-cases" style={{visibility:visi}}><h3>Date-:{date}</h3>
    <h3>+{newcases1}</h3></div>
    <div className="scale" >
         <div>{Math.floor(mx/1000)}K</div>
        <div>{Math.floor((3*mx)/4000)}K</div>
        <div>{Math.floor(mx/2000)}K</div>
        <div>{Math.floor(mx/4000)}K</div>
        <div>0</div>
    </div>
{dataset.map((data)=>{
   
    const val=((data.newcases*250)/mx);
   // console.log(mx,' ',data.newcases,' ',val);
    
return(
    <div style={{height:val,width:2}} className="bars" onMouseEnter={()=>this.hoverdata(data)}
    onMouseLeave={this.checkvisible}></div>
);
})}

</div>

);}

}

export default Linegraph;