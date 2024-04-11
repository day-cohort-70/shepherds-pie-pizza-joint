import { useState } from "react"
import { getAllUsers } from "../../services/userService"

export const EmployeeList = () => {

    const [allEmployees, setAllEmployees] = useState([])
    
    getAndSetAllEmployees = () => {
        getAllUsers().then((userArr) => {
            setAllEmployees(userArr)
        })
    }
    
    return (
        <div className="employees-container">
            <h1>Employees</h1>
            <div className="employee">
                {employees.map((employee) => {
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                          <Card.Title>${employee.name}</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                })}
            </div>
        </div>
    )
}