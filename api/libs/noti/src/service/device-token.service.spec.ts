import { TestBed } from '@automock/jest';
import { DeviceTokenService } from './device-token.service';
import { DeviceTokenRepository } from '../repository/device-token.repository';

describe('DeviceTokenService Test', () => {
  let service: DeviceTokenService;
  let deviceTokenRepository: jest.Mocked<DeviceTokenRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DeviceTokenService).compile();

    service = unit;
    deviceTokenRepository = unitRef.get(DeviceTokenRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
