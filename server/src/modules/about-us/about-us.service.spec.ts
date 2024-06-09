import { Test, TestingModule } from '@nestjs/testing';
import { AboutUsService } from './about-us.service';
import { AboutUsRepository } from './about-us.repository';

describe('AboutUsService', () => {
  let service: AboutUsService;
  let repo: AboutUsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutUsService,
        {
          provide: AboutUsRepository,
          useValue: {
            getAboutUs: jest.fn().mockResolvedValue({ Content: 'Test Content' }),
          },
        },
      ],
    }).compile();

    service = module.get<AboutUsService>(AboutUsService);
    repo = module.get<AboutUsRepository>(AboutUsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAboutUs should return content', async () => {
    expect(await service.getAboutUs()).toBe('Test Content');
    expect(repo.getAboutUs).toHaveBeenCalled();
  });
});