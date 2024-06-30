document.addEventListener('DOMContentLoaded', function() {
   
    const expenseList = document.getElementById('expense-list');

    document.getElementById('expense-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let expenseName = document.getElementById('expense-name').value;
        let expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        let expenseDate = document.getElementById('expense-date').value;

        addExpenseToList(expenseName, expenseAmount, expenseDate);

        updateFinancialSummary(expenseAmount);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-date').value = '';
    });

    function addExpenseToList(name, amount, date) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name}</span>
            <span>$${amount.toFixed(2)}</span>
            <span>${date}</span>
            <button class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(li);

       
        li.querySelector('.delete-btn').addEventListener('click', function() {
            
            expenseList.removeChild(li);

            updateFinancialSummary(-amount); 
        });
    }

    function updateFinancialSummary(amount) {
        let totalSavingsInput = document.getElementById('total-savings-input');
        let investmentPortfolioElement = document.getElementById('investment-portfolio');
        let spendingOverviewElement = document.getElementById('spending-overview');

        let currentTotalSavings = parseFloat(totalSavingsInput.value) || 0;
        let updatedTotalSavings = currentTotalSavings - amount;
        totalSavingsInput.value = updatedTotalSavings.toFixed(2);

        let currentInvestmentPortfolio = parseFloat(investmentPortfolioElement.textContent.replace('', '').replace(',', ''));
        let updatedInvestmentPortfolio = currentInvestmentPortfolio + (amount * 0.2); // Example: Investing 20% of expense
        investmentPortfolioElement.textContent = `$${updatedInvestmentPortfolio.toFixed(2)}`;

        let currentSpendingOverview = parseFloat(spendingOverviewElement.textContent.replace('', '').replace(',', ''));
        let updatedSpendingOverview = currentSpendingOverview + amount;
        spendingOverviewElement.textContent = `$${updatedSpendingOverview.toFixed(2)}`;
    }

    document.getElementById('logout-btn').addEventListener('click', function() {
        
        sessionStorage.clear();
        
        window.location.href = 'index.html';
    });
});
