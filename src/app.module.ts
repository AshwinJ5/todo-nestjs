import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './common';
import { ConfigModule } from '@nestjs/config';
// import { UserController } from './user/user.controller';
// import { UserModule } from './user/user.module';
// import { AuthService } from './auth/auth.service';
// import { AuthModule } from './auth/auth.module';

const { MONGO_URI } = config.MONGO;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_URI),
    TodoModule,
    // UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
