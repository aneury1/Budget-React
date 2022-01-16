
import './App.css';
import { Container, Stack, Button, Row, Col, Card, Figure, Nav} from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';

import AddBudgetModal from './components/AddBudgetModal';
import AddExpensesModal from './components/AddExpensesModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpenesModal from './components/ViewExpensesModal';


import { useBudgets } from './context/BudgetContext';
import { useState } from 'react';



function App() {
  const [showModalBudget, setShowModalBudget] = useState(false)
  const [showModalExpense, setShowModalExpense] = useState(false)
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()


  function toogleBudgetModal() {
    setShowModalBudget(showModal => (showModal === false ? true : false))
  }

  function showAddBudgetModal() {
    setShowModalBudget(showModal => true)
  }

  function openAddExpenseModal(budgetId) {
    setShowModalExpense(true);
    setAddExpensesModalBudgetId(budgetId);
  }

  function NavBar(){
    return(
      <Nav
  activeKey="/home"
  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
>
  <Nav.Item>
    <Nav.Link href="/home">Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
    </Nav.Link>
  </Nav.Item>
</Nav>
    )
  }


  function RenderProfile(){
      return(
        <Card className='mt-5 m-3'>
        <Stack>
        <Figure>
           <Figure.Image
             width={171}
             height={180}
             alt="171x180"
             src={IMG_URL}
           />
           <Figure.Caption>
             Nulla vitae elit libero, a pharetra augue mollis interdum.
           </Figure.Caption>
         </Figure>
         <Button>View Whole Profile</Button>
        </Stack>
       </Card>
      )
  }



  function RenderBody() {
    return (
   
      <Container className="my-4">
    
        <Stack direction="horizontal">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => showAddBudgetModal()}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expensses</Button>
        </Stack>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, min-max(300px, 1fr)",
          gap: '1rem',
          alignItems: 'flex-start'
        }}>

          {
            budgets.map(
              budget => {
                const amount = getBudgetExpenses(budget.id).reduce((total, expenses) => total + expenses.amount, 0)
                //// alert(amount);
                return <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                />
              })
          }
          <UncategorizedBudgetCard />
        </div>
      </Container> 
    )
  }

  const IMG_URL = "https://avatars.githubusercontent.com/u/5065340?v=4"
  return (
    <>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <Col md={{ span: 3 }}>
           <RenderProfile />
        </Col>
        <Col md={{ span: 6 }}>
          <h2 className='mt-5'>Share Status??</h2>
          <RenderBody />
        </Col>
        <Col md={{ span: 3 }}>
        <RenderProfile />
        </Col>
      </Row>





      <AddBudgetModal show={showModalBudget} handleClose={toogleBudgetModal} />
      <AddExpensesModal show={showModalExpense} handleClose={() => setShowModalExpense(false)} defaultBudgetId={addExpensesModalBudgetId} />
      <ViewExpenesModal show={false} />
    </>
  );
}

export default App;
