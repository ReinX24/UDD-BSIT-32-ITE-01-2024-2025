/*
const axios = require("axios");

const fetchData = async () => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        const dataArray = response.data;
        console.log(dataArray);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("DONE");
    }
};

fetchData();
*/

/*
const data = axios.get("https://jsonplaceholder.typicode.com/users");

data.then((response) => {
    // Logging the name of each user
    response.data.forEach((user) => {
        console.log(user.name);
    });
})
    .catch((error) => {
        console.log("Error: " + error.message);
    })
    .finally(() => {
        console.log("Promise resolved.");
    });
*/

/*
const myEvent = new Promise((resolve, reject) => {
    let name = "John";
    // let name = "Jane";

    if (name == "John") {
        resolve(name);
    } else {
        reject("Name was not John, name was: " + name);
    }
});

myEvent
    .then((name) => {
        console.log(name);
    })
    .catch((error) => {
        console.log(error);
    }).finally(() => {
        console.log("Promise finished.");
    });
*/

async function getData() {
    const url = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error.message);
    }
}

const userData = getData();
// Accessing the results of the promise
userData.then((eachUser) => {
    console.log(eachUser);
});
