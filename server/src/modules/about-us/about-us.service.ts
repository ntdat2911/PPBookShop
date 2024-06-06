import { Injectable } from '@nestjs/common';
import { AboutUsRepository } from './about-us.repository';

@Injectable()
export class AboutUsService {
  constructor(private readonly aboutUsRepository: AboutUsRepository) {}

  async writeAboutUs(id: number, content: string) {
    return await this.aboutUsRepository.writeAboutUs(id, content);
  }

  async getAboutUs() {
    const result = await this.aboutUsRepository.getAboutUs();
    return result.Content;
  }
}
