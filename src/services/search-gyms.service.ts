import { Gym } from '@/entities/gym';
import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsServiceRequest{
	query:string,
	page:number
}

interface SearchGymsServiceResponse{
	gyms: Gym[]
}

export class SearchGymsService{
  
	constructor(private gymsRepository: GymsRepository){}

	async execute({
		page,query
	}:SearchGymsServiceRequest):Promise<SearchGymsServiceResponse>{
  
		const gyms = await this.gymsRepository.searchMany(query,page);

		return {gyms};
	}
}

