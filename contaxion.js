const $ = (selector) => {
    return document.querySelector(selector)
}



const $all = (selector) => {
    return document.querySelectorAll(selector)
}

function Contaxion(configDetails) {
    if (configDetails.toEmail === "") {
        alert("Recipient email address is required in contaxion config")
        throw new Error("Recipient email address is required")
    }
    this.userEmail = configDetails.toEmail;
    this.parent = configDetails.parent;
    this.openFormBtn = configDetails.openFormBtn;
    this.openFormBtnShadow = configDetails.openFormBtnShadow;
    this.headerColor = configDetails.headerColor;
    this.buttonColor = configDetails.buttonColor;
    this.usernamePlaceholder = configDetails.usernamePlaceholder;
    this.emailPlaceholder = configDetails.emailPlaceholder;
    this.mesagePlaceholder = configDetails.messagePlaceholder
    this.formTitle = configDetails.formTitle;
    this.loading = false;
    this.isOpen = true;
    this.randColor = configDetails.genRandColor;
    this.defaultHeaderColor = 'linear-gradient(90deg, var(--pink1) 0%, var(--pink2) 99%);';
    this.defaultSubmitBtnColor = 'linear-gradient(90deg, var(--pink1) 0%, var(--pink2) 99%);';
    this.defaultOpenFormBtn = 'linear-gradient(90deg, var(--pink1) 0%, var(--pink2) 99%);';
    this.sendBtn = $(".send-btn");

    this.error = (msg) => {
        let error = new Error(msg);
        return console.error(error);
    }
    this.createContaxionDialog = () => {
        return `
        <div class="dialog-cont">
            <div class="dialog-box">
                <div class="head contaxion-header" style="background:${this.headerColor === undefined ? this.defaultHeaderColor : this.headerColor};">
                    <p>${this.formTitle === undefined ? "Contact Us" : this.formTitle}</p>
                    <ion-icon name="close-outline" class="close-btn"></ion-icon>
                </div>
                <div class="form-cont">
                    <form class="form-group">
                        <small class="msg"></small>

                        <input type="text" class="username inp form-control" placeholder="${this.usernamePlaceholder == undefined ? "username" : this.usernamePlaceholder}" required>
                        <input type="email" class="email inp form-control" placeholder="${this.emailPlaceholder == undefined ? "email" : this.emailPlaceholder}" required>
                        <textarea class="message form-control" cols="30" rows="5" placeholder="${this.messagePlaceholder == undefined ? "Message here" : this.messagePlaceholder}" required></textarea>
                        <br />
                        <button class="btn send-btn" style="background:${this.buttonColor === undefined ? this.defaultSubmitBtnColor : this.buttonColor};">Submit</button>
                    </form>
                </div>
                
            </div>
            <ion-icon name="call-outline" class="openform" style="background: ${this.openFormBtn === undefined ? this.defaultOpenFormBtn : this.openFormBtn}; box-shadow:0px 0px 12px ${this.openFormBtnShadow === undefined ? "var(--pink1)" : this.openFormBtnShadow}"></ion-icon>
        </div>
        `
    }

    this.toggleForm = () => {
        let dialogBox = $(".dialog-box");
        let openformBtn = $(".openform");
        let closebtn = $(".close-btn")

        // toggle form
        if (this.isOpen === false) {
            dialogBox.style.display = "none";
            openformBtn.style.display = "block"
            this.isOpen = true;
        }
        else {
            dialogBox.style.display = "block";
            openformBtn.style.display = "none"
            this.isOpen = false;
        }

        closebtn.onclick = () => {
            dialogBox.style.display = "none";
            openformBtn.style.display = "block"
            this.isOpen = false;
        }

        openformBtn.onclick = () => {
            dialogBox.style.display = "block";
            openformBtn.style.display = "none"
            this.isOpen = true;
        }


    }

    this.genRandColor = () => {
        let contaxionHeader = $(".contaxion-header");
        let contaxionSubmitButton = $(".send-btn");
        let contaxionOpenFormButton = $(".openform");
        let colors = "#6495ED,#008B8B,#2F4F4F,#1E90FF,#4B0082,#FFF0F5,#20B2AA,#87CEFA,#778899,#008080"
        let randB = colors.split(",");
        let colorB = randB[Math.floor((Math.random() * randB.length))]

        if (this.randColor === true || this.genRandColor === undefined) {
            contaxionHeader.style = `background: ${colorB}`;
            contaxionSubmitButton.style = `background: ${colorB}`;
            contaxionOpenFormButton.style = `background: ${colorB}`;
        }
    }

    this.handleFormValidation = () => {
        let sendBtn = $(".send-btn");
        let usernameInp = $(".username");
        let emailInp = $(".email");
        let messageInp = $(".message");
        let msg = $(".msg");

        sendBtn.onclick = (e) => {
            e.preventDefault();


            if (usernameInp.value === "" || emailInp.value === "" || messageInp.value === "") {
                msg.textContent = "Fields cant be empty"
                msg.setAttribute("class", "error");
                // setTimeout(() => {
                //     msg.textContent = "";
                // }, 2000);
                return;
            }
            else {
                msg.innerHTML = "";
                msg.removeAttribute("error");
                this.sendFormData(usernameInp.value, emailInp.value, messageInp.value, msg)
            }
        }
    }

    this.sendFormData = async (username, email, message, msg) => {
        if (configDetails.toEmail === "") {
            msg.innerHTML = "To email is missing in configuration."
            msg.classList.add("failure")
            msg.removeAttribute("success")
            return;
        }

        // validate email address
        let sendBtn = $(".send-btn");
        let usernameInp = $(".username");
        let emailInp = $(".email");
        let messageInp = $(".message");
        msg.innerHTML = "";
        msg.removeAttribute("error");
        sendBtn.textContent = "Sending...."
        sendBtn.setAttribute("disabled", "true");
        sendBtn.classList.add("loading")

        let formData = {
            to: configDetails.toEmail,
            username,
            email,
            message
        };

        try {
            let apiUrl = "https://contaxion-api.herokuapp.com/api/sendMail"
            let res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            let data = await res.json();
            // console.log(data, res)
            if (res.status === 200) {
                sendBtn.removeAttribute("disabled");
                sendBtn.classList.remove("loading")
                sendBtn.textContent = "Submit"
                msg.innerHTML = "";
                msg.innerHTML = "Message sent succesfully.."
                msg.removeAttribute("failure")
                msg.setAttribute("class", "success")

                // clear all input fields
                usernameInp.value = "";
                emailInp.value = "";
                messageInp.value = "";

                // remove error message after 3sec
                setTimeout(() => {
                    msg.textContent = "";
                }, 3000);
            }
            else if (res.status !== 200) {
                sendBtn.removeAttribute("disabled");
                sendBtn.classList.remove("loading")
                sendBtn.textContent = "Submit"
                msg.innerHTML = "Something went wrong while sending message, please try again later."
                msg.removeAttribute("success")
                msg.classList.add("failure")
                setTimeout(() => {
                    if (msg.innerHTML !== "") msg.innerHTML = "";
                }, 3000);
            }
        } catch (e) {
            console.log(e)
            msg.removeAttribute("success")
            msg.setAttribute("class", "failure");
            msg.textContent = "Something went wrong, internal server error. Please try later."
            sendBtn.removeAttribute("disabled")
            sendBtn.classList.remove("loading")
            sendBtn.textContent = "Submit"
        }
    }

    this.init = () => {
        let script1 = document.createElement("script");
        let script2 = document.createElement("script");

        script1.type = "module"
        script2.setAttribute("nomodule", "nomodule")

        script1.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
        script2.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";

        document.body.append(script1)
        document.body.append(script2)

        let parent = $(this.parent);

        if (parent === null) {
            return this.error(`Cant access parent element with class name "${this.parent}"`)
        }
        let div = document.createElement("div");
        div.innerHTML = this.createContaxionDialog()
        parent.innerHTML = "";
        parent.append(div)

        this.toggleForm()
        this.handleFormValidation()

        if (this.randColor === true) {
            this.genRandColor()
        }

    }
}