import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { Button, Card } from "react-bootstrap"
import "./Employees.css"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
const navigate = useNavigate()
    const [allEmployees, setAllEmployees] = useState([])
    
    const getAndSetAllEmployees = () => {
        getAllUsers().then((userArr) => {
            setAllEmployees(userArr)
        })
    }

    useEffect(() => {
        getAndSetAllEmployees()
    }, [])



    return (
        <div className="employees-container">
            <h1>Employees</h1>
            <div className="employee">
                {allEmployees.map((employee) => (
                        <Card key={employee.id} style={{ width: '80%' }}>
                        <Card.Body>
                          <Card.Title>{employee.name}</Card.Title>
                          <Card.Text>
                            Phone Number: {employee.phoneNumber}
                          </Card.Text>
                          <Button variant="primary" onClick={() => navigate(`/employees/${employee.id}`)}>View/Edit Employee Details</Button>
                        </Card.Body>
                      </Card>
            ))}
            </div>
        </div>
    )
}