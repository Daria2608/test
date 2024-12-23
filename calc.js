

// Орієнтовний час обробки усіх можливих результатів і формування остаточного : 20 хв.

const fs = require('fs');

function readFragments(filePath) {
  return fs.readFileSync(filePath, 'utf-8').trim().split('\n');
}

function findLongestSequence(currentSequence, remainingFragments) {
  if (remainingFragments.length === 0) {
    return currentSequence;
  }

  let longestSequence = currentSequence;

  for (let i = 0; i < remainingFragments.length; i++) {
    const fragment = remainingFragments[i];

    if (currentSequence.slice(-2) === fragment.slice(0, 2)) {
      const newSequence = currentSequence + fragment.slice(2);
      const newFragments = [...remainingFragments];
      newFragments.splice(i, 1);

      const candidateSequence = findLongestSequence(newSequence, newFragments);

      if (candidateSequence.length > longestSequence.length) {
        longestSequence = candidateSequence;
      }
    }
  }

  return longestSequence;
}

function calc() { 
  const filePath = './source.txt';  
  const fragments = readFragments(filePath); 

  let longest = ''; 

  for (let i = 0; i < fragments.length; i++) { 
    const startingFragment = fragments[i]; 
    const remainingFragments = [...fragments]; 
    remainingFragments.splice(i, 1); 

    const candidate = findLongestSequence(startingFragment, remainingFragments); 
    
    if (candidate.length > longest.length) { 
      longest = candidate; 
      console.log('Оновлено longest:', longest); 
    }
  } 

  console.log('Найдовша послідовність:', longest); 
}

calc();