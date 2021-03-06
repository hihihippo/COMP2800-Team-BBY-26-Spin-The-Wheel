//get the current user
var user = firebase.auth().currentUser;

//to check if the user is logged in or not by firebase.
firebase.auth().onAuthStateChanged(function (user) {
  if(user != null) {
    console.log("logged in");
    writeUserData;
  }
  if(user == null) {
    console.log("user not found!");
  }

})

//writing user's input to Firebase and store the data
function writeUserData() {
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("submit").addEventListener("click", function(e) {
      var userName = document.getElementById("userName").value;
        var userAge = document.getElementById("age").value;
        var userGender = document.getElementById("gender").value;
        var userDescription = document.getElementById("description").value;
      if (userName === "" || userAge === "" || userGender === "" || userDescription == "") {
        window.alert("please fill out everything to update!");
      }
        if (user && userName && userAge && userGender && userDescription) {
        
        db.collection("Users").doc(user.uid).update({
          name: userName,
          age: userAge,
          gender: userGender,
          description: userDescription
        })
        .then(function() {
          console.log("User profile successfully written!");
          window.alert("Your Profile is successfully updated!");
          window.location.replace("profile.html");

        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      } else {
        console.log("no user is found!");
      }   
    })
  })
  
}

//grab the user data from Firebase and display the data to the user.
function myProfile() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var db = firebase.firestore();
        var docRef = db.collection("Users").doc(user.uid);
        docRef.get().then(function(doc) {
           if(doc && doc.exists) {
           const myData = doc.data();
           const name = myData.name;
           const age = myData.age;
           const gender = myData.gender;
           const description = myData.description;
           document.getElementById("userName").innerHTML = name;
           document.getElementById("age").innerHTML = age;
           document.getElementById("gender").innerHTML = gender;
           document.getElementById("description").innerHTML = description;
  
      }
      }).catch(function(error) {
      console.log("Got an error: ",error);
      });
    } else {
      console.log("no user found!")
    }

  })
}

//unused function.
function getUserData() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("Users").doc(user.uid)
    .onSnapshot(function (snap) {
      name = snap.data().name
      age = snap.data().age
      gender = snap.data().gender
      description = snap.data().description
      localStorage.setItem("userName", name)
      localStorage.setItem("age", age)
      localStorage.setItem("gender", gender)
      localStorage.setItem("description", description)
      console.log(userName)
      console.log(userAge)
      console.log(userGender)
      console.log(userDescription)
    })
  })
}

  //directs to "edit profile" page.
  function editProfile() {
    window.location.replace("editprofile.html");
  }

  //directs to "redirect main page".
  function goBack() {
    window.location.replace("redirect_mainpage.html");
  }

  