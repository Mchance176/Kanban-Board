export const seedUsers = async () => {
    try {
      console.log('Starting to seed users...');
      const users = await User.bulkCreate([
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
      ], { individualHooks: true });
      
      console.log('Users seeded successfully:', users.map(u => u.username));
      return users;
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  };