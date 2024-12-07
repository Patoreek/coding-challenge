import fs from 'fs';

// Types for parsing the data
interface Record {
  account_category: string;
  account_type: string;
  value_type: string;
  total_value: number;
}

// Load and parse the data file
const generalLedgerData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
const records: Record[] = generalLedgerData.data;

const calculateRevenue = (records: Record[]) => {
  let revenue = 0;
  records.map((record) => {
    if (record.account_category === 'revenue') revenue += record.total_value;
  });
  return revenue;
};

const main = () => {
  console.log('index.js');
  console.log(records);

  const totalRevenue = calculateRevenue(records);

  console.log(`Total Revenue: ${totalRevenue}`);
};

main();
