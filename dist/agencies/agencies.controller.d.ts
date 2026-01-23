import { AgenciesService } from './agencies.service';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from 'src/database/agency.entity';
export declare class AgenciesController {
    private readonly agenciesService;
    constructor(agenciesService: AgenciesService);
    getAgencyByUsername(username: string): Promise<Omit<Agency, "password">>;
    updateProfile(user: Agency, updateAgencyDto: UpdateAgencyDto): Promise<Omit<Agency, "password">>;
}
