
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref, get, child, remove, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//===========================================
const change_form = () => {
    const register_form = document.getElementById('register');
    const register_form_display = window.getComputedStyle(register_form).display;
    if (register_form_display == 'block') {
        document.getElementById('register').style.display = 'none'
        document.getElementById('block_register').style.display = 'none'
        document.getElementById('login').style.display = 'block'
        document.getElementById('block_login').style.display = 'block'
    } else {
        document.getElementById('register').style.display = 'block'
        document.getElementById('block_register').style.display = 'block'
        document.getElementById('login').style.display = 'none'
        document.getElementById('block_login').style.display = 'none'
    }
}
document.getElementById('change').addEventListener('click', change_form)
//===========================================

const registerNewUser = () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const signintime = new Date()
            set(ref(database, 'users/' + user.uid), {
                user_email: email,
                user_username: username,
                user_role: "simple_role",
                time_stamp: `${signintime}`
            });
            console.log('new user created!');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

};
document.getElementById('register').addEventListener('click', registerNewUser);

const loginUser = () => {
    const login_email = document.getElementById('log_email').value;
    const login_password = document.getElementById('log_password').value;

    signInWithEmailAndPassword(auth, login_email, login_password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('loged in!');

        const loginTime = new Date()
        update(ref(database, 'users/', + user.uid), {
            time_stamp: `${loginTime}`
        })
        // ...

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }); 
}
document.getElementById('login').addEventListener('click', loginUser)

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if(user){
        const uid = user.uid;
        //log in
        document.getElementById('block2').style.display = 'block'
        document.getElementById('main').style.display = 'none'
        document.getElementById('products').style.display = 'block'
    }
    else{
        //log out
        document.getElementById('block2').style.display = 'none'
        document.getElementById('main').style.display = 'block'
        document.getElementById('products').style.display = 'none'
    }
})

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        // alert('sign-out')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    })
})


