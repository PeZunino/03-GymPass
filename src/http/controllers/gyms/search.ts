import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service';

export async function search (request:FastifyRequest,response:FastifyReply){
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number()
			.min(1)
			.default(1)
	});

	const {
		page,q
	} = searchGymsQuerySchema.parse(request.query);

	const searchGymsService = makeSearchGymsService();

	const gyms = await searchGymsService.execute({
		page,
		query:q
	});

	return response.status(200)
		.send(gyms);
}