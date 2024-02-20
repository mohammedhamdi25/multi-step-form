const next = document.querySelectorAll(".next")
const pages = document.querySelectorAll(".content > div")
const numPages =document.querySelectorAll(".num-step")
let currentPage = 1;
let moOrYe = true

next.forEach((el ,index)=>{
    el.addEventListener("click",(e)=>{
        if(checkValid()){
            if(index < next.length   ){
                pages.forEach(el=>{
                    el.classList.remove('active')
                })
                numPages.forEach(el=>{
                    el.classList.remove('active')
                })
                if(index < next.length - 1){
                    numPages[index + 1].classList.add("active")
                }
                pages[index + 1].classList.add("active")
                
                calculateTotal(moOrYe)
                insertToAdds()
            }
        }
    })
    
})

const plans = document.querySelectorAll(".plans .plan")
plans.forEach(plan=>{
    plan.addEventListener("click",e=>{
        plans.forEach(el=>{
            el.classList.remove('active')
        })
        plan.classList.add("active")
        insertToPlan()

    })
})

const switchButton : HTMLDivElement = document.querySelector('.switch .button')
const titleSub :NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.container-month-year p')


switchButton?.addEventListener("click",(el)=>{
    if(switchButton.classList.contains("yearly")){
        switchButton.classList.remove("yearly")
        titleSub[1].classList.remove('active')
        titleSub[0].classList.add('active')
        insertMonthlyPrice()
        editAddsMo()
        moOrYe = true;

    }else{
        switchButton.classList.add("yearly")
        titleSub[1].classList.add('active')
        titleSub[0].classList.remove('active')
        insertYearlyPrice()
        editAddsYear()
        moOrYe = false
        
    }
    calculateTotal(moOrYe)
    insertToPlan()
})

const backButton = document.querySelectorAll(".buttons .back")
backButton.forEach((button , index)=>{
    button.addEventListener("click",e=>{
        pages.forEach(page=>{
            page.classList.remove("active")
        })
        pages[index].classList.add("active")
    })
})


const checkBox = document.querySelectorAll(".adds form > div")


checkBox.forEach((box ,index)=>{
    box.addEventListener("click",e=>{
        const check = document.querySelectorAll(".check-box")
        if(box.classList.contains('active')){
            check[index].classList.remove("active")
            box.classList.remove("active")
        }else{
            check[index].classList.add("active")
            box.classList.add("active")
        }
        calculateTotal(moOrYe)
    })
})




function checkValid():boolean{
    let statue = true;
    if(currentPage === 1){
        const inputPageOne : NodeListOf<HTMLInputElement> = document.querySelectorAll(".personal-info input")
        const errorMassege: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".personal-info form .empty-error")
        
        inputPageOne.forEach((input,index)=>{
            if(input.value === ""){
                errorMassege[index].style.display = "block";
                statue = false;
            }else{
                errorMassege[index].style.display = "none";
            }
        })
        
        if(checkEmail() && statue ){
            return true
        }else{
            return false
        }
    }
    return statue
}


function checkEmail():boolean{
    const inputPageOne : NodeListOf<HTMLInputElement> = document.querySelectorAll(".personal-info input")
    const errorEmail: HTMLSpanElement = document.querySelector(".personal-info form .error-email")
    let rgex = /\w+@(gmail|outlook|yahoo).com\b/gi
    if((!(rgex.test(inputPageOne[1].value))) && inputPageOne[1].value !== ""){
        errorEmail.style.display = "block";
        return false
    }else{
        const email = document.querySelector('.email')
        email.innerHTML = `${inputPageOne[1].value}`
        errorEmail.style.display = "none";
        return true;
    }
}

