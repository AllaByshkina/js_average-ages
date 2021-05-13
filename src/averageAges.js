'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const mans = (century !== undefined) ? people.filter(function(item) {
    return item.sex === 'm' && Math.ceil(item.died / 100) === century;
  }) : people.filter(function(item) {
    return item.sex === 'm';
  });

  const averAge = mans.reduce(function(sum, current) {
    return sum + (current.died - current.born);
  }, 0) / mans.length;

  return averAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const girls = people.filter(person => withChildren
    ? people.some(kid => kid.mother === person.name)
    : person.sex === 'f'
  );

  const sumAge = girls.reduce((sum, value) =>
    sum + (value.died - value.born), 0);

  const averageAge = sumAge / girls.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // const children = onlyWithSon !== undefined
  // ? people.filter(child => child.sex === 'm' && child.born)
  // : people.filter(child => child.born);
  // const age = children.map(kid => kid.born - people.find(mother =>
  // mother !== null ? mother.name === kid.mother : mother.name).born);
  // const averageAge = age.reduce((sum, value) => sum + value, 0) / age.length;

  // return averageAge;

  // function calculateAverageAgeDiff(people, onlyWithSon) {
  let onlyWithMother = people
    .filter(person => people.find(elem => elem.name === person.mother));

  (onlyWithSon) && (onlyWithMother = onlyWithMother
    .filter(person => person.sex === 'm'));

  return onlyWithMother
    .map(person => person.born
        - people.find(elem => elem.name === person.mother).born)
    .reduce((total, amount) => total + amount) / onlyWithMother.length
    .toFixed(2);
  // }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
