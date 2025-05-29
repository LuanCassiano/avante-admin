export default () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
    user: { email: 'test@example.com', uid: '12345', }
  })),
});