import React, { useState, useEffect } from "react";
import { getDateFromString } from "./utils.js";

import "./style.bundle.css";
import "./App.scss";

function App() {
  console.log(getDateFromString("/Date(1676384718497+0200)/"));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    AvailableParkingLots: 0,
    TotalParkingLots: 0,
    TotalCarsParkedCount: 0,
    LastCarEntryDate:'',
    LastCarLeaveDate:''
  });
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const getData = () => {
    fetch("http://www.parkingapi.localdev/state", {method:'GET', headers: {'Accept':'application/json'}})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);
      });

    fetch("http://www.parkingapi.localdev/parking-cars", {method:'GET', headers: {'Accept':'application/json'}})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCars(res);
        console.log(res);
      });
      fetch("http://www.parkingapi.localdev/all-cars", {method:'GET', headers: {'Accept':'application/json'}})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAllCars(res);
        console.log(res);
      });
  };

  useEffect(() => {
    getData();
    // setInterval(() => {
    //   getData();
    // }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner-border w-100px h-100px" role="status" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="container-xxl">
                <h2 className="fs-3x mb-5">General info</h2>
                <div className="row g-5 g-xl-8 mb-5 mb-xxl-8">
                  <div className="col-md-4">
                    <div className="card shadow-sm">
                      <div className="card-header">
                        <h3 className="card-title">Free places / Used places</h3>
                      </div>
                      <div className="card-body">
                        <span className="fs-1"><span className="fw-bold fs-3x">{data.AvailableParkingLots}</span> / {data.TotalParkingLots - data.AvailableParkingLots}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card shadow-sm">
                      <div className="card-header">
                        <h3 className="card-title">Total places</h3>
                      </div>
                      <div className="card-body">
                        <span className="fs-3x fw-bold">{data.TotalParkingLots}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card shadow-sm">
                      <div className="card-header">
                        <h3 className="card-title">Total cars all time</h3>
                      </div>
                      <div className="card-body">
                        <span className="fs-3x fw-bold">{data.TotalCarsParkedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="fs-3x mb-5 mt-10">Current cars list</h2>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr className="fw-bold fs-6 text-gray-800">
                            <th>Number</th>
                            <th>Entry Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {cars.map((item, key)=>{

                          return (
                          <tr>
                            <td>{item.LicenseNumber}</td>
                            <td>{getDateFromString(item.LastTimeEntryDate)}</td>
                          </tr>
                          )
                        })}
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <h2 className="fs-3x mb-5 mt-10">All cars list</h2>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr className="fw-bold fs-6 text-gray-800">
                            <th>Number</th>
                            <th>Used Count</th>
                            <th>First Time Entry Date</th>
                            <th>Last Time Entry Date</th>
                            <th>Is On Parking</th>
                          </tr>
                        </thead>
                        <tbody>
                        {allCars.map((item, key)=>{

                        return (
                        <tr>
                          <td>{item.LicenseNumber}</td>
                          <td>{item.ParkingUsedCount}</td>
                          <td>{getDateFromString(item.FirstTimeEntryDate)}</td>
                          <td>{getDateFromString(item.LastTimeEntryDate)}</td>
                          <td>{item.CarParkingStatus}</td>
                        </tr>
                        )
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
