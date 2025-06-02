const collection = jest.fn(() => ({
  get: jest.fn(),
  doc: jest.fn(() => ({
    delete: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  })),
  add: jest.fn(),
  onSnapshot: jest.fn(),
}));

export default () => ({
  collection,
});
