import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import productList from './accessory-products.json'
import DataTable from './components/DataTable'

import 'bootstrap-icons/font/bootstrap-icons.css'; 

function App() {

  const pRef = useRef()
  const qRef = useRef()
  const [price, setPrice] = useState(productList[0].price)

  const [selectedItems, setSelectedItems] = useState([])
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]) 

  const handleAdd = (e) => {
    const pid = pRef.current.value
    const product = productList.find(p => p.id == pid)
    const q = qRef.current.value
    const newItem = {
      ...product,
      qty: q
    }
    setSelectedItems(prevItems => [...prevItems, newItem])
  }

  const handleProductChanged = (e) => {
    const pid = e.target.value
    const product = productList.find(p => p.id == pid)
    const p = product.price
    console.log(p)
    setPrice(p)
  }

  const deleteItemByIndex = (index) => { 
    setSelectedItems(prevItems => prevItems.filter((item, i) => i !== index))
  }

  const search = (keyword) => { 
    setFilteredSelectedItems([...selectedItems.filter(item => item.name.includes(keyword))]) 
  } 

  useEffect(() => {
    setFilteredSelectedItems(selectedItems)
  }, [selectedItems])

  const sortAscending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => a.name.localeCompare(b.name))
    setFilteredSelectedItems(sortedItems)
  }

  const sortDescending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => b.name.localeCompare(a.name))
    setFilteredSelectedItems(sortedItems)
  }

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select ref={pRef} onChange={handleProductChanged}>
              {
                productList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              }
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            Price:
          </Col>
          <Col>
            {price}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <input type="number" ref={qRef}
              defaultValue={1} className="form-control"/>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="secondary" onClick={handleAdd}>Add</Button>
          </Col>
        </Row>

        <DataTable data={filteredSelectedItems} onDelete={deleteItemByIndex} onSearch={search} onSortAscending={sortAscending} onSortDescending={sortDescending}/>
      </Container>
    </>
  )
}

export default App
