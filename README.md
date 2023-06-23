# CustomerTransactions
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase. 
 
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.
(e.g., a $120 purchase = 2x$20 + 1x$50 = 90 points).
 
Given a record of every transaction during a three-month period, calculate the reward points earned for each customer per month and total.

## Install dependencies
`npm install`

## Start application
You can run the app at port 3000 to view it in the browser\
`npm start`

## Run Unit Tests
`npm test`

# Transactions.js
- mock file includes transaction details which contains customerId, name, amount, date 

# CusomerRewards Component
- `CustomerRewards` component displays customer rewards information in a table format. It receives props as an object with properties `customerId`, `name`, `monthlyRewards`, and `totalRewards`.
- Defined a helper function called `getMonthName`. It takes month number as input and gives month name
- Used JSX fragment to wrap multiple elements. JSX code within the component represents the structure and content of the table to display the customer rewards information
- Table contents explanation
    - First row: Displays customer ID, Name and Total Rewards
    - Second row: Spacer row with an empty cell and Transaction label in second cell
    - Third row: Reperesents table header with Month and points
    - After the header row, a loop is used to iterate over the keys of the monthlyRewards object using Object.keys(monthlyRewards). For each month, a new table row is generated.
    - Each row consists of month and Points.
- Finally `CustomerRewards` is exported to be used in `RewardPointsCalculator`

# CustomerRewards.test.js
- The describe function is used to group related tests in `CustomerRewards`. The mockRewards object is defined with sample reward data. It contains a total property set to 200 and a monthly object which contains rewards for 4, 5 and 6 months
    - Test 1: `render components correctly` - verifies the components renders without any errors/exceptions. 
        - It utilizes the render function from the @testing-library/react library to display the CustomerRewards component with simulated data, such as customerId, name, monthlyRewards, and totalRewards. The screen.getByText function is employed to locate the customer element that displays the text 'CUST001'. It asserts that the customer element is in the document.
    - Test 2: `displays total rewards correctly` - Verifies the component displays the total rewards correctly. 
        - The totalRewards property is set to 200. It then searches for the total rewards element containing the text '200' using screen.getByText. It then asserts that the total rewards element is in the document.
    - Test 3: `displays monthly rewards correctly` - Validates that the component displays monthly rewards correctly
        - It renders customer rewards component with mock data, but now it is specifically set to monthly reward of 100 for a given month 4. It searches and checks if the reward element is present in the document


# RewardPointsCalculator.js
- `RewardPointsCalculator` components calculates and displays reward points for customers based on transaction data
- A state variable `transactionData` is initialized using the useState hook. Initially it is an empty array and will be updated with transaction data fetched from API call.
- Used the useEffect hook to simulate an API call and fetch transaction data. we defined the empty dependency array so that it will run only when the component mounts. defined the `fetchtransactions` function to update transactionData after simulated 1 second delay.
- `calculatepoints` function defined which takes amount as a parameter. The points are calculated based on amount >100, >50 and <100 and <50
- `getMonthFromDate` function takes date as parameter and returns month from it.
- `calculateRewards` function takes array of transactions as parameter. It calculates the rewards for each customer. it iterates over each transaction and extraacts detaials from it.
    - It calls `getMonthFromDate` function to get month, and also calls `calculatePoints` function to calculate reward points.
    - checks customerID/ month is not present in rewardsByCustomer
    - Then updates the name, total, and monthly properties of the rewardsByCustomer[customerId] object based on the transaction data.
-  `calculateRewards` function is called with the transactionData state variable, and the result is stored in the `rewardsByCustomer` variable.
- JSX code enclosed in <div>. It renders "Loading Traansaction data" conditionally and if transactiondata is not empty it renders the customer rewards information.


# RewardPointsCalculator.test.js
- `beforeEach` function is used to to mock the behavior of asynchronous functions that involve timers in the component.
- The describe function is used to group related tests in RewardPointsCalculator.
    - Test 1: `render components correctly` - verifies the components renders without any errors/exceptions. 
        - It uses the render function from @testing-library/react to render the RewardPointsCalculator component. Then it uses the screen.getByText function to find the heading element containing the text 'Reward Points Calculator'. Finally, it asserts that the heading element is present in the document.
    - Test 2: `displays loading message when transaction data is not available` - verifies that a loading message is displayed when the transaction data is not yet available.
        - Similar to previous test case it checks for the loading message element instead.
    - Test 3: `calculates and displays rewards for each customer` - It simulates the scenario where Transaction data is available and after a delay and ensures reward are calculated correctly.
        - It simulates 5 seconds delay in `act` function for transaction data to be fetched.
        - After delay it asserts if customer element with ID CUST001 is present and total reward element displaying 390
        - Similarly it asserts if customer with ID CUST002 is present and tottal reward element displaying 55

# App.js
- RewardPointsCalculator is rendered in the App.js

