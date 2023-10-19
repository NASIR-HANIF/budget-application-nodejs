
import { ajax } from "./common.js"
let budget = document.querySelector("#budget");
let title = document.getElementById("title");
let cost = document.getElementById("cost");
let expence_list = document.getElementById("expence-list");
let expence = document.getElementById("expence");
let balance = document.getElementById("balance");
let product_btn = document.getElementById("product-btn");
let update_btn = document.getElementById("update-btn");
let totelBudget = 0;
let allItemData = [];
let price = []


// create total budget in database 
$(document).ready(() => {
    $(".budget-form").submit(async (e) => {
        e.preventDefault();
        if (budget.value != "") {
            const request = {
                type: "POST",
                url: "http://localhost:1000/api/budget",
                data: new FormData(e.target),
            }
            try {
                const response = await ajax(request)
                $(".toast").toast('show');
                $(".toast").addClass("toastShow")
                $("#total-budget").html(response.data.budget)
                $(".toast-body").html(response.message)
                $(".budget-form")[0].reset()
            } catch (error) {
                console.log(error)
                $(".toast").toast('show');
                $(".toast").addClass("toastShow")
                $(".toast-body").html(error.message)

            }

        } else {
            alert("Budget is empty !")
        }


    })
})


// total budget access

const totalBudget = async () => {
    const request = {
        type: "GET",
        url: "http://localhost:1000/api/budget"
    }
    try {
        const response = await ajax(request);
        if (response[0] != undefined) {
            totelBudget = response[0].budget
            $("#total-budget").html(totelBudget)
        } else {
            $("#total-budget").html("There is no budget")
        }

    } catch (error) {
        console.log(error)

    }

}
totalBudget()

// store product item in database

$(".budget-item").submit(async (e) => {
    e.preventDefault()
    if (title.value != "" && cost.value != "") {
        const request = {
            type: "POST",
            url: "http://localhost:1000",
            data: new FormData(e.target),
        }
        try {
            const response = await ajax(request)
            $(".toast").toast('show');
            $(".toast").addClass("toastShow")
            $("#total-budget").html(response.data.budget)
            $(".toast-body").html(response.message)
            $(".budget-item")[0].reset()
            getAllItem();
            showBudgetItem(allItemData)
        } catch (error) {
            console.log(error)
            $(".toast").toast('show');
            $(".toast").addClass("toastShow")
            $(".toast-body").html(error.message)

        }
    } else {
        alert("Field is Empty !")
    }
})



//budget item access
const getAllItem = async () => {
    const request = {
        type: "GET",
        url: "http://localhost:1000"
    }
    try {
        let response = await ajax(request);
        allItemData = response
        if (allItemData.length != 0) {
            showBudgetItem(allItemData)

        } else {
            expence_list.innerHTML = "Thear is no data";
            // show final price
            expence.innerHTML = "0";
            balance.innerHTML = "0";
        }
    } catch (error) {
        expence_list.innerHTML = "Thear is no data"
    }
}
getAllItem();


const showBudgetItem = (data) => {
    price = [];
    expence_list.innerHTML = "";
    data.forEach((item) => {
        let row = `
        <div id="${item._id}" class="row mt-3 mb-3  b-border" >
            <div class="col-md-6 mt-3 d-flex justify-content-between">
                <h5>${item.title}</h5>
                <h5 class="price">${item.cost}</h5>
            </div>
            <div class="col-md-6 mt-3 d-flex justify-content-end">
                <i class="fa fa-edit edit-btn"></i>&nbsp; &nbsp; &nbsp;
                <i class="fa fa-trash delete-btn" >
                </i></i>
            </div>
        </div>`;
        expence_list.innerHTML += row

    })

    let i
    for (i = 0; i < data.length; i++) {
        price[i] = data[i].cost
    }

    let final_item_price = 0;

    for (i = 0; i < price.length; i++) {
        final_item_price += price[i]
    }

    // show final price
    expence.innerHTML = final_item_price;
    balance.innerHTML = totelBudget - final_item_price;





    // start delete codding
    let delete_btns = document.getElementsByClassName("delete-btn")
    for (i = 0; i < delete_btns.length; i++) {
        delete_btns[i].onclick = async function () {
            let cnf = window.confirm("Do you wanna delete it ?");
            if (cnf) {
                let parentEl = this.parentElement.parentElement;
                let id = parentEl.getAttribute("id");
                const request = {
                    type: "DELETE",
                    url: `http://localhost:1000/${id}`

                }

                try {
                    const response = await ajax(request);
                    $(".toast").toast('show');
                    $(".toast").addClass("toastShow")
                    $(".toast-body").html(response.message);
                    getAllItem();

                } catch (error) {
                    console.log(error)
                }

            } else {
                alert("your data is save")
            }
        }
    }


    // edit item 
    let edit_btns = document.getElementsByClassName("edit-btn")
    for (i = 0; i < edit_btns.length; i++) {
        edit_btns[i].onclick = async function () {
            let cnf = window.confirm("Do you wanna update it ?");

            if (cnf == true) {

                let parentEl = this.parentElement.parentElement;
                let eid = parentEl.getAttribute("id");

                let h5_price = this.parentElement.previousElementSibling.children[1].textContent;
                let h5_data = this.parentElement.previousElementSibling.children[0].textContent;
                h5_data.trim()
                h5_price.trim()
                title.value = h5_data;
                cost.value = h5_price;
                title.focus();
                product_btn.style.display = "none";
                update_btn.classList.remove("d-none");

                update_btn.onclick = async function () {
                    localStorage.removeItem("budget_" + h5_data)
                    let p_title = title.value;
                    let p_cost = cost.value;
                    let formData = new FormData()
                    formData.append("title", p_title)
                    formData.append("cost", parseInt(p_cost))
                    const request = {
                        type: "PUT",
                        url: `http://localhost:1000/${eid}`,
                        data: formData

                    }

                    try {
                        const response = await ajax(request);
                        $(".budget-item")[0].reset()
                        product_btn.style.display = "block";
                        update_btn.classList.add("d-none");
                        $(".toast").toast('show');
                        $(".toast").addClass("toastShow")
                        $(".toast-body").html(response.message)
                        getAllItem()

                    } catch (error) {
                        console.log(error)
                    }
                }



            } else {
                alert("your data is save !")
            }
        }
    }
}



