export const getAllUsers = () => {
    return fetch("http://localhost:8088/users").then(res => res.json())
}

export const getAdminUsers = () => {
    return fetch ("http://localhost:8088/users?isAdmin=true").then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
      res.json()
    )
  }
  
  export const createUser = (customer) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then((res) => res.json())
  }

  export const getEmployeeById = (employeeId) => {
    return fetch(`http://localhost:8088/users/${employeeId}`).then(res => res.json())
  }

  export const saveEmployeeChanges = (employeeObj) => {
    return fetch(`http://localhost:8088/users/${employeeObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeObj)
    })
  }