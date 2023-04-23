import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
const answer = await rl.question('What is your name? ');
console.log(`Hello ${answer}!`);
rl.close();
