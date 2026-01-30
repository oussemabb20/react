import { Search } from './fonction.js'

// 1) findLongestWord: uses destructuring, map and reduce
export const findLongestWord = (wordsArr) => {
  let [...words] = wordsArr;
  const mapped = words.map(w => ({ mot: w, longueur: w.length }));
  const longest = mapped.reduce((a, b) => (a.longueur >= b.longueur ? a : b), { mot: '', longueur: 0 });
  return longest;
}

// 2) Count occurrences from nested arrays using flat and reduce
export const countOccurrences = (nestedArr) => {
  return nestedArr.flat().reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
}

// 3) Total marks after giving +15 bonus to those <50, then sum marks >50
export const totalAfterBonus = (students) => {
  const adjusted = students.map(s => ({ ...s, marks: s.marks < 50 ? s.marks + 15 : s.marks }));
  const passed = adjusted.filter(s => s.marks > 50);
  return passed.reduce((sum, s) => sum + s.marks, 0);
}

// 4) Tab array and helpers with incremental global ID
export const Tab = [];
export let lastId = 0;

export const addEntry = (entry, toStart = false) => {
  lastId += 1;
  const obj = { ...entry, id: lastId };
  if (toStart) Tab.unshift(obj);
  else Tab.push(obj);
  return obj;
}

// Demo usage / example inputs and console outputs
if (typeof window === 'undefined' || typeof document === 'undefined') {
  // Running in Node (or non-browser) environment — show demos in console
  console.log('--- ECMA Script Exercises Demo ---');

  console.log('\n1) findLongestWord:');
  console.log(findLongestWord(['a', 'ab', 'abc', 'abcd', 'xy']));

  console.log('\n2) countOccurrences:');
  const nested = [['a', 'b', 'c'], ['c', 'd', 'f'], ['d', 'f', 'g']];
  console.log(countOccurrences(nested));

  console.log('\n3) totalAfterBonus:');
  const students = [
    { name: 'John', id: 123, marks: 98 },
    { name: 'Baba', id: 101, marks: 23 },
    { name: 'John', id: 200, marks: 45 },
    { name: 'Wick', id: 115, marks: 75 },
  ];
  console.log(totalAfterBonus(students));

  console.log('\n4) Tab + Search:');
  addEntry({ name: 'Alice' });
  addEntry({ name: 'Bob' });
  addEntry({ name: 'Zoe' }, true);
  console.log('Tab:', Tab);
  console.log('Search id 2 ->', Search(Tab, 2));
}
