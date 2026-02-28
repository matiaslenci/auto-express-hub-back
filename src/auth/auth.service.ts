
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Agency, Plan } from 'src/database/agency.entity';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async register(
    createAgencyDto: CreateAgencyDto,
  ): Promise<{ access_token: string; agency: Omit<Agency, 'password'> }> {
    const { username, email, password, nombre, plan } =
      createAgencyDto;

    const existingAgency = await this.agencyRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingAgency) {
      throw new ConflictException('El nombre de usuario o correo electrónico ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agency = this.agencyRepository.create({
      username,
      email,
      password: hashedPassword,
      nombre,
      plan: plan ?? Plan.GRATUITO,
    });

    const savedAgency = await this.agencyRepository.save(agency);

    // Generar token JWT
    const payload = { id: savedAgency.id, username: savedAgency.username };
    const access_token = this.jwtService.sign(payload);

    // Excluir password antes de devolver
    const { password: _, ...agencyData } = savedAgency;

    return {
      access_token,
      agency: agencyData,
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; agency: Omit<Agency, 'password'> }> {
    const { email, password } = loginDto;
    const agency = await this.agencyRepository.findOne({
      where: { email },
      select: ['id', 'password'],
    });

    if (!agency || !agency.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordMatching = await bcrypt.compare(password, agency.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Cargar todos los datos de la agencia (sin password)
    const fullAgency = await this.agencyRepository.findOne({
      where: { id: agency.id },
    });

    if (!fullAgency) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const payload = { id: fullAgency.id, username: fullAgency.username };
    const access_token = this.jwtService.sign(payload);

    // Excluir password antes de devolver
    const { password: _, ...agencyData } = fullAgency;

    return {
      access_token,
      agency: agencyData,
    };
  }
}

