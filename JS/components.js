const components = {}

/* <div class = "tool-bar">
            <a href = "#" id = "name-display" class = "name-display">
                
            </a>
            <div id = "sign-out" class = "sign-out">
                <button> Sign out </button>
            </div>
        </div> */
components.register = `
<section class="register-container">
    <div class="form-container">
        <div class="form-header">
            <span>
                <h1> MindX Login </h1>
            </span>
        </div>
        <form id="form-register">
            <div class="name-wrapper">
                <div class="input-wrapper">
                    <input type="text" name="firstname" placeholder=" First name" />
                    <div id = "first-name-error" class = "message-error"> </div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="lastname" placeholder=" Last name" />
                    <div id = "last-name-error" class = "message-error"> </div>

                </div>
            </div>

            <div class="input-wrapper">
                <input type= "email" name="email" placeholder=" Email">
                <div id = "email-error" class = "message-error"> </div>

            </div>

            <div class="input-wrapper">
                <input type="password" name = "password" placeholder=" Password">
                <div id = "password-error" class = "message-error"> </div>

            </div>

            <div class="input-wrapper">
                <input type="password" name="confirmPassword" placeholder=" Confirm Pass">
                <div id = "confirm-password-error" class = "message-error"> </div>
            </div>

            <div id = "register-error" class = "message-error">  </div>
            <div id = "register-success" class = "message-success">  </div>

            <div class="form-footer">
                <a id = "form-link" href="#"> Already have an account? Login</a>
                <button id = "register-btn" >Register</button>
            </div>
        </form>
    </div>
</section>
`

components.login = `   
<section class="log-in-container">
    <div class="form-container">
        <div class="form-header">
            <span>
                <h1> MindX Chat </h1>
            </span>
        </div>
        <form id="form-log-in">
            <div class="input-wrapper">
                <input type=" email" name="email" placeholder=" Email">
                <div id = email-error class = "message-error">  </div>
            </div>

            <div class="input-wrapper">
                <input type="password" name = "password" placeholder=" Password">
                <div id = password-error class = "message-error">  </div>
            </div>

            <div id = "log-in-error" class = "message-error"> </div>

            <div class="form-footer">
                <a id = "form-link" href="#"> Not yet have an account? Register </a>
                <button id = "log-in-btn"> Login </button>
            </div>
        </form>
    </div>
</section>
`

// 1 the co nhieu class duoc, phan cach nhau boi 1 dau cach 
// <span> khac vs <p>
// placeholder : neu ko viet gi,hien len message
components.chat = `
    <section class = "chat-container">
        <div class = "list-conversations">
            <form id = "add-conversation-form" class = "add-conversation-container">
                <div class = "input-wrapper">
                    <input type = "text" name = "title" placeholder = "New conversation title" />
                </div>
                <div class = "input-wrapper">
                    <input type = "email" name = "friendEmail" placeholder = "Your friend email"  required/>
                </div>
                <div id = "add-conversation-error" class = "message-error"> </div>
                <button id = "add-conversation-btn">+ Add </button>
            </form>
            <div id = "conversations" class = "conversations">
            </div>
        </div>
        <div class = "current-conversation">
            <div id = "chat-messages" class ="chat-messages">    
            </div>
            <form id = "chat-form" class = "chat-form">
                <div class = "input-wrapper">
                    <input type = "text" name = "message" placeholder = "Enter your message">
                </div>
                <button > Submit </button>
            </form>
        </div>
    </section>
`

components.navBar = 
`
    <nav class = "main-nav-bar">
        <div id = "user-profile-container" class = user-profile-container">
            <span id = "user-email" class = user-email"> </span>
            <button id = "sign-out-btn"> Sign out </button>
        </div>
    </nav>
`