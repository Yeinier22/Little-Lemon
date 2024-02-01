// jest.setup.js
import '@testing-library/jest-dom';

jest.mock('../Context/alertContext', () => ({
  ...jest.requireActual('../Context/alertContext'),
  useAlert: jest.fn(() => ({
    isOpen: false,
    setIsOpen: jest.fn(),
    onClose: jest.fn(),
  })),
}));