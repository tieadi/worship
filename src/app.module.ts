import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_HOST), VisitorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
