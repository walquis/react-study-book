With React, you don’t directly manipulate the DOM. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc.  Neither will you write `myDiv.style.display = "block"`.

Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

React takes responsibility for efficiently updating the DOM based on the state changes.
