let next_btn = document.querySelector(".next-btn");
let back_btn = document.querySelector(".back-btn");
let confirm_btn = document.querySelector(".confirm-btn");

let name_inp = document.querySelector("#user-name");
let email_inp = document.querySelector("#email");
let phone_inp = document.querySelector("#phone-number");

let error = document.querySelector(".error");
let error2 = document.querySelector(".error2");
let error3 = document.querySelector(".error3");

let plans = document.querySelectorAll(".plan");
let switch_btn = document.querySelector(".switch");
let switch_value = document.querySelector(".switch .value");

let month_text = document.querySelector(".month");
let year_text = document.querySelector(".year");

let switch_boolean = false;

let info_arcade_price = document.querySelector(".arcade .price-num");
let info_advanced_price = document.querySelector(".advanced .price-num");
let info_pro_price = document.querySelector(".pro .price-num");

let arcade_info = document.querySelector(".arcade .info");
let advanced_info = document.querySelector(".advanced .info");
let pro_info = document.querySelector(".pro .info");

let components = document.querySelectorAll(".component");

let add_ons = document.querySelectorAll('.addon');
let add_ons_values = [false,false,false];

let CHs_prices_elements = document.querySelectorAll(".ch-price");
let CHs_prices_monthly = ["1","2","2"];
let CHs_prices_yearly = ["10","20","20"];

//PlaceHolders
let plan_placeholder = document.querySelector(".ph-plan");
let price_placeholder = document.querySelector(".ph-price");
let total_text_placeholder = document.querySelector(".total-text");
let total_price_placeholder = document.querySelector(".total-price");
let addons_container_placeholder = document.querySelector(".ph-add-ons-cont");

let change_button = document.querySelector(".change");

let thank_msg = document.querySelector(".thank-cont");

next_btn.addEventListener('click', () => {
    if (name_inp.value === "" || email_inp.value === "" || phone_inp.value === "" && document.querySelector(".active").classList.contains("step-1")) {
        if (name_inp.value === "") {
            error.style.display = "block";
            name_inp.style.border = "1px red solid";
        } else {
            error.style.display = "none";
            name_inp.style.border = "1px grey solid";
        }

        if (email_inp.value === "") {
            error2.style.display = "block";
            email_inp.style.border = "1px red solid";
        } else { 
            error2.style.display = "none";
            email_inp.style.border = "1px grey solid";
        }

        if (phone_inp.value === "") {
            error3.style.display = "block";
            phone_inp.style.border = "1px red solid";
        } else {
            error3.style.display = "none";
            phone_inp.style.border = "1px grey solid";
        }
    } else {
        back_btn.style.display = "block";
        if (document.querySelector(".active").nextElementSibling.nextElementSibling === null) {
            confirm_btn.style.display = "block";
            next_btn.style.display = "none";
        }
        if (document.querySelector(".active").nextElementSibling !== null) {
            let active_element = document.querySelector(".active");
            document.querySelectorAll(".step").forEach((step) => {
                step.classList.remove("active");
            });
            let plan_price = document.querySelector(".active-plan").querySelector(".info").innerText;
            let plan = document.querySelector(".active-plan").querySelector(".title").innerText + ` (${method_placeholder(switch_boolean)})`;
            active_element.nextElementSibling.classList.add("active");
            plan_placeholder.innerText = plan;
            price_placeholder.innerText = plan_price;
            let active_add_ons = document.querySelectorAll(".active-add-on");
            addons_container_placeholder.innerHTML = "";
            active_add_ons.forEach((active_add_on) => {
                addons_container_placeholder.innerHTML += `
                <div class="ph-addon-cont">
                <div class="ph-addon">${active_add_on.querySelector(".ch-title").innerText}</div>
                <div class="ph-addon-price">${active_add_on.querySelector(".ch-price").innerText}</div>
                </div>
                `;
            });
            let total_price = 0;
            for (let i = 0; i < get_addons_price().length; i++) {
                total_price += +get_addons_price()[i];
            }
            total_text_placeholder.innerText = `Total (per ${method_total_placeholder(switch_boolean)})`;
            total_price_placeholder.innerText = `+$${+document.querySelector(".active-plan").querySelector(".info .price-num").innerText + total_price}/${method_shortcut_placeholder(switch_boolean)}`;
            change_component();
        }
    }
});

back_btn.addEventListener('click', () => {
    next_btn.style.display = "block";
    confirm_btn.style.display = "none";
    if (document.querySelector(".active").previousElementSibling.previousElementSibling === null) {
        back_btn.style.display = "none";
    }
    if (document.querySelector(".active").previousElementSibling !== null) {
        let active_element = document.querySelector(".active");
        document.querySelectorAll(".step").forEach((step) => {
            step.classList.remove("active");
        });
        active_element.previousElementSibling.classList.add("active");
        change_component();
    }
});

plans.forEach((plan) => {
    plan.addEventListener('click', (event) => {
        plans.forEach(plan => {
            plan.classList.remove("active-plan");
            plan.removeAttribute("style");
        });
        plan.classList.add("active-plan");
        plan.style.borderColor = "var(--used-purple)";
        if (switch_boolean === true && document.querySelector("body").offsetWidth > 800) {
            plans.forEach((plan) => {
                plan.style.height = "110%";
            });
        } else if (switch_boolean === true && document.querySelector("body").offsetWidth < 800) {
            plans.forEach((plan) => {
                plan.style.height = "95px";
            });
        }
    });
});

switch_btn.addEventListener('click', () => {
    if (switch_boolean === false) {
        switch_on();
    } else if (switch_boolean === true) {
        switch_off();
    }
});

add_ons.forEach((addon,index) => {
    addon.addEventListener('click', (event) => {
        if (add_ons_values[index] === false) {
            add_ons_values[index] = true;
            addon.parentElement.classList.add("active-add-on");
            addon.style.border = "1px var(--used-purple) solid";
            addon.style.borderRadius = "10px";
            addon.parentElement.style.border = "none";
        } else if (add_ons_values[index] === true) {
            add_ons_values[index] = false;
            addon.parentElement.classList.remove("active-add-on");
            addon.style.border = "none";
            addon.parentElement.removeAttribute("style");
        }
    });
});

confirm_btn.addEventListener('click', () => {
    components.forEach((component) => {
        component.style.display = "none";
    });
    thank_msg.style.display = "flex";
    confirm_btn.style.display = "none";
    back_btn.style.display = "none";
});

change_button.addEventListener('click', () => {
    components.forEach((component) => {
        component.style.display = "none";
    });

    document.querySelectorAll(".step").forEach((step) => {
        step.classList.remove("active");
    });

    document.querySelector(".comp-2").style.display = "block";
    document.querySelector(".step-2").classList.add("active");
    confirm_btn.style.display = "none";
    next_btn.style.display = "block";
});

function switch_on() {
    if (document.querySelector("body").offsetWidth > 800) {
        switch_boolean = true;
        switch_value.style.left = "auto";
        switch_value.style.right = "2px";
        month_text.style.color = "grey";
        year_text.style.color = "var(--dark-blue)";
        info_arcade_price.innerText = "90";
        info_advanced_price.innerText = "120";
        info_pro_price.innerText = "150";

        arcade_info.innerHTML = `$<span class="price-num">${info_arcade_price.innerText}</span>/yr`;
        advanced_info.innerHTML = `$<span class="price-num">${info_advanced_price.innerText}</span>/yr`;
        pro_info.innerHTML = `$<span class="price-num">${info_pro_price.innerText}</span>/yr`;

        plans.forEach((plan) => {
            plan.style.height = "110%";
            plan.querySelector(".offer").style.display = "block";
        });
    } else if (document.querySelector("body").offsetWidth < 800) {
        switch_boolean = true;
        switch_value.style.left = "auto";
        switch_value.style.right = "2px";
        month_text.style.color = "grey";
        year_text.style.color = "var(--dark-blue)";
        info_arcade_price.innerText = "90";
        info_advanced_price.innerText = "120";
        info_pro_price.innerText = "150";

        arcade_info.innerHTML = `$<span class="price-num">${info_arcade_price.innerText}</span>/yr`;
        advanced_info.innerHTML = `$<span class="price-num">${info_advanced_price.innerText}</span>/yr`;
        pro_info.innerHTML = `$<span class="price-num">${info_pro_price.innerText}</span>/yr`;

        plans.forEach((plan) => {
            plan.style.height = "95px";
            plan.querySelector(".offer").style.display = "block";
        });
    }
}

function switch_off() {
    if (document.querySelector("body").offsetWidth > 800) {
        switch_boolean = false;
        switch_value.style.left = "2px";
        switch_value.style.right = "auto";
        month_text.style.color = "var(--dark-blue)";
        year_text.style.color = "grey";
        info_arcade_price.innerText = "9";
        info_advanced_price.innerText = "12";
        info_pro_price.innerText = "15";

        arcade_info.innerHTML = `$<span class="price-num">${info_arcade_price.innerText}</span>/mo`;
        advanced_info.innerHTML = `$<span class="price-num">${info_advanced_price.innerText}</span>/mo`;
        pro_info.innerHTML = `$<span class="price-num">${info_pro_price.innerText}</span>/mo`;

        plans.forEach((plan) => {
            plan.style.height = "100%";
            plan.querySelector(".offer").style.display = "none";
        });
    } else if (document.querySelector("body").offsetWidth < 800) {
        switch_boolean = false;
        switch_value.style.left = "2px";
        switch_value.style.right = "auto";
        month_text.style.color = "var(--dark-blue)";
        year_text.style.color = "grey";
        info_arcade_price.innerText = "9";
        info_advanced_price.innerText = "12";
        info_pro_price.innerText = "15";

        arcade_info.innerHTML = `$<span class="price-num">${info_arcade_price.innerText}</span>/mo`;
        advanced_info.innerHTML = `$<span class="price-num">${info_advanced_price.innerText}</span>/mo`;
        pro_info.innerHTML = `$<span class="price-num">${info_pro_price.innerText}</span>/mo`;

        plans.forEach((plan) => {
            plan.style.height = "70px";
            plan.querySelector(".offer").style.display = "none";
        });
    }
}

function change_component() {
    components.forEach((component) => {
        component.style.display = "none";
    });
    let element = document.querySelector(".active").classList[0];
    document.querySelector(`[${element}]`).style.display = "block";
    if (switch_boolean === true) {
        CHs_prices_elements.forEach((ch_price_element,index) => {
            ch_price_element.innerHTML = `+$<span class="price-num-addon">${CHs_prices_yearly[index]}</span>/yr`;
        });
    } else if (switch_boolean === false) {
        CHs_prices_elements.forEach((ch_price_element, index) => {
            ch_price_element.innerHTML = `+$<span class="price-num-addon">${CHs_prices_monthly[index]}</span>/mo`;
        });
    }
}

function method_placeholder(boolean) {
    return boolean ? "Yearly" : "Monthly";
}

function method_shortcut_placeholder(boolean) {
    return boolean ? "yr" : "mo";
}

function method_total_placeholder(boolean) {
    return boolean ? "year" : "month";
}

function get_addons_price() {
    let array = [];
    document.querySelectorAll(".active-add-on").forEach((add_on) => {
        array.push(add_on.querySelector(".ch-price .price-num-addon").innerText);
    });
    return array;
}