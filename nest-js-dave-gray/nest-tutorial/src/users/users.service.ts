import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "johndoe@example.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "email": "janedoe@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Jason Doe",
            "email": "jasondoe@example.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "Jennifer Doe",
            "email": "jenniferdoe@example.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "Jess Doe",
            "email": "jessdoe@example.com",
            "role": "ENGINEER"
        },
    ];

    findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
        // If a role is entered as a query, filter data by role
        if (role) {
            return this.users.filter((eachUser) => {
                return eachUser.role === role;
            })
        }

        // If no role passed in, return all users
        return this.users;
    }

    findOne(id: number) {
        // Find the user by their id
        const user = this.users.find((user) => {
            user.id === id;
        })

        return user;
    }

    create(user: {
        name: string, email: string,
        role: "INTERN" | "ENGINEER" | "ADMIN"
    }) {

        // Copy new array and sort from highest to lowest ids, mimics id in db
        // TODO: research sort function
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        // TODO: cont @44:50
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
    }
}
