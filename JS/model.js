const model = {
    authUser: null,
    conversations: null,
    activeConversation: null,
    activeConversationID: null
}

model.authen = function(authUser){
    model.authUser = authUser
}

model.signOut = function(){
    model.authUser = null
    model.conversations = null
    model.activeConversation = null
    // model.activeConversationID = null
}

model.saveConversation = function(conversations){
    model.conversations = conversations
    view.showListConversation(conversations)
}

model.saveActiveConversation = async function(conversationsId){

    if(model.conversations instanceof Array){
        // remove active classs of previous div conversation
        if(model.activeConversation){
            let prevDiv = document.getElementById(model.activeConversation.id)
            prevDiv.classList.remove('active')
        }

        //add active class to current div conversation
        let currentDiv = document.getElementById(conversationsId)
        currentDiv.classList.add('active')
        
        // update model.activeConversation
        for (let conversation of model.conversations){
            if(conversation.id == conversationsId){
                // model.activeConversationID = conversationsId
                model.activeConversation = conversation
                view.showConversation(conversation)
                return
            }
        }
    }
}

model.updateConversationChange = function(conversation){
    // 1. find if ( model.conversations contains conversation)
    // update conversation to model.conversation

    // 2. if (not found)
    // push conversation to model.conversation

    // 3. if (conversation is model.activeConversation)
    // update to view
    let foundIndex = model.conversations.findIndex(function(element){
        return element.id == conversation.id
    })
    if(foundIndex >= 0){ // 1
        model.conversations[foundIndex] = conversation
    }
    else{ // 2
        model.conversations.push(conversation)
    }
    if (model.activeConversation.id == conversation.id){ // 3
        model.saveActiveConversation(conversation.id)
    }
    view.showListConversation(model.conversations)

}