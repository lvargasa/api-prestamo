import { Injectable } from '@nestjs/common'
import { UsersService } from '../../users/services/users.service'
import { JwtService } from '@nestjs/jwt'
import { CryptoService } from '../../crypto/services/crypto.service'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByUsername(username)
    if (user && (await this.cryptoService.compare(password, user.password))) {
      return user
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id
    }
  }

  async getRefreshToken(payload: any): Promise<any> {
    const options = {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE
    }
    return this.jwtService.sign(payload, options)
  }

  async regenerateTokens(refresh: any): Promise<any> {
    const options = {
      secret: process.env.JWT_REFRESH_SECRET
    }
    if (await this.jwtService.verify(refresh.refreshToken, options)) {
      const oldSignedPayload: any = this.jwtService.decode(refresh.refreshToken)
      const newUnsignedPayload = {
        sub: oldSignedPayload.sub,
        username: oldSignedPayload.username
      }
      return {
        access_token: this.jwtService.sign(newUnsignedPayload),
        refresh_token: await this.getRefreshToken(newUnsignedPayload)
      }
    }
  }
}
