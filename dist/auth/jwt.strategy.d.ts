import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Agency } from 'src/database/agency.entity';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly agencyRepository;
    private readonly configService;
    constructor(agencyRepository: Repository<Agency>, configService: ConfigService);
    validate(payload: {
        id: string;
    }): Promise<Agency>;
}
export {};
