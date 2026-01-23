import { Repository } from 'typeorm';
import { Agency } from 'src/database/agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';
export declare class AgenciesService {
    private readonly agencyRepository;
    constructor(agencyRepository: Repository<Agency>);
    getAgencyByUsername(username: string): Promise<Omit<Agency, 'password'>>;
    updateProfile(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Omit<Agency, 'password'>>;
}
