import { hash } from 'bcryptjs';
import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateService } from './authenticate.service';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

let usersRepository:InMemoryUsersRepository;

let sut: AuthenticateService;

describe('Authenticate Use Case',()=>{

	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository();

		sut = new AuthenticateService(usersRepository);
	});

	it('should be able to authenticate',async ()=>{
	
		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456',6)
		});

		const {user} = await sut.execute({
			email:'johndoe@example.com',
			password: '123456'
		});

		expect(user.id)
			.toEqual(expect.any(String));
	});
  
	it('should not be able to authenticate with wrong email',async ()=>{
    
		await expect(()=>
			sut.execute({
				email:'johndoe@example.com',
				password: '123123123'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
			
	});

	it('should not be able to authenticate with wrong password',async ()=>{

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password_hash: await hash('123123123',6)
		});

		await expect(()=>
			sut.execute({
				email:'johndoe@example.com',
				password: '123'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
			
	});
});