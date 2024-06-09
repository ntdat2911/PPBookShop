import { Query, Resolver } from '@nestjs/graphql';
import { AboutUsEntity } from './entities/about-us.entity';
import { AboutUsService } from './about-us.service';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => AboutUsEntity)
export class AboutUsResolver {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Public()
  @Query(() => String)
  async getAboutUs() {
    return await this.aboutUsService.getAboutUs();
  }
}
