import React, { useContext } from "react"
import { v4 as uuidV4 } from 'uuid';

import useLocalStorage from '../hooks/useLocalStorage.js';

const BudgetContext = React.createContext();


export const UNCATEGORIZED_BUDGET_ID = "uncategorized";


export const useBudgets = () => {
    const context = useContext(BudgetContext)
    return context
}

export const BudgetsProvider = ({ children }) => {



    const [budgets, setBudgets] = useLocalStorage("budgets"    , []) 
    const [expenses, setExpenses] = useLocalStorage("expenses" , [])

    function addExpenses({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        });
    }

    function getBudgetExpenses(budgetId) {
        const val = expenses.filter(expense => expense.budgetId === budgetId)
        console.log(JSON.stringify(val));
        return val;
    }
  
  
    function addBudget({ name, max, amount }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) return prevBudgets
            return [...prevBudgets, { id: uuidV4(), name, max, amount }]
        });
    }
 
 
 
    function deleteBudget(id, { name }) {
        setBudgets(prevBudgets => {
            prevBudgets.filter(budget => {
                return budget.id !== id;
            })
        })
    }



    function deleteExpenses(id) {
        setExpenses(prevExpenses => {
            prevExpenses.filter(expense => {
                return expense.id !== id;
            })
        })

    }


    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpenses
    }}>
        {children}
    </BudgetContext.Provider>

}