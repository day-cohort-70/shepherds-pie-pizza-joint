import Dropdown from "react-bootstrap/Dropdown"

export const FilterBar = () => {

    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item >Action</Dropdown.Item>
            <Dropdown.Item >Another action</Dropdown.Item>
            <Dropdown.Item >Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
}