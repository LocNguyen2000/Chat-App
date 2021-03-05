const components = {}

components.register = `
<section class="register-container">
    <div class="form-container">
        <div class="form-header">
            <span>
                <h2>
                    <i class="fa fa-users" aria-hidden="true"></i>
                    Register Form 
                </h2>
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
                <h1> 
                    <i class="fa fa-comments" aria-hidden="true"></i>
                    Chat Login 
                </h1>
            </span>
        </div>
        <form id="form-log-in">
            <div class="input-wrapper">
                <input type="email" name="email" placeholder=" Email">
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
            <div class = "header">
                <h3>                
                    <i class="fa fa-comments" aria-hidden="true"></i>
                     CHAT APPLICATION 
                </h3>
            </div>
            <form id = "add-conversation-form" class = "add-conversation-container">
                <div class = "input-wrapper">
                    <input type = "text" name = "title" placeholder = "New conversation title" />
                </div>
                <div class = "input-wrapper">
                    <input type = "email" name = "friendEmail" placeholder = "Your friend email"  required/>
                </div>
                <div id = "add-conversation-error" class = "message-error"> </div>
                <button id = "add-conversation-btn">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    Add 
                </button>
            </form>
            <div class = 'chat-list-container'>
                <div class= 'header'>
                    <h3> 
                        <i class="fa fa-th-list" aria-hidden="true"></i>
                        CHAT LIST 
                    </h3>
                </div>
                <div id = "conversations" class = "conversations">
                </div>
            </div>
            <br>
            
            
        </div>
        <div class = "current-conversation">
            <div id = "friends-mail"> </div>
            <form id = "chat-form" class = "chat-form">
                <div class = "input-wrapper">
                    <input type = "text" name = "message" placeholder = "Enter your message">
                </div>
                <button >
                    <i class="fa fa-caret-right" aria-hidden="true" ></i>
                     Submit 
                </button>
            </form>
            <div id = "chat-messages" class ="chat-messages">    
            </div>
            
        </div>
       
    </section>
`

components.navBar = 
`
    <nav class = "main-nav-bar">
        <div id = "nav-cards-container" class = "nav-cards-container">
            <div id = 'community'>
                <i class="fa fa-users" aria-hidden="true"></i>
                Community 
            </div>
            
        </div>
        <div id = "user-profile-container" class = "nav-cards-container">
            <span>
                <i class="fa fa-user-circle" aria-hidden="true"></i>
                <span id = "user-email" class = user-email"> </span>
            </span>
            <button id = "sign-out-btn"> 
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Sign out    
            </button>
        </div>
    </nav>
`