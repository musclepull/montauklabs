import React, { PureComponent } from "react";
import moment from "moment";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { padding } from "@mui/system";


export default function PatentStackedChart(data) {
  var list = [];


  const dateFormatter = date => {
    if(date == ""){
      return "";
    }
    else{
      return moment(date).format("YYYY-MM-01").toString();
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    let totalCount = 0;
    payload.map((item) =>{
      totalCount += item.value;
    })
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{backgroundColor: "#FAFAFA", padding:15}}>
          <p className="label" style={{fontSize:14}}><strong>Date: </strong><span style={{paddingLeft:5}}>{label}</span></p>
          {
            payload.map((item) => (
              <p className="legend-key" style={{fontSize:14, marginTop:-10, color:item.fill}}><strong>{item.dataKey}: </strong><span style={{paddingLeft:5}}>{item.value}</span></p>
                         
          ))}

          <p className="count" style={{fontSize:14, marginTop:-10}}><strong>Total Patent Count: </strong><span style={{paddingLeft:5}}>{totalCount}</span></p>
        </div>
      );
    }
    else{
      return <div></div>
    }
  }

  for (const [key, value] of Object.entries(data.data.dict)) {
      const dataObj = {};
      dataObj.name = key; //date
      var A = 0;
      var B = 0;
      var C = 0; 
      var D = 0;
      var E = 0;
      var F = 0;
      var G = 0;
      var H = 0;
      var Y = 0;
      
      value.cpcDict.map(function(item){
        if(item.cpc_section_id == "A"){
          A++;
          dataObj.A = A;
        }
        else if(item.cpc_section_id == "B"){
          B++;
          dataObj.B = B;
        }
        else if(item.cpc_section_id == "C"){
          C++;
          dataObj.C = C;
        }    
        else if(item.cpc_section_id == "D"){
          D++;
          dataObj.D = D;
        }      
        else if(item.cpc_section_id == "E"){
          E++;
          dataObj.E = E;
        }      
        else if(item.cpc_section_id == "F"){
          F++;
          dataObj.F = F;
        }     
        else if(item.cpc_section_id == "G"){
          G++;
          dataObj.G = G;
        }
        else if(item.cpc_section_id == "H"){
          H++;
          dataObj.H = H;
        }
        else if(item.cpc_section_id == "Y"){
          Y++;
          dataObj.Y = Y;
        }
  
        const index = list.indexOf(dataObj);
        if(index > -1){
            list.splice(index,1);
        }
        //add to dict
        list.push(dataObj);
    })
}


  return (

    <BarChart
      width={1100}
      height={700}
      data={list}
      margin={{
        top: 20,
        right: 20,
        left: 0,
        bottom: 25
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" 
             tickFormatter={dateFormatter}
             label={{ value: "Patent Date Interval", position: "insideBottomCenter", dy: 30}}
             interval={20}
             
      />
      <YAxis label={{ value: "Patent Count", angle: -90,dy: -10, dx: -10}} />
      <Tooltip content={<CustomTooltip />} />
      <Legend layout="horizontal" verticalAlign="top" align="center" />
      <Bar dataKey="A" stackId="a" fill="#0061be" />
      <Bar dataKey="B" stackId="a" fill="#3cb549" />
      <Bar dataKey="C" stackId="a" fill="#2328cd" />
      <Bar dataKey="D" stackId="a" fill="#1f3f49" />
      <Bar dataKey="E" stackId="a" fill="#0a7dc2" />
      <Bar dataKey="F" stackId="a" fill="#3e7655" />
      <Bar dataKey="G" stackId="a" fill="#d28c09" />
      <Bar dataKey="H" stackId="a" fill="#1F8288" />
      <Bar dataKey="Y" stackId="a" fill="#d32d41" />
    </BarChart>
  );
}