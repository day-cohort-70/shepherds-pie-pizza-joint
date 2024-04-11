import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getEmployeeById } from "../../services/userService"

export const EmployeeDetail = () => {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState()

/*     useEffect(() => {
        getEmployeeById(parseInt(employeeId)).then(res => 
            setEmployee)
    }, [])
 */
    return (
        <Card key={employeeId} style={{ width: '80%' }}>
                        <Card.Body>
                          <Card.Title>{/* {employee.name} */}</Card.Title>
                          <Card.Text>
                            Phone Number: {/* {employee.phoneNumber} */}
                          </Card.Text>
                        </Card.Body>
                      </Card>
    )
}