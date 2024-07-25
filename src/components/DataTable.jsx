import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useRef } from 'react'

const DataTable = ({ data, onDelete, onSearch, onSortAscending, onSortDescending }) => {

    const sRef = useRef()
    const handleSearch = () => { 
        const keyword = sRef.current.value 
        onSearch(keyword)
    }

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <input type="text" placeholder="Search..." ref={sRef} className="form-control" />
                </Col>
                <Col xs="auto">
                    <Button onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button variant="secondary" className="me-2" onClick={onSortAscending}>Sort Ascending</Button>
                    <Button variant="secondary" onClick={onSortDescending}>Sort Descending</Button>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i className="bi bi-trash" onClick={() => onDelete(index)} style={{ cursor: 'pointer' }}></i>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
