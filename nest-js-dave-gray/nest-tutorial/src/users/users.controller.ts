import {
    Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe,
    ValidationPipe
}
    from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users') // /users/{route}
export class UsersController {

    // Creating an instance of our usersService class
    constructor(private readonly usersService: UsersService) { }

    @Get() // GET /users or /users?role=value
    findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN") {
        return this.usersService.findAll(role);
    }

    /*
    //* Static routes need to be before dynamic routes
    @Get("interns") // GET /users/interns
    findAllInterns() {
        return [];
    }
    */

    @Get(":id") // GET /users/:id
    findOne(@Param("id", ParseIntPipe) id: number) {
        // ParseIntPipe converts the number string into a number
        // This makes it return a bad request when letters are inserted rather
        // returning no data with a status code of 200 or ok
        return this.usersService.findOne(id);
    }

    @Post() // POST /users
    // ValidationPipe uses validations in our DTO (Data Transfer Object) class
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(":id") // PATCH /users/:id
    update(@Param("id", ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(":id") // DELETE /users/:id
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(Number(id));
    }
}
