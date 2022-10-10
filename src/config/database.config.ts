import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  host: 'localhost',
  port: 3306,
  password: 'wyw123456',
}))
