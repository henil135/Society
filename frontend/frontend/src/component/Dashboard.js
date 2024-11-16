
import React from 'react'
import Header from '../component/Header';
import Sidebar from "./Layout/Sidebar";
import Income from "../component/Income";
import TotalBalanceChart from "../component/TotalBalanceChart";
import Complaintlist from "../component/Complaintlist";

export default function Dashboard ()  {
  return (
    <div >
      <Sidebar/>
      <Header />
      <div className='dashboard-bg' style={{marginLeft:"280px"}}>
        <Income/>
        <TotalBalanceChart/>
        <Complaintlist/>
      </div>
    </div>
  )
}

