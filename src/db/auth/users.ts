import type { GithubUser } from '$const';
import { prisma_client } from '../../hooks.server';

interface Create_User {
	github_user: GithubUser;
}

export function create_user({ github_user }: Create_User) {
	return prisma_client.user.create({
		data: {
			avatar_url: github_user.avatar_url,
			email: github_user.email,
			github_id: github_user.id,
			username: github_user.login
		}
	});
}

export async function find_or_create_user({ github_user }: Create_User) {
	const user = await prisma_client.user.findUnique({
		where: {
			github_id: github_user.id
		}
	});
	if (user) {
		return user;
	} else {
		return create_user({ github_user });
	}
}

export async function find_user_by_access_token(access_token: string) {
	// Get session from access token
	const session = await prisma_client.session.findUnique({
		where: {
			access_token
		}
	});
	// If a session exists that is tied to a user
	if (session?.user_id) {
		return prisma_client.user.findUnique({
			where: {
				id: session.user_id
			}
		});
	}
	return null;
}