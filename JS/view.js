const view = {}

view.showComponents = function(name) {
    // name = 'register' / 'login'
    switch(name){
        case 'register':{
            let app = document.getElementById('app')
            app.innerHTML = components.register

            let link = document.getElementById('form-link')
            link.onclick = linkClickHandler

            let form = document.getElementById('form-register')
            form.onsubmit = formSubmitHandler

            function formSubmitHandler(e){
                e.preventDefault()
                //1. lay du lieu nguoi dung dien vao
                let registerInfo = {
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value
                }
                //2. validate registerInfo
                console.log(registerInfo)

                // _____________Name_User_______
                 // first name 
                if(registerInfo.firstname){
                    view.setText('first-name-error','')
                }
                else{
                    view.setText('first-name-error','Invalid firstname')
                }
                 // last name
                if(registerInfo.lastname){
                    view.setText('last-name-error','')
                }
                else{
                    view.setText('last-name-error','Invalid lastname')
                }

                //__________Email_______________
                // let e  = form.email;
                if(registerInfo.email){
                    view.setText('email-error','')
                }
                else{
                    view.setText('email-error','Invalid email')
                }

                //_________Password_____________
                if(registerInfo.password){
                    view.setText('password-error','')
                }
                else{
                    view.setText('password-error','Invalid password')
                }

                //________Confirm_password____________
                if(registerInfo.confirmPassword && registerInfo.password == registerInfo.confirmPassword){
                    view.setText('confirm-password-error','')
                }
                else{
                    view.setText('confirm-password-error','Not the same password')
                } 
                // 3. Gui thong tin nguoi dung len server

                if(registerInfo.firstname 
                && registerInfo.lastname
                && registerInfo.email
                && registerInfo.password
                && registerInfo.confirmPassword
                && registerInfo.password == registerInfo.confirmPassword){
                    controller.register(registerInfo)
                }
            }
            function linkClickHandler(){
                view.showComponents('login')
            }
           
            break;
        }

        case 'login':{
            let app = document.getElementById('app')
            app.innerHTML = components.login

            let link  = document.getElementById('form-link')
            link.onclick = linkClickHandler
            
            let form  = document.getElementById('form-log-in')
            form.onsubmit = formSubmitHandler

            function linkClickHandler(){
                view.showComponents('register')
            }      
            
            function formSubmitHandler(e){
                e.preventDefault()
                // 1. lay du lieu nguoi dung vao form
                // 2. validate thong tin
                // 3. Gui thong tin nguoi dung

                let loginInfo = {
                    email: form.email.value,
                    password: form.password.value
                }

                if (loginInfo.email){
                    // xoa loi message
                    view.setText('email-error', '')
                }
                else {
                    // hien thi loi nguoi dung
                    view.setText('email-error', 'Invalid email')        
                }

                if (loginInfo.password){
                    view.setText('password-error', '')        
                }
                else {
                    // hien thi loi password
                    view.setText('password-error', 'Invalid password')        
                }
                //Gui thong tin nguoi dung
                if (loginInfo.email &&
                    loginInfo.password){
                        controller.login(loginInfo)
                    }
            }
            break;
        }
        case 'chat':{
            let app = document.getElementById('app')
            app.innerHTML = components.navBar;
            app.innerHTML += components.chat;
            app.innerHTML += components.footer;
            
            let chatForm = document.getElementById('chat-form')
            chatForm.onsubmit = chatFormSubmitHandler

            let signOutBtn = document.getElementById('sign-out-btn')
            signOutBtn.onclick = signOutHandler;

            let userEmail = document.getElementById('user-email')
            userEmail.innerText = firebase.auth().currentUser.email;
            
            let formAddConversation = document.getElementById('add-conversation-form')
            formAddConversation.onsubmit = formAddSubmitHandler

            async function formAddSubmitHandler(e){
                e.preventDefault()
                let title = formAddConversation.title.value
                let friendEmail = formAddConversation.friendEmail.value
                let btnAdd = document.getElementById('add-conversation-btn')
                btnAdd.setAttribute('disabled', true)

                // validate email exists in system
                // validate friend email != model.authUser.email
                
                try{
                    let resultValidate = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
                    if(resultValidate.length == 0){
                        throw new Error('Your friend email not yet been registed')
                    }
                    if (friendEmail.toLowerCase() == model.authUser.email){
                        throw new Error('Please enter a friend email')
                    }
                    let conversation = {
                        title: title,
                        users: [ friendEmail.toLowerCase(), model.authUser.email],
                        message: [],
                        createdAt: new Date().toISOString()
                    }

                    await firebase.firestore().collection('conversations').add(conversation)
                    view.setText('add-conversation-error', "")
                    formAddConversation.title = ""
                    formAddConversation.friendEmail.value = ""
                }
                catch(err){
                    view.setText('add-conversation-error', err.message)
                }

                btnAdd.removeAttribute('disabled')
            }
            
            function signOutHandler(){
                model.signOut();
                firebase.auth().signOut()
            }


            function chatFormSubmitHandler(e){
                e.preventDefault()

                let messageContent = chatForm.message.value
                controller.sendMessage(messageContent)

                chatForm.message.value = ""
            }

            break;
        }
        case 'loading':{
            let app = document.getElementById('app')
            app.innerHTML = components.loading
            break;
        }
    }
}

view.setText = function(id , text) {
    document.getElementById(id).innerText = text
}

view.showConversation = function(conversation){
    // let friendsMail = document.getElementById('friends-mail')
    // let mail = getFriendsEmail()
    // // console.log(mail);
    // friendsMail.innerHTML = mail

    // function getFriendsEmail(){
    //     var email = "Hello"
    //     let id = model.activeConversation.id
    //     firebase.firestore().collection('conversations').doc(id).get().then(doc => {
    //         users = (doc.data().users);
    //         users.forEach(u => {
    //             if(u != firebase.auth().currentUser.email){
    //                 console.log(u);
    //                 return u
    //             }

    //         });
    //     }).catch(error =>{
    //         console.log(error);
    //     })
    //     return email;

    // }
    
    let chatMessage = document.getElementById('chat-messages')
    if(chatMessage){
        chatMessage.innerHTML = ""
        if(conversation.messages != null)
        for(let message of conversation.messages){
            let className = "chat-message"
            if (message.owner == model.authUser.email){
                className += " your"
            }
            let html = `
                <div class = "${className}">
                    <span> ${message.content} </span>
                </div>
            `
            // let str = "user"
            // let mess = "hello ${str} "  ~ "hello user" 
            chatMessage.innerHTML += html
        }
        // auto scroll xuong duoi 
        chatMessage.scrollTop = chatMessage.scrollHeight - chatMessage.clientHeight;
    }
}

view.showListConversation = function(conversations){
    let divConversations = document.getElementById('conversations')
    // console.log(conversations)
    divConversations.innerHTML = ""
// add html
    for(let conversation of conversations){
        let html = `
            <div id = "${conversation.id}" class = "conversation">
                <div> ${conversation.title} </div>
            </div>
        `
        divConversations.innerHTML += html
    }
    // add event
    for (let conversation of conversations){
        let div = document.getElementById(conversation.id)
        div.onclick = conversationDivClickHandler
    
        function conversationDivClickHandler(){
            model.saveActiveConversation(conversation.id)
        }
    }
    


}
// function validatePassword(password){
//     let regPass = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
//     retunr
// }