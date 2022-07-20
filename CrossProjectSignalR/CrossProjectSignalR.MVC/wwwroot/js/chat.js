"use strict";

//https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-6.0&tabs=visual-studio-code#add-signalr-client-code

var connection;

connectToHub()

async function connectToHub() {
    let hubUrl = document.getElementById("hub-select").value;

    console.log("Connecting to " + hubUrl);

    if (connection !== undefined && connection.state === signalR.HubConnectionState.Connected) {
        await connection.stop()
    }
    connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
    }

    connection.on("ReceiveMessage", addMessageToList);

    addMessageToList("", "Connected to hub: " + hubUrl);
}

function addMessageToList(user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    if (user === "") {
        li.textContent = `${message}`;
    }
    else {
        li.textContent = `${user} says ${message}`;
    }
}

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});