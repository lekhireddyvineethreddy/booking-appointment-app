document.getElementById("my-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get user input
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Create an object to store the user details
  var userDetails = {
    name: name,
    email: email,
  };

  // Retrieve existing user data from local storage (if any)
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user object to the array
  existingUsers.push(userDetails);

  // Store the updated user data array in local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  // Display a success message
  var messageDiv = document.querySelector(".msg");
  messageDiv.textContent = "User added successfully!";
  setTimeout(function () {
    messageDiv.textContent = "";
  }, 3000); // Clear the message after 3 seconds

  // Refresh the user list
  displayUsers();
});

// Function to delete a user entry
function deleteUser(index) {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // Remove the user at the specified index
  users.splice(index, 1);

  // Update the local storage with the modified user data
  localStorage.setItem("users", JSON.stringify(users));

  // Refresh the user list in the UI
  displayUsers();
}

// Function to populate the form with user data for editing
function editUser(index) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var user = users[index];

  // Populate the form fields with the user's data
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
}

// Function to display the list of users
function displayUsers() {
  var usersList = document.getElementById("users");
  var users = JSON.parse(localStorage.getItem("users")) || [];

  usersList.innerHTML = ""; // Clear the existing list

  // Loop through the users and create list items
  users.forEach(function (user, index) {
    var li = document.createElement("li");
    li.textContent =
      "Name: " + user.name + ", Email: " + user.email;

    // Create an Edit button for each user
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editUser(index); // Call the edit function when the button is clicked
    });

    // Create a Delete button for each user
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteUser(index); // Call the delete function when the button is clicked
    });

    // Append the Edit and Delete buttons to the list item
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    usersList.appendChild(li);
  });
}

// Initial display of users when the page loads
displayUsers();