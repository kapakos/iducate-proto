import utilities from '../';
describe('Utilities', () => {
  it('returns an empty string if array is empty', () => {
    const arr = [];
    const expected = '';

    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });

  it('adds a space before the string if it is only one element in the array', () => {
    const arr = ['skills'];
    const expected = ' skills';

    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });

  it('adds \'and\' between two elements', () => {
    const arr = ['skills', 'educations'];
    const expected = 'skills and educations';

    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });

  it('adds \',\' between the first elements and \'and\' between two last elements', () => {
    const arr = ['personal data', 'skills', 'educations'];
    const expected = 'personal data, skills and educations';

    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });

  it('adds \',\' between the first elements and \'and\' between two last elements with many elements in the array', () => {
    const arr = ['personal data', 'skills', 'educations', 'courses'];
    const expected = 'personal data, skills, educations and courses';

    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });

  it('ignores empty strings, undefined and null in the array', () => {
    const arr = ['', 'skills', 'personal data', 'educations', '', '', null, undefined];
    const expected = 'skills, personal data and educations';
    const result = utilities.formatEnumerationIntoMessage(arr);
    expect(result).equal(expected);
  });
});
