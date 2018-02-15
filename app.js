//listen for submit
// and since want to delay showing results => we will call a function directly
document.getElementById('loan-form').addEventListener('submit', function(e) {

    // hide results
    document.getElementById('results').style.display = 'none'

    // show loader as soon as possible
    document.getElementById('loading').style.display = 'block'

    // clac results after 2 seconds
    setTimeout(calcResults, 2000);

    // hide the loader after 2 seconds

    

    e.preventDefault();


    
    
})


// calc results function
function calcResults() {
    
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value) //turn the amount to decimle
    const calcInterest = parseFloat(interest.value) / 100 / 12 
    const calcPayments = parseFloat(years.value) * 12 

    // compute monthly payment
    const x = Math.pow(1 + calcInterest, calcPayments)
    const monthly = (principle * x * calcInterest) / (x - 1)

    // check if monthly results is finite number 
    // finite number => Not infinite
    if(isFinite(monthly)) {
        monthPayment.value = monthly.toFixed(2) //toFixed() => gives you dec numbers .. 2 => two dec numbers
        totalPayment.value = (monthly * calcPayments).toFixed(2)
        totalInterest.value = ((monthly * calcPayments) - principle).toFixed(2)

        // set results fields display to block
        document.getElementById('results').style.display = 'block'

        // hide the loader
        document.getElementById('loading').style.display = 'none'
        
    } else {
        showError('Please check the numbers!')
    }
}

// show error function
function showError(error) {

    // set results fields display to block
    document.getElementById('results').style.display = 'none'

    // hide the loader
    document.getElementById('loading').style.display = 'none'



    // create a div
    const errorDiv = document.createElement('div')

    // add classes
    errorDiv.className = 'alert alert-danger'

    // add text
    errorDiv.appendChild(document.createTextNode(error)) //error is an arg that equales to the text that been passed when we call the function

    // get the element that we want to insert the errorDiv into
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    // insert error div above heading
    card.insertBefore(errorDiv, heading) //insertBefore(the parent element, the element you want to insert before)


    // clear error after 3 seconds
    setTimeout(clearError, 3000)
}

// clear error function
function clearError() {
    document.querySelector('.alert').remove()
}