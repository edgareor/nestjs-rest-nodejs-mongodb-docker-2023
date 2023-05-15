/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('oauth2')
@Controller('oauth2')
export class AuthController {

    constructor(private jwtService: JwtService) { }

    @Post('token')
    async getToken(@Req() request: any, @Res() response) {
        try {
            let payload = { secret: `client_id:${request.body.client_id},client_secret:${request.body.client_secret},scope:${request.body.scope},grant_type:${request.body.grant_type}` };
            console.log(payload.secret);
            let token = await this.jwtService.signAsync(payload)
            response.status(200).send({ access_token: token, expires_in: 3600 });
        } catch (err) {
            response.status(500).json({ message: err.message });
        }
    }
}
