import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './domains/user/user.resolver';
import { join } from 'path';
@Module({
    imports: [
      GraphQLModule.forRoot({
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/shared/types/graphql.g.ts'),
        },
        context: ({ req }) => ({ headers: req.headers }),
      }),
    ],
    providers: [
      UserResolver
    ],
    exports: [
      UserResolver,
      GraphQLModule,
    ]
  })
  export class GraphqlModule {}
