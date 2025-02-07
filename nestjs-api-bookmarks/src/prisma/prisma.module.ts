import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes this module be available to all other modules
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
