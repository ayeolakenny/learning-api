import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, SubjectsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
