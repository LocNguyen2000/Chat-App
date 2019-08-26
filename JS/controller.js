const controller ={}

controller.register = async function(registerInfo){
    // ham createUser la 1 ham bat dong bo >> await
    // button khi bam thi chuyen sang trang thai disabled, va button hien sang mau xam 
    document.getElementById('register-btn').setAttribute('disabled',true)
    try{
        // create User bang email, password
        await firebase.auth().createUserWithEmailAndPassword(
            registerInfo.email
            ,registerInfo.password
        )
        await firebase.auth().currentUser.updateProfile({
            displayName: registerInfo.firstname + " " + registerInfo.lastname
        })
        // gui email verification
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-error', '')
        view.setText('register-success', "An email verification has been sent to your email")
    }
    catch(error){
        view.setText('register-success','')
        view.setText('register-error', error.message)
    }
    document.getElementById('register-btn').removeAttribute('disabled')

}
controller.login = async function(loginInfo){
    document.getElementById('log-in-btn').setAttribute('disabled', true)
    try{
        let res = await firebase.auth().signInWithEmailAndPassword(
            loginInfo.email, loginInfo.password)
    // 1. chua verify email-> bao loi noi dung email 
    // 2. da xac nhan email->chuyen nguoi dung sang man hinh chat
            // SignIn >> authStateChanged >> authStateChangedHandler >> loadConversation

        if(!res.user.emailVerified){
            throw new Error('Email not verified')
        }
    }
    catch(error){
        view.setText('log-in-error', error.message)
        document.getElementById('log-in-btn').removeAttribute('disabled')
    }    
}
// ham nao return promise, ham do can dung async,await
controller.initApp = function(){
    // 1. neu co nguoi dung dang nhap >> hien thi man hinh chat screen
    // 2. neu ko co nguoi dung dang nhap >> hien thi man hinh login
    firebase.auth().onAuthStateChanged(authStateChangedHandler)
    async function authStateChangedHandler(user){
        if(user && user.emailVerified){
            model.authen(user)
            view.showComponents('chat')
            controller.loadConversation(user.email)
                // authenthicated 
        }
        else{
            view.showComponents('login')
        }
    }
}

controller.loadConversation = function(email){
    firebase.firestore().collection('conversations')
    .where('users', 'array-contains', email)
    .onSnapshot(snapShotHandler)

    function snapShotHandler(snapshot){
        // 1. first loading
        if(model.conversations == null){
            let conversations = []
            for (let doc of snapshot.docs){
                let conversation = doc.data()
                conversation.id = doc.id
                conversations.push(conversation)
            }
            model.saveConversation(conversations)
            if(conversations.length){
                model.saveActiveConversation(conversations[0].id)
            }
        }
        else{      
              // 2. database change >> update || added
            for (let docChange of snapshot.docChanges()){
                if (docChange.type == "modified" || docChange.type == 'added'){
                    let conversation = docChange.doc.data()
                    conversation.id = docChange.doc.id

                    model.updateConversationChange(conversation)
                }
            }
            // docChange.type == 'remove'
        }
    }

}

controller.sendMessage = async function(messageContent){
    if(model.activeConversation){
        messageContent = messageContent.trim()
        if(messageContent){
            let message = {
                content: messageContent,
                owner: model.authUser.email,
                createdAt: new Date().toISOString()
            }
        await firebase.firestore().collection('conversations')
          .doc(model.activeConversation.id)
          .update({
              'messages': firebase.firestore.FieldValue.arrayUnion(message)
          })
        }
    }
}

