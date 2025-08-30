// console.log("testing file")

// getting the data when page loaded

document.addEventListener("DOMContentLoaded", initlizer)

function initlizer() {
    const UsersData = JSON.parse(localStorage.getItem("usersList")) || []

    const demoDiv = document.getElementById('demo')
    if(UsersData.length>0) demoDiv.remove()
        
    // console.log(UsersData);
    for (let i = 0; i < UsersData.length; i++) {
        displayUser(UsersData[i])
    }
     sessionStorage.removeItem("editId")
}

function displayUser(obj) {
    // console.log("this is my first call");
    
    const type = Checktype(obj.selectElement)
    const cardsContainer = document.querySelector('#cards')
    const card = document.createElement('div')
    card.className = "col-4 mb-3"
    card.id = obj.id
    card.innerHTML = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <p class="card-text">${obj.expenss} 
                        ₹ ${obj.amount}  ${type}</p>
                        <button type="button" class="btn btn-success">Edit</button>
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>`

    const deleteBtn = card.querySelector(".btn-danger");
    deleteBtn.addEventListener("click", () => deleteCard(obj.id));

    const editBtn = card.querySelector(".btn-success");
    editBtn.addEventListener("click", () => editCard(obj));
    cardsContainer.appendChild(card)
}


function formSubmit(event) {
    event.preventDefault()
    // console.log("hiii");

    const expenss = event.target.expenss.value;
    const amount = event.target.amount.value;
    const selectElement = document.getElementById('inputGroupSelect01').value;
    // console.log(expenss , amount , selectElement);
    const obj = {
        expenss, amount, selectElement
    }

    const UsersData = JSON.parse(localStorage.getItem("usersList")) || []
    const editId = sessionStorage.getItem("editId")
    if (editId) {
        UsersData.forEach(element => {
            if (element.id == editId) {
                element.expenss = expenss
                element.amount = amount
                element.selectElement = selectElement
            }
        });

        const type = Checktype(selectElement)

        const card = document.getElementById(editId)
        card.querySelector(".card-text").textContent = `${expenss} ₹ ${amount} ${type}`

        sessionStorage.removeItem("editId")
        const submitBtn = document.querySelector('button[type="submit"]')
        submitBtn.textContent = "Submit"
    } else {
        addData(UsersData, obj)
    }
    // console.log(obj);
    event.target.reset()

    localStorage.setItem("usersList", JSON.stringify(UsersData))
}

function addData(usersData, obj) {
    obj.id = Date.now()
    usersData.push(obj)
    displayUser(obj)
}

function deleteCard(cardId) {
    console.log("this is the delete btn", typeof cardId);

    const card = document.getElementById(cardId)
    if (card) {
        card.remove()
    }

    let UsersData = JSON.parse(localStorage.getItem("usersList")) || []
    UsersData = UsersData.filter(data => data.id !== cardId)
    // for (let index = 0; index < UsersData.length; index++) {
    //    if (UsersData[index].id==cardId) {
    //         console.log("the id matched ",cardId);  
    //    }
    // }
    // console.log(UsersData);

    localStorage.setItem("usersList", JSON.stringify(UsersData))
}

function editCard({ id, expenss, amount, selectElement }) {
    const expenssName = document.getElementById('expenss')
    const expenssamount = document.getElementById('amount')
    const type = document.getElementById('inputGroupSelect01')
    // console.log(obj);

    expenssName.value = expenss
    expenssamount.value = amount
    type.value = selectElement

    const submitBtn = document.querySelector('button[type="submit"]')
    submitBtn.textContent = "Update"
    sessionStorage.setItem("editId", id)
    // console.log(submitBtn);  

}


function Checktype(selectElement) {
    let type;

    if (Number(selectElement) == 1) {
        type = "Petrol"
    } else if (Number(selectElement) == 2) {
        type = "Bill"
    } else {
        type = "Food"
    }
    return type;
}