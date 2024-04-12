import { Test, TestingModule } from '@nestjs/testing';
import { AdobeAcrobatApiController } from './adobe-acrobat-api.controller';

describe('AdobeAcrobatApiController', () => {
  let controller: AdobeAcrobatApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdobeAcrobatApiController],
    }).compile();

    controller = module.get<AdobeAcrobatApiController>(AdobeAcrobatApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
