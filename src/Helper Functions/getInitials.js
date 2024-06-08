export default function getInitials(fullName) {
  // Initializing Variables
  let initialIndices = [0];
  let firstLetters = [];

  // finding first letters indexes of user
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] === " ") initialIndices.push(i + 1);
  }

  // using the first letter indexes to grab the user's initials
  initialIndices.forEach((initialIndex) => {
    firstLetters.push(fullName.at(initialIndex));
  });

  // returning initials//
  return firstLetters.join("").toLowerCase();
}
