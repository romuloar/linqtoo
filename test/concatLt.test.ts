import { addConcatLt } from '../src/methods/concatLt';

describe('Array.prototype.concatLt', () => {
  beforeAll(() => {
    addConcatLt();
  });

  it('should concatenate two arrays correctly', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const result = arr1.concatLt(arr2);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should concatenate multiple arrays correctly', () => {
    const arr1 = [1];
    const arr2 = [2];
    const arr3 = [3, 4];
    const result = arr1.concatLt(arr2, arr3);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should concatenate array with single values correctly', () => {
    const arr1 = [1];
    const result = arr1.concatLt(2, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should not modify the original array', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const result = arr1.concatLt(arr2);
    expect(arr1).toEqual([1, 2]);  // original array unchanged
  });

  it('should work correctly with no arguments', () => {
    const arr1 = [1, 2];
    const result = arr1.concatLt();
    expect(result).toEqual([1, 2]);
  });
});
