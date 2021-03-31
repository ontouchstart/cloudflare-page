{
    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = { firstName: "Jane", lastName: "User" };
    {
        const output = document.getElementById('greeter_output')! as HTMLPreElement;
        output.textContent += greeter(user);
    }
}