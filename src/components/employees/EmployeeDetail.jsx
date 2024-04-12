import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getEmployeeById } from "../../services/userService"

export const EmployeeDetail = () => {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState()

    useEffect(() => {
        getEmployeeById(parseInt(employeeId)).then((res) => 
            setEmployee(res))
    }, [employeeId])

    return (
      <Form>
        {employee ? (
          <div>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter name" 
              value={employee.name}
              onChange={(event) => {
                const employeeCopy = {...employee}
                employeeCopy.name = event.target.value
                setEmployee(employeeCopy)
              }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter Email" 
              value={employee.email}
              onChange={(event) => {
                const employeeCopy = {...employee}
                employeeCopy.email = event.target.value
                setEmployee(employeeCopy)
              }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="integer" 
              placeholder="Enter Phone Number" 
              value={employee.phoneNumber}
              onChange={(event) => {
                const employeeCopy = {...employee}
                employeeCopy.phoneNumber = event.target.value
                setEmployee(employeeCopy)
              }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter Address" 
              value={employee.address}
              onChange={(event) => {
                const employeeCopy = {...employee}
                employeeCopy.address = event.target.value
                setEmployee(employeeCopy)
              }}
               />
            </Form.Group>
            <Button variant="success">Success</Button>
          </div>
          
        ) : (
          <p>Loading...</p>
        )}
      </Form>
    )
}

{/* {employee ? ( // Check if employee exists before accessing its properties

) : (
  <p>Loading...</p> // Display loading message while employee data is being fetched

  )} */} 