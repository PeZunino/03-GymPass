import { User } from '@/entities/user';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository{
	async findById(id: string): Promise<User | null> {
		const user = this.items.find(item=>item.id === id);

		if(!user){
			return null;
		}

		return user;
	}
	public items: User[] = [];
	
	async create(data: User) {
		const user = {
			id: 'user-1',
			name: data.name,
			email:data.email,
			password_hash: data.password_hash,
			created_at: new Date()
		};

		this.items.push(user);

		return user;
	}
	
	async findByEmail(email: string) {
		const user = this.items.find(item=>item.email === email);

		if(!user){
			return null;
		}

		return user;
	}
  
}