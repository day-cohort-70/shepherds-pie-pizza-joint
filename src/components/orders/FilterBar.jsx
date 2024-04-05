
import { useState, useEffect } from "react";

export const FilterBar = ({setDate, date}) => {
  

    useEffect(() => {
      // Function to format date as 'yyyy-mm-dd'
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      // Get today's date
      const today = new Date();
      const formattedDate = formatDate(today);
  
      // Set today's date as the initial value of the datepicker input field
      setDate(formattedDate);
    }, [])

 

    return (
        <div>
                <label htmlFor="datepicker">Select a Date </label>  
                <input
                type="date"
                id="datepicker"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
      </div>
    );
  }
