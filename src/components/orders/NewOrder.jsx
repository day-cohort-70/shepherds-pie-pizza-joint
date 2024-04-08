import { useState } from "react"
import { Button, Dropdown } from "react-bootstrap"

export const NewOrder = ({service, setService}) => {

    //on change, save event target value as string for state of 'service.type' 
    //based on that, if the state is equal to 'dine-in', display a new dorpdown for table number, and save event target value as 
    // table number in state service.table

    const handleServiceTypeChange = (type) => {
        setService({...service, type})
    }

    const handleTableChange = (table) => {
        setService({...service, table})
    }
    const tables = [1,2,3,4,5,6,7,8,9,10]

    

    return (
        <>
        <h1>New Order</h1>
        <Dropdown className="dropdown-main">
          <Dropdown.Toggle variant="warning" id="dropdown-basic" title={service.type || "Select an Option"}>
          {service.type || "Select an Option"}
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item 
            href="#/action-1"  
            onClick={() => handleServiceTypeChange("Dine-In")}
            >Dine In
            </Dropdown.Item>
            <Dropdown.Item 
            href="#/action-2" 
            onClick={() => handleServiceTypeChange("Delivery")}
            >Delivery</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {service.type === "Dine-In" && (
        <>
            <Dropdown className="dropdown-main">
                <Dropdown.Toggle variant="warning" id="dropdown-basic-tables" title={service.table || "Select a Table"}>
                    {service.table || "Select a Table"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {tables.map(table => (
                        <Dropdown.Item key={table} onClick={() => handleTableChange(table)}>{table}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {(service.table > 0 || service.table === "") && (
                <Button className="btn-secondary" variant="success">Create Order</Button>
            )}
        </>
        )}

        {service.type === "Delivery" && (
            <Button className="btn-secondary" variant="success">Create Order</Button>
        )}

            </>
      )

}