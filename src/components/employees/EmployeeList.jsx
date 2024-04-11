import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { Button, Card } from "react-bootstrap"

export const EmployeeList = () => {

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
                {allEmployees.map((employee) => {
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