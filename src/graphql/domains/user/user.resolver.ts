import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
import { UserCreateInput, LoginInput } from '../../../shared/types';
@Resolver()
  export class UserResolver {
    constructor(
    ) {}

    @Query()
    async whoami(@Context('user') user) {
      const { email } = user;
      return null
    }

    @Query()
    async login(
      @Args('input') input: LoginInput
    ) {
      return null
    }

    @Mutation()
    async userCreate(@Args('input') input: UserCreateInput) {
    return {};
    }
  }

