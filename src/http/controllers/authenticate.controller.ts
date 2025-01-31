import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials.error';
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service';

export async function authenticate (request:FastifyRequest,response:FastifyReply){
	const authenticateBodySchema = z.object({
		email: z.string()
			.email(),
		password: z.string()
			.min(6)
	});

	const {
		email,password
	} = authenticateBodySchema.parse(request.body);

	try{
		const authenticateService = makeAuthenticateService();

		await authenticateService.execute({
			email,
			password
		});

	}catch(err){
		if(err instanceof InvalidCredentialsError){
			return response.status(400)
				.send({message: err.message});
		}

		throw err;
	}

	return response.status(200)
		.send();
}