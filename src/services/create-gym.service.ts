import { Gym } from '@/entities/gym';
import { GymsRepository } from '@/repositories/gyms-repository';

interface CreateGymServiceRequest{
	title:string,
	description: string | null
	phone: string | null
	latitude:number,
	longitude: number
}

interface CreateGymServiceResponse{
	gym: Gym
}

export class CreateGymService{
  
	constructor(private gymsRepository: GymsRepository){}

	async execute({
		latitude,longitude,phone,title,description
	}:CreateGymServiceRequest):Promise<CreateGymServiceResponse>{
	
		const gym = await this.gymsRepository.create({
			latitude,
			longitude,
			phone,
			title,
			description: description ?? null
		});

		return {gym};
	}
}

