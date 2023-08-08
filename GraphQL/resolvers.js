import { users } from './fakeDB.js';
import { randomBytes } from 'crypto';

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, args) => {
      return users.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    userAdd: (_, { UserNew }) => {
      const id = randomBytes(5).toString("hex");
      const { firstName, lastName, email } = UserNew; // Extract individual properties
      users.push({
        id,
        firstName,
        lastName,
        email,
      });
      return users.find((user) => user.id === id);
    },
    userDelete: (_, { id }) => {
      const index = users.findIndex((user) => user.id === id);

      if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
      }

      return null; // Return null if user with the given ID is not found
    },
    userUpdate: (_, { id, updatedUser }) => {
      const index = users.findIndex((user) => user.id === id);
    
      if (index !== -1) {
        const { firstName, lastName, email } = updatedUser;
        users[index] = {
          ...users[index],
          firstName,
          lastName,
          email,
        };
        return users[index];
      }
    
      return null;
    },
    
    
  
  },
};

export default resolvers;







