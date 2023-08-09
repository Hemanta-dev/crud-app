// // import { users } from './fakeDB.js';
// import users from './model/user.js';
// import { randomBytes } from 'crypto';

// const resolvers = {
//   Query: {
//     users: () => {
//       return users;
//     },
//     user: (_, args) => {
//       return users.find((user) => user.id === args.id);
//     },
//   },
//   Mutation: {
//     userAdd: (_, { UserNew }) => {
//       const id = randomBytes(5).toString("hex");
//       const { firstName, lastName, email } = UserNew; // Extract individual properties
//       users.push({
//         id,
//         firstName,
//         lastName,
//         email,
//       });
//       return users.find((user) => user.id === id);
//     },
//     userDelete: (_, { id }) => {
//       const index = users.findIndex((user) => user.id === id);

//       if (index !== -1) {
//         const deletedUser = users.splice(index, 1)[0];
//         return deletedUser;
//       }

//       return null; // Return null if user with the given ID is not found
//     },
//     userUpdate: (_, { id, updatedUser }) => {
//       const index = users.findIndex((user) => user.id === id);
    
//       if (index !== -1) {
//         const { firstName, lastName, email } = updatedUser;
//         users[index] = {
//           ...users[index],
//           firstName,
//           lastName,
//           email,
//         };
//         return users[index];
//       }
    
//       return null;
//     },
    
    
  
//   },
// };

// export default resolvers;



// Import necessary modules
import { randomBytes } from 'crypto';
import User from './model/user.js'; 

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find(); 
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching users');
      }
    },
    user: async (_, args) => {
      try {
        const user = await User.findById(args.id); 
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user');
      }
    },
  },
  Mutation: {
    userAdd: async (_, { UserNew }) => {
      try {
        // const id = randomBytes(5).toString('hex');
        const { firstName, lastName, email } = UserNew;
        
        const newUser = new User({
          // _id: id,
          firstName,
          lastName,
          email,
        });

        await newUser.save(); 
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error('Error adding user');
      }
    },
    userDelete: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndRemove(id); 
        return deletedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Error deleting user');
      }
    },
    userUpdate: async (_, { id, updatedUser }) => {
      try {
        const { firstName, lastName, email } = updatedUser;
        
        const updated = await User.findByIdAndUpdate(
          id,
          {
            firstName,
            lastName,
            email,
          },
          { new: true }
        );
        
        return updated;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating user');
      }
    },
  },
};

export default resolvers;







