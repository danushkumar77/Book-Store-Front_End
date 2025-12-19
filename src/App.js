import { NavLink, Outlet } from "react-router-dom";
import './App.css'; 
import Header from "./Common/Header";
import { useEffect, useState } from "react";



function App() {
  let [data, setData] = useState([]);

  useEffect(() =>
  {
    const fetchBookstoreData = async () => 
      {
      try {
        const response = await fetch (`${process.env.REACT_APP_BACKEND_URL}/Bookstore.json`);
        const da = await response.json();
        setData(da);
      } catch (err) {}
    };
    fetchBookstoreData();
 });
  return (
    <div className="App">
       <Header></Header>
      <Outlet></Outlet>
      </div>
    
  );
}

export default App;
