var next = document.querySelectorAll(".next");
var pages = document.querySelectorAll(".content > div");
var numPages = document.querySelectorAll(".num-step");
var currentPage = 1;
var moOrYe = true;
next.forEach(function (el, index) {
    el.addEventListener("click", function (e) {
        if (checkValid()) {
            if (index < next.length) {
                pages.forEach(function (el) {
                    el.classList.remove('active');
                });
                numPages.forEach(function (el) {
                    el.classList.remove('active');
                });
                if (index < next.length - 1) {
                    numPages[index + 1].classList.add("active");
                }
                pages[index + 1].classList.add("active");
                calculateTotal(moOrYe);
                insertToAdds();
            }
        }
    });
});
var plans = document.querySelectorAll(".plans .plan");
plans.forEach(function (plan) {
    plan.addEventListener("click", function (e) {
        plans.forEach(function (el) {
            el.classList.remove('active');
        });
        plan.classList.add("active");
        insertToPlan();
    });
});
var switchButton = document.querySelector('.switch .button');
var titleSub = document.querySelectorAll('.container-month-year p');
switchButton === null || switchButton === void 0 ? void 0 : switchButton.addEventListener("click", function (el) {
    if (switchButton.classList.contains("yearly")) {
        switchButton.classList.remove("yearly");
        titleSub[1].classList.remove('active');
        titleSub[0].classList.add('active');
        insertMonthlyPrice();
        editAddsMo();
        moOrYe = true;
    }
    else {
        switchButton.classList.add("yearly");
        titleSub[1].classList.add('active');
        titleSub[0].classList.remove('active');
        insertYearlyPrice();
        editAddsYear();
        moOrYe = false;
    }
    calculateTotal(moOrYe);
    insertToPlan();
});
var backButton = document.querySelectorAll(".buttons .back");
backButton.forEach(function (button, index) {
    button.addEventListener("click", function (e) {
        pages.forEach(function (page) {
            page.classList.remove("active");
        });
        pages[index].classList.add("active");
    });
});
var checkBox = document.querySelectorAll(".adds form > div");
checkBox.forEach(function (box, index) {
    box.addEventListener("click", function (e) {
        var check = document.querySelectorAll(".check-box");
        if (box.classList.contains('active')) {
            check[index].classList.remove("active");
            box.classList.remove("active");
        }
        else {
            check[index].classList.add("active");
            box.classList.add("active");
        }
        calculateTotal(moOrYe);
    });
});
function checkValid() {
    var statue = true;
    if (currentPage === 1) {
        var inputPageOne = document.querySelectorAll(".personal-info input");
        var errorMassege_1 = document.querySelectorAll(".personal-info form .empty-error");
        inputPageOne.forEach(function (input, index) {
            if (input.value === "") {
                errorMassege_1[index].style.display = "block";
                statue = false;
            }
            else {
                errorMassege_1[index].style.display = "none";
            }
        });
        if (checkEmail() && statue) {
            return true;
        }
        else {
            return false;
        }
    }
    return statue;
}
function checkEmail() {
    var inputPageOne = document.querySelectorAll(".personal-info input");
    var errorEmail = document.querySelector(".personal-info form .error-email");
    var rgex = /\w+@(gmail|outlook|yahoo).com\b/gi;
    if ((!(rgex.test(inputPageOne[1].value))) && inputPageOne[1].value !== "") {
        errorEmail.style.display = "block";
        return false;
    }
    else {
        var email = document.querySelector('.email');
        email.innerHTML = "".concat(inputPageOne[1].value);
        errorEmail.style.display = "none";
        return true;
    }
}
function insertMonthlyPrice() {
    var tiltePlan = document.querySelectorAll(".plan .title");
    tiltePlan.forEach(function (plan, index) {
        if (index === 0) {
            plan.innerHTML = "\n            <h3>Arcade</h3>\n            <p>$9/mo</p>\n            ";
            plan.parentElement.setAttribute("data-price", "9");
        }
        else if (index === 1) {
            plan.innerHTML = "\n            <h3>advanced</h3>\n            <p>$12/mo</p>\n            ";
            plan.parentElement.setAttribute("data-price", "12");
        }
        else {
            plan.innerHTML = "\n            <h3>advanced</h3>\n            <p>$15/mo</p>\n            ";
            plan.parentElement.setAttribute("data-price", "15");
        }
    });
}
function insertYearlyPrice() {
    var tiltePlan = document.querySelectorAll(".plan .title");
    tiltePlan.forEach(function (plan, index) {
        if (index === 0) {
            plan.innerHTML = "\n            <h3>Arcade</h3>\n            <p>$90/yr</p>\n            <span>2 months free</span>\n            ";
            plan.parentElement.setAttribute("data-price", "90");
        }
        else if (index === 1) {
            plan.innerHTML = "\n            <h3>Advanced</h3>\n            <p>$120/yr</p>\n            <span>2 months free</span>\n            ";
            plan.parentElement.setAttribute("data-price", "120");
        }
        else {
            plan.innerHTML = "\n            <h3>Pro</h3>\n            <p>$150/yr</p>\n            <span>2 months free</span>\n            ";
            plan.parentElement.setAttribute("data-price", "150");
        }
    });
}
function editAddsMo() {
    var price = document.querySelectorAll(".adds .price");
    price[0].innerHTML = "+$1/mo";
    price[0].parentElement.setAttribute("data-price", "1");
    price[1].innerHTML = "+$2/mo";
    price[1].parentElement.setAttribute("data-price", "2");
    price[2].innerHTML = "+$2/mo";
    price[2].parentElement.setAttribute("data-price", "2");
}
function editAddsYear() {
    var price = document.querySelectorAll(".adds .price");
    price[0].innerHTML = "+$10/yr";
    price[1].innerHTML = "+$20/yr";
    price[2].innerHTML = "+$20/yr";
    price[0].parentElement.setAttribute("data-price", "10");
    price[1].parentElement.setAttribute("data-price", "20");
    price[2].parentElement.setAttribute("data-price", "20");
}
function insertToPlan() {
    var tiltePlan = document.querySelector(".plans .plan.active .title");
    var tilteSummry = document.querySelector(".summry .plan");
    tilteSummry.innerHTML = "";
    if ((tiltePlan === null || tiltePlan === void 0 ? void 0 : tiltePlan.children.length) === 3) {
        var div = document.createElement("div");
        div.classList.add("title");
        div.innerHTML = "<h3>".concat(tiltePlan.children[0].innerHTML, "(Yearly)</h3>");
        var p_1 = document.createElement("p");
        p_1.innerHTML = 'change';
        p_1.classList.add('change');
        div.append(p_1);
        tilteSummry === null || tilteSummry === void 0 ? void 0 : tilteSummry.append(div);
    }
    else if ((tiltePlan === null || tiltePlan === void 0 ? void 0 : tiltePlan.children.length) === 2) {
        var div = document.createElement("div");
        div.classList.add("title");
        div.innerHTML = "<h3>".concat(tiltePlan.children[0].innerHTML, "(Monthly)</h3>");
        var p_2 = document.createElement("p");
        p_2.innerHTML = 'change';
        p_2.classList.add('change');
        div.append(p_2);
        tilteSummry === null || tilteSummry === void 0 ? void 0 : tilteSummry.append(div);
    }
    var p = document.createElement("p");
    p.innerHTML = "".concat(tiltePlan === null || tiltePlan === void 0 ? void 0 : tiltePlan.children[1].innerHTML);
    p.classList.add("price");
    tilteSummry === null || tilteSummry === void 0 ? void 0 : tilteSummry.append(p);
    var change = document.querySelector(".summry .plan .title p");
    change === null || change === void 0 ? void 0 : change.addEventListener("click", function (e) {
        pages.forEach(function (el) {
            el.classList.remove('active');
        });
        numPages.forEach(function (el) {
            el.classList.remove('active');
        });
        pages[1].classList.add('active');
        numPages[1].classList.add('active');
    });
}
function insertToAdds() {
    var tiltePlan = document.querySelectorAll(".adds form > div.active");
    var addPlan = document.querySelector(".summry .adds ");
    addPlan.innerHTML = "";
    tiltePlan.forEach(function (plan) {
        var div = document.createElement("div");
        var pTitle = document.createElement("p");
        pTitle.innerHTML = "".concat(plan.children[0].children[1].children[0].innerHTML);
        var pPrice = document.createElement("p");
        pPrice.innerHTML = "".concat(plan.children[1].innerHTML.trim());
        div.append(pTitle, pPrice);
        addPlan === null || addPlan === void 0 ? void 0 : addPlan.append(div);
    });
}
function calculateTotal(statue) {
    var prices = document.querySelectorAll(".active[data-price]");
    var totalPrice = document.querySelector(".total-price .price");
    var sum = 0;
    prices.forEach(function (el) {
        sum = sum + Number(el.getAttribute("data-price"));
    });
    if (statue) {
        totalPrice.innerHTML = "+$".concat(sum, "/mo");
    }
    else {
        totalPrice.innerHTML = "+$".concat(sum, "/yr");
    }
}
