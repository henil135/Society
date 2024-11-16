import React from 'react';
import balance from '../assets/total-balance.png'
import balanceRactangle from '../assets/Rectangle 1063.png'
import income from '../assets/total-income.png'
import incomeRactangle from '../assets/Rectangle 1063 (1).png'
import unit from '../assets/total-unit.png'
import unitRactangle from '../assets/Rectangle 1063 (2).png'
import expense from '../assets/total-exp.png'
import expRactangle from '../assets/Rectangle 1063 (3).png'

export default function Income() {
    return (
        <div className='container-fluid income'>
            <div className='row px-3 py-2'>
                <div className='col-sm-6 col-md-3 pt-3 position-relative px-1'>
                    <div className="card">   
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                            <img src={balanceRactangle} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Balance</h6>
                                <p className='mb-0'>₹ 2,22,520</p>
                            </div>
                            <div>
                                <img src={balance} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-3 pt-3 position-relative px-1'>
                    <div className="card">   
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                            <img src={incomeRactangle} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Income</h6>
                                <p className='mb-0'>₹ 55,000</p>
                            </div>
                            <div>
                                <img src={income} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-3 pt-3 position-relative px-1'>
                    <div className="card">   
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                            <img src={expRactangle} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Expense</h6>
                                <p className='mb-0'>₹ 20,550</p>
                            </div>
                            <div>
                                <img src={expense} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-3 pt-3 position-relative px-1'>
                    <div className="card">   
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                            <img src={unitRactangle} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Unit</h6>
                                <p className='mb-0'>₹ 20,550</p>
                            </div>
                            <div>
                                <img src={unit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
