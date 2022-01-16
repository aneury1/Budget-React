import { Alert,  Card,  Form, Modal, Stack } from "react-bootstrap";

import { useBudgets } from "../context/BudgetContext";

function RenderBudgetHead({title,budget})
{
    return <Card>
        <h1 style={{paddingLeft:"10px"}}>{title}</h1>
        {JSON.stringify( budget)}
    </Card>
}

function RenderAllBudgets({budgets}){
  return <Stack>
      {
          budgets.map((budget)=><Alert key={budget.id} variant="primary">
                 <RenderBudgetHead budget={budget} title={budget.name}/>
              </Alert>
          )
      }
  </Stack>
}
function RenderExpensesBy({props}){
    return <>
       render RenderExpensesBy  
  </>
  }
export default function ViewExpenesModal({show,expenesesId}){
  
  const {expenses, budgets} = useBudgets()
  return <Modal show={show}>
           <Form>
              <Modal.Header closeButton>
                   <Modal.Title>
                      {expenesesId!==undefined?"Expensses":"BudgetList"} 
                   </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 {expenesesId===undefined?<RenderAllBudgets budgets={budgets} />:<RenderExpensesBy />}
              </Modal.Body>
           </Form>
   </Modal> 
}