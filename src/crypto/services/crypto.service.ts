import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CryptoService {
  public async hash(
    target: string,
    salt: number = +process.env.HASH_SALT
  ): Promise<string> {
    return await bcrypt.hash(target, salt)
  }

  public async compare(target: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(target, hash)
  }

  public async genSalt(): Promise<string> {
    return await bcrypt.genSalt()
  }
}
