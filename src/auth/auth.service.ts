import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { User } from '../schemas/user.schema'; 
import { UserHistory } from '../schemas/user-history.schema'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserHistory.name) private userHistoryModel: Model<UserHistory>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({
      email: payload.email,
    });

    if (!user) {
      throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
    }

    const match = await compare(payload?.password as string, user?.password as string);
    if (!match) {
      throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
    }

    if(!match){
      throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
    }
    
    console.log("Usuario encontrado");
    
    const userPayload = {
      _id: user?._id,
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
    };

    const accessToken = this.jwtService.sign(userPayload);
    const refreshToken = this.jwtService.sign(userPayload, {
      secret: this.configService.get('REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get('REFRESH_JWT_TIME'),
    });

    await this.userHistoryModel.create({
      accessToken,
      refreshToken,
      user,
    });

    return { accessToken, refreshToken };
  }

  async check(headers: Record<string, string>) {
    const token = headers['authorization']?.split(' ')[1] || '';
    if (!token) throw new UnauthorizedException;

    try {
      const decode = await this.jwtService.verifyAsync(token);
      const user = await this.userModel.findOne({ _id: decode?._id});
      if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      return decode;
    } catch (error) {
      throw new UnauthorizedException;
    }
  }

  async refresh(headers: Record<string, string>) {
    const token = headers['authorization']?.split(' ')[1] || '';
    if (!token) throw new UnauthorizedException;

    try {
      const valid = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('REFRESH_JWT_SECRET'),
      });
      if(!valid) throw new UnauthorizedException;

      const user = await this.userModel.findOne({ _id: valid?._id});
      if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

      const userPayload = {
        _id: user?._id,
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
      };

      const accessToken = this.jwtService.sign(userPayload);
      const refreshToken = this.jwtService.sign(userPayload, {
        secret: this.configService.get('REFRESH_JWT_SECRET'),
        expiresIn: this.configService.get('REFRESH_JWT_TIME'),
      });

      await this.userHistoryModel.create({accessToken, refreshToken, user, }); 

      return { accessToken, refreshToken }; 
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED); 
    }
  }
}