function insertMonthlyPrice():void{
    const tiltePlan = document.querySelectorAll(".plan .title")
    tiltePlan.forEach((plan,index)=>{
        if(index === 0){
            plan.innerHTML = `
            <h3>Arcade</h3>
            <p>$9/mo</p>
            `;
            plan.parentElement.setAttribute("data-price","9")
        }else if( index === 1){
            plan.innerHTML = `
            <h3>advanced</h3>
            <p>$12/mo</p>
            `;
            plan.parentElement.setAttribute("data-price","12")
        }else{
            plan.innerHTML = `
            <h3>advanced</h3>
            <p>$15/mo</p>
            `;   
            plan.parentElement.setAttribute("data-price","15")
        }
    })
}
function insertYearlyPrice():void{
    const tiltePlan = document.querySelectorAll(".plan .title")
    tiltePlan.forEach((plan,index)=>{
        if(index === 0){
            plan.innerHTML = `
            <h3>Arcade</h3>
            <p>$90/yr</p>
            <span>2 months free</span>
            `;
            plan.parentElement.setAttribute("data-price","90")
        }else if( index === 1){
            plan.innerHTML = `
            <h3>Advanced</h3>
            <p>$120/yr</p>
            <span>2 months free</span>
            `;
            plan.parentElement.setAttribute("data-price","120")
        }else{
            plan.innerHTML = `
            <h3>Pro</h3>
            <p>$150/yr</p>
            <span>2 months free</span>
            `;
            plan.parentElement.setAttribute("data-price","150")
        }
    })
}

function editAddsMo():void{
    const  price = document.querySelectorAll(".adds .price")
    price[0].innerHTML = "+$1/mo"
    price[0].parentElement.setAttribute("data-price","1")
    price[1].innerHTML = "+$2/mo"
    price[1].parentElement.setAttribute("data-price","2")
    price[2].innerHTML = "+$2/mo"
    price[2].parentElement.setAttribute("data-price","2")

}
function editAddsYear() :void{
    const  price = document.querySelectorAll(".adds .price")
    price[0].innerHTML = "+$10/yr"
    price[1].innerHTML = "+$20/yr"
    price[2].innerHTML = "+$20/yr"
    price[0].parentElement.setAttribute("data-price","10")
    price[1].parentElement.setAttribute("data-price","20")
    price[2].parentElement.setAttribute("data-price","20")
}

function insertToPlan():void{
    const tiltePlan = document.querySelector(".plans .plan.active .title");
    const tilteSummry = document.querySelector(".summry .plan");
    tilteSummry.innerHTML = "";
    if(tiltePlan?.children.length === 3){
        let div = document.createElement("div")
        div.classList.add("title")
        div.innerHTML = `<h3>${tiltePlan.children[0].innerHTML}(Yearly)</h3>`
        let p = document.createElement("p")
        p.innerHTML = 'change';
        p.classList.add('change')
        div.append(p)
        tilteSummry?.append(div)
    }else if(tiltePlan?.children.length === 2){
        let div = document.createElement("div")
        div.classList.add("title")
        div.innerHTML = `<h3>${tiltePlan.children[0].innerHTML}(Monthly)</h3>`
        let p = document.createElement("p")
        p.innerHTML = 'change'
        p.classList.add('change')
        div.append(p)
        tilteSummry?.append(div)
    }
    let p = document.createElement("p")
    p.innerHTML = `${tiltePlan?.children[1].innerHTML}`
    p.classList.add("price")
    tilteSummry?.append(p)
    const change = document.querySelector(".summry .plan .title p")

    change?.addEventListener("click",e=>{
    pages.forEach(el=>{
        el.classList.remove('active')
    })
    numPages.forEach(el=>{
        el.classList.remove('active')
    })
    pages[1].classList.add('active')
    numPages[1].classList.add('active')
    })
    
}
function insertToAdds(){
    const tiltePlan = document.querySelectorAll(".adds form > div.active");
    const addPlan = document.querySelector(".summry .adds ");
    
    addPlan.innerHTML = ""
    tiltePlan.forEach(plan=>{
        let div = document.createElement("div")
        let pTitle = document.createElement("p")
        pTitle.innerHTML = `${plan.children[0].children[1].children[0].innerHTML}`
        
        let pPrice = document.createElement("p")
        pPrice.innerHTML = `${plan.children[1].innerHTML.trim()}`
        div.append(pTitle,pPrice)
        addPlan?.append(div)
    })
}

function calculateTotal(statue:boolean):void{
    const prices = document.querySelectorAll(".active[data-price]")
    const totalPrice = document.querySelector(".total-price .price")

    let sum = 0
    prices.forEach(el=>{
       sum = sum + Number(el.getAttribute("data-price"))
    })
    if(statue){
        totalPrice.innerHTML = `+$${sum}/mo`
    }else{
        totalPrice.innerHTML = `+$${sum}/yr`

    }
}