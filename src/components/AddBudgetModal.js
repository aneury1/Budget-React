import {useRef} from 'react';
import { Form, Button,Modal } from "react-bootstrap";

import { useBudgets } from "../context/BudgetContext";

export default function AddBudgetModal({show, handleClose}){
    
    const nameRef = useRef()
    const maxRef  = useRef()
    const {addBudget}= useBudgets()

    function handleSubmit(e){
        e.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        });
      
      
      
        if(typeof handleClose === "function")
           handleClose()
    }    
    return(<Modal show={show} onHide={handleClose}>
             <Form onSubmit={handleSubmit}>
                 <Modal.Header closeButton>
                     <Modal.Title>
                            New Budget
                     </Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <Form.Group className="mb-3" controlId="name">
                         <Form.Label>Name</Form.Label>
                         <Form.Control type="text" ref={nameRef}    required />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="name">
                         <Form.Label>Maximun Spending</Form.Label>
                         <Form.Control ref={maxRef} type="number" min={0} step={0.01}   required />
                     </Form.Group>
                     <div className="d-flex justify-content-end">
                         <Button variant="primary" type="submit">Add</Button>
                     </div>
                 </Modal.Body>
             </Form>
    </Modal>);
}