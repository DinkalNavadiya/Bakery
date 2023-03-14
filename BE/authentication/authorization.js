import { AuthenticationError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) => {
    me ? skip : new AuthenticationError('You are not authenticated as a user.');
}

export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => role.role === 'admin' ? skip : new AuthenticationError('You are not authenticated as a admin.')
)
export const isSuperAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => role.RoleName === 'superAdmin' ? skip : new AuthenticationError('You are not authenticated as a faculty.')
)

export const isUser = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => role.RoleName === 'user' ? skip : new AuthenticationError('You are not authenticated as a faculty.')
   )