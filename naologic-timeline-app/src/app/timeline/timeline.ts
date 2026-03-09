import { CommonModule, } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {WorkOrderDocs} from '../../assets/work-orders'
// import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-timeline',
  standalone:true,
  imports: [CommonModule],//MatTableModule
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})

export class Timeline {
  months=["January","February", "March","April", "May", "June","July","August","September","October"]
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ];
  weeks=[];
  zoomLevel:"days"|"weeks"|"months"="days"
  // barPosition:{
  //   startPos:string;
  //   posWidth:string
  // }|null=null
  transformedWorkOrderDocs:WorkOrderDocument[]|null=null
  calculatedDateRange:{
      startDate:number;
      endDate:number
    }|null=null
  WorkCenters:{
    names:string[]|null,
    length:number|null
  }|null=null;
  ngOnInit(){
    this.setZoomLevel("days")
    // this.sortedWorkOrderDocs=this.sortDocuments();
    
   this.calculateDateRange()

    this.calculateWeekLabels();//FILL THIS OUT
    // this.barPosition=this.findBarPosition(3,8,1,10,1500);
    // console.log(this.barPosition)
  }
  setZoomLevel(level:"days"|"weeks"|"months"){
    this.zoomLevel=level
  }
  findBarPosition(workOrderDoc:WorkOrderDocument){
    // ?targetStartDate:number,targetEndDate:number,dateRangeStart:number,dateRangeEnd:number,containerWidth:number
    const containerWidth=1500;
    const targetStartDate=workOrderDoc.data.startDate as number;
    const targetEndDate=workOrderDoc.data.endDate as number;
    const dateRangeStart=this.calculatedDateRange?.startDate as number;
    const dateRangeEnd=this.calculatedDateRange?.endDate as number+86400000;//adds an extra day
    const calculatedStartPosition=( (targetStartDate - dateRangeStart) / (dateRangeEnd - dateRangeStart) ) * containerWidth
    const calculatedEndPosition=( (targetEndDate - dateRangeStart) / (dateRangeEnd - dateRangeStart) ) * containerWidth
    //HANDLE ISSUE OF WO FINISHING ON SAME DAY WEEK MONTH
    const positionCoords={
      'left': calculatedStartPosition+"px",
      'width': calculatedEndPosition-calculatedStartPosition+"px"
    }

    // console.log({positionCoords}) 
   
    return positionCoords
  }
  
  calculateDateRange(){
    if(!!WorkOrderDocs){
      let datesArray:number[]=[];
      this.transformedWorkOrderDocs=WorkOrderDocs.map(wo=>{
        const status=wo.data.status as WorkOrderStatus;
        const docType=wo.docType as "workOrder";
        const newWoDoc:WorkOrderDocument={...wo,
           docType,
         data:{...wo.data,
          startDate:new Date(wo.data.startDate).getTime(),
          endDate:new Date(wo.data.endDate).getTime(),
          status
         }
        }
        if(!this.WorkCenters){
          this.WorkCenters={
            names:[newWoDoc.data.name],
            length:1
          }
        }else{
          let canAddName=this.WorkCenters?.names?.every(name=>name!==newWoDoc.data.name)
        if(!!canAddName){
          this.WorkCenters?.names?.push(newWoDoc.data.name as string)
          this.WorkCenters.length =(this.WorkCenters.length as number)+1
        }
        }
        
        datesArray=[...datesArray,newWoDoc.data.endDate as number,newWoDoc.data.startDate as number]
         return newWoDoc
      }).slice(6,9)
      
      const sortedDates=datesArray.sort((a,b)=>a-b)
      console.log("sortedDated",sortedDates,"workcnters",this.WorkCenters,"docs:",this.transformedWorkOrderDocs)
      this.calculatedDateRange={
        startDate:sortedDates[0],
        endDate:sortedDates.at(-1) as number
      }
    }
  
  }
  
  //Need to set this up so you can display correctly dated labels when zoom level is at 'week'
  calculateWeekLabels(){
    this.months=[]
    return this.months;
  }

}

