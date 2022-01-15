

import React from 'react'
import {useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {
    
    const { getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expenses)=>total+expenses.amount, 0)
    if(amount===0)return null;
    return (
        <BudgetCard amount={amount} name={UNCATEGORIZED_BUDGET_ID} gray {...props}/>
    )
}
