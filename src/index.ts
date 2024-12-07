import fs from 'fs';

// Types for parsing the data
interface Record {
  account_category: string;
  account_type: string;
  value_type: string;
  total_value: number;
}

// Load and parse the data file
const data: Record[] = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const main = () => {
  console.log('index.js');
};

main();
