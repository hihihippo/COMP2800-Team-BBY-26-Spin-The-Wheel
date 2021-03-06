const socket = io('http://localhost:3000')
const msgContainer = document.getElementById('msg-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
getName();
var name = localStorage.getItem("name")

getActivities();
var arr = localStorage.getItem("arr");
console.log(arr);

appendMessage('You joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
})
//when users connects says person joined
socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
})

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  msgContainer.append(messageElement);
}


function getName() {

    firebase.auth().onAuthStateChanged(function (user) {
        
        db.collection("Users").doc(user.uid)
            .onSnapshot(function (snap) {
                x = snap.data().name;
                console.log(x);
               
               localStorage.setItem("name",x);
            });
        
      });
}

console.log("My names: " + localStorage.getItem("name"));



function getActivities() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Users").doc(user.uid)
            .onSnapshot(function (snap) {
                x = snap.data().arr;
                console.log(x);
        localStorage.setItem("arr",x);
            });
    });
}

function addActivities(){
var inputItem = document.getElementById("item").value;
        firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Users").doc(user.uid)
        .update({
           
            arr: firebase.firestore.FieldValue.arrayUnion(inputItem)
          
        })
        
    });
}


//originally for chatbox, however feature did not work in hosting phase and was scrapped.

