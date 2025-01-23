import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-user-repository';

interface RegisterServiceRequest{
	name:string,
	email:string, 
	password:string
}

export async function registerService({
	email,name,password
}:RegisterServiceRequest){
	const password_hash = await hash(password,6);

	const userWithSameEmail = await prisma.user.findUnique({where:{email}});

	if(userWithSameEmail){
		throw new Error('E-mail already exist');
	}

	const prismaUsersRepository = new PrismaUsersRepository();

	await prismaUsersRepository.create({
		name,
		email,
		password_hash
	});
}