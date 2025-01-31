import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

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
            const rolesArray = this.users.filter((eachUser) => {
                return eachUser.role === role;
            })

            // If no users are found for that role, return an exception
            if (rolesArray.length === 0) {
                throw new NotFoundException("User Role Not Found");
            }

            return rolesArray;
        }

        // If no role passed in, return all users
        return this.users;
    }

    findOne(id: number) {
        // Find the user by their id
        const user = this.users.find((user) => {
            return user.id === id;
        })

        // If a user is not found, throw new NotFoundException
        if (!user) {
            throw new NotFoundException("User Not Found")
        }

        return user;
    }

    create(createUserDto: CreateUserDto) {
        // Copy new array and sort from highest to lowest ids, mimics id in db
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map((eachUser) => {
            if (eachUser.id === id) {
                // Updating the information of the user, replacing old data 
                // with new data
                return { ...eachUser, ...updateUserDto }
            }
            return eachUser;
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter((eachUser) => {
            // Returns all users except for the one which matches the id
            return eachUser.id !== id
        })

        return removedUser;
    }
}
