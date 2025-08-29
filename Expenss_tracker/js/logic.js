// console.log("testing file")

// getting the data when page loaded
document.addEventListener("DOMContentLoaded", initlizer)

function initlizer() {
    const UsersData = JSON.parse(localStorage.getItem(UsersData)) || []

    for (let i = 0; i < UsersData.length; i++) {
        displayUser(UsersData[i])
    }
}

function displayUser(obj) {
    
}

function formSubmit(event) {
    event.preventDefault()
    console.log("hiii");

    const expenss = event.target.expenss.value;
    const amount = event.target.amount.value;
    const selectElement = document.getElementById('inputGroupSelect01').value;
    // console.log(expenss , amount , selectElement);
    const obj = {
        expenss, amount, selectElement
    }

    const UsersData = JSON.parse(localStorage.getItem(UsersData)) || []
    addData(UsersData,obj)
    localStorage.setItem("usersList", JSON.stringify(obj))
}

function addData(usersData, obj) {
    obj.id = Date.now()
    usersData.push(obj)
    display(obj)
}