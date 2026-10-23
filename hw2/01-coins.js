/** Exercise 01 - Coins **/

// Add your function here

function calculateChange(amount) {
  // Rejects invalid or non infinite numbers
  if (!Number.isFinite(amount)) {
    return 'Error: the amount must be a valid number';
  }
  // Check if too large
  if (amount > 100) {
    return 'Error: the number is too large';
  }
  // Check if too small
  if (amount < 0) {
    return 'Error: the number is too small';
  }
  // No calculation needed
  if (amount === 0) {
    return '$0 ==> 0 pennies';
  }
  // Check if not a valid number
  if (Math.abs(amount * 100 - Math.round(amount * 100)) > 1e-8) {
    return 'Error: must be in the hundredths place at most';
  }
  let remaining = Math.round(amount * 100);
  const output = [];
  if (remaining >= 100) {
    const dollars = Math.floor(remaining / 100);
    remaining -= 100 * dollars;
    output.push(`${dollars} ${dollars === 1 ? 'dollar' : 'dollars'}`);
  }
  if (remaining >= 25) {
    const quarters = Math.floor(remaining / 25);
    remaining -= 25 * quarters;
    output.push(`${quarters} ${quarters === 1 ? 'quarter' : 'quarters'}`);
  }
  if (remaining >= 10) {
    const dimes = Math.floor(remaining / 10);
    remaining -= 10 * dimes;
    output.push(`${dimes} ${dimes === 1 ? 'dime' : 'dimes'}`);
  }
  if (remaining >= 5) {
    remaining -= 5;
    output.push('1 nickel');
  }
  if (remaining >= 1) {
    const pennies = remaining;
    output.push(`${pennies} ${pennies === 1 ? 'penny' : 'pennies'}`);
  }
  return `$${amount} ==> ${output.join(', ')}`;
}

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(-15));
// Error: the number is too small
console.log(calculateChange(3.333));
// Error: must be in the hundredths place at most"
console.log(calculateChange(NaN));
// Error: the amount must be a valid number
console.log(calculateChange(0));
// $0 ==> 0 pennies
