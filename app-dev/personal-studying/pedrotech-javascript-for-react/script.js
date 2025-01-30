let userNames = ["Pedro", "Jessica", "Carol", "Pedro", "Pedro"];

// .filter checks if the element satisfies the condition, if yes, returns element
userNames = userNames.filter((eachName) => {
    return eachName !== "Pedro";
});

console.log(userNames);

// .map iterates through the array and applies logic to each element
// userNames = userNames.map((eachName, index) => {
//     return eachName + " " + (index + 1);
// });

// console.log(userNames);

const name = "Pedro";

const person = {
    // name: name,
    name,
    age: 20,
    isMarried: false,
};

const { name: personName, age, isMarried } = person;

// console.log(personName, age, isMarried);

// Copying attributes of another object and overriding certain attributes
const person2 = { ...person, name: "Jack" };

// console.log(person2);

const names = ["Pedro", "Jack", "Jessica"];
const names2 = [...names, "Joel"];
// console.log(names2);
