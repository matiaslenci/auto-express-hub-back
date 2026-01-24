
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Agency } from 'src/database/agency.entity';
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
  ): Promise<{ message: string }> {
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
      plan,
    });

    await this.agencyRepository.save(agency);
    return { message: 'Agencia registrada exitosamente' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
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

    const payload = { id: agency.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}

