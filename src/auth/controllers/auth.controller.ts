import { Controller, Post, UseGuards, Body, Get, Request } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('hello')
  getHello() {
    return 'hello world'
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Post('refresh-token')
  async refreshToken(@Body() req) {
    return this.authService.regenerateTokens(req)
  }
}
