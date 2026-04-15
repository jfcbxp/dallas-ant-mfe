import toBRL from './toBRL';

describe('toBRL', () => {
  it('formats 0 as R$ 0,00', () => {
    expect(toBRL(0)).toBe('R$\u00a00,00');
  });

  it('formats 1234.56 containing 1.234,56', () => {
    expect(toBRL(1234.56)).toContain('1.234,56');
  });
});
