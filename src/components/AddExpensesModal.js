import {useRef} from 'react';
import { Form, Button,Modal } from "react-bootstrap";

import { useBudgets ,UNCATEGORIZED_BUDGET_ID} from "../context/BudgetContext";

export default function AddExpensesModal({show, handleClose, defaultBudgetId}){
    
    const descriptionRef = useRef()
    const amountRef      = useRef()
    const budgetIdRef    = useRef()
    
    
    const {addExpenses, budgets}= useBudgets()

  
  
    function handleSubmit(e){
        e.preventDefault();

      /////  alert(defaultBudgetId+" "+budgetIdRef.current.value);

        addExpenses(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
            }
        );
        if(typeof handleClose === "function")
           handleClose()
    }    
   
  ///  alert(defaultBudgetId);
   
   return(<Modal show={show} onHide={handleClose}>
             <Form onSubmit={handleSubmit}>
                 <Modal.Header closeButton>
                     <Modal.Title>
                            New Expenses
                     </Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <Form.Group className="mb-3" controlId="description">
                         <Form.Label>Description</Form.Label>
                         <Form.Control type="text" ref={descriptionRef}    required />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="amount">
                         <Form.Label>Amount</Form.Label>
                         <Form.Control ref={amountRef} type="number" min={0} step={0.01}   required />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="budget">
                         <Form.Label>Budget</Form.Label>
                         <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
                            <option key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                            {
                                budgets.map(budget=>{

                                    return(<option key={budget.id} value={budget.id} name={budget.name}>
                                     {budget.name}   
                                     </option>);
                                })
                            }    

                         </Form.Select>
                     </Form.Group>
                          
                     <div className="d-flex justify-content-end">
                         <Button variant="primary" type="submit" >Add</Button>
                     </div>
                 </Modal.Body>
             </Form>
    </Modal>);
}