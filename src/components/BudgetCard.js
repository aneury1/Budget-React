
import { ProgressBar} from 'react-bootstrap'
import { Card, Stack, Button } from 'react-bootstrap'

import { currencyFormatter}  from '../utils'


function getProgressBarVariant(amount, max){
    const ration = amount / max;
    if(ration < .5)return "primary"
    if(ration < .75)return "warning"
    return "danger"
}


export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    onAddExpenseClick
}){

   const className =[]
   if(amount>max){
       className.push("bg-danger", "bg-opacity-10")
   }else if(gray){
    className.push("bg-light")
       
   }

   return (
       <Card className={className.join(" ")}>
         <Card.Body>
             <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                 <div className="me-2">{name}</div>
                 <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)}   
                 
                 {max && (
                 <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
                 )}
                 </div>
             </Card.Title>
             {max && (<ProgressBar className="rounded-pill"  
                          variant  ={getProgressBarVariant(amount, max)}
                          min={0}
                          max={max}
                          now={amount}
                          />)}
             <Stack direction="horizontal" gap="2" className="mt-4">
                 <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                 <Button variant="outline-secondary">View Expense</Button>
             </Stack>
         </Card.Body>
       </Card>
   )
}
