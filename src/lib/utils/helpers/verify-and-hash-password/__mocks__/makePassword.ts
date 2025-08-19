export const testHashedPassword = 'testHashedPassword'
export const verifyAndHashPassword = jest
  .fn()
  .mockResolvedValue(testHashedPassword)
