
import { UserService } from 'src/user/user.service';
import * as fs from 'fs'
import * as path from 'path'
import * as jwt from 'jsonwebtoken'
export class autorisation {
    constructor(private userService : UserService ) {}

    /**
     * verify
     */
    public async verify(token : string) {
        const publicKey = fs.readFileSync(
          path.resolve('./src/auth/public.key'),
          'utf8',
        );
        const options = {
          issuer: 'Todo',
          subject: 'todo@moaj.info',
          audience: 'moaj.ma',
          expiresIn: 60 * 2, // 2min
          algorithm: 'RS256',
        };
        try {
            var tokenVerifies = jwt.verify(token , publicKey , options)
            return false;
        } catch (error) {
            return false
        }
    }
}