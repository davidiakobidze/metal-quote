import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {CustomerSeeder} from "./seeder/customerSeeder";
import {ProductSeeder} from "./seeder/productSeeder";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors()
  const customerSeeder = app.get(CustomerSeeder);
  await customerSeeder.seed();
  const productSeeder = app.get(ProductSeeder);
  await productSeeder.seed();
  await app.listen(3000);
}
bootstrap();
