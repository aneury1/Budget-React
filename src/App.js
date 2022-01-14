import logo from './logo.svg';
import './App.css';
import { Container, Stack ,Button} from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpensesModal from './components/AddExpensesModal';

import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './context/BudgetContext';
import {useState } from 'react';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';


function App() {
 const [ showModalBudget,setShowModalBudget] = useState(false)
 const [ showModalExpense,setShowModalExpense] = useState(false)
 const [addExpensesModalBudgetId,setAddExpensesModalBudgetId] =useState()
 const {budgets, expenses, getBudgetExpenses} = useBudgets()


 function toogleBudgetModal(){
    setShowModalBudget(showModal => (showModal===false?true:false))
 }

 function showAddBudgetModal(){
  setShowModalBudget(showModal =>true)
 }

 function openAddExpenseModal(budgetId){
    setShowModalExpense(true);
    setAddExpensesModalBudgetId(budgetId);
 }


return (
<>
<Container className="my-4">
        <Stack direction="horizontal">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={()=>showAddBudgetModal()}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expensses</Button>  
        </Stack>

       <div style={{
         display:"grid",
         gridTemplateColumns:"repeat(auto-fill, min-max(300px, 1fr)",
         gap:'1rem',
         alignItems:'flex-start'
       }}>

         {
         budgets.map(
           budget =>
           {
             const amount  = getBudgetExpenses(budget.id).reduce((total, expenses)=>total+expenses.amount, 0)
            //// alert(amount);
             return <BudgetCard 
                     key={budget.id} 
                     name={budget.name} 
                     amount={amount} 
                     max={budget.max}
                     onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
                     />
            })
        }
        <UncategorizedBudgetCard />
       </div>
     </Container>
     <AddBudgetModal show={showModalBudget} handleClose={toogleBudgetModal} />  
     <AddExpensesModal show={showModalExpense} handleClose={()=>setShowModalExpense(false)} defaultBudgetId={addExpensesModalBudgetId} />  
 
   </>
    );
}

export default App;
