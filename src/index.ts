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

const calculateRevenue = (records: Record[]): number => {
  let revenue: number = 0;
  records.map((record) => {
    if (record.account_category === 'revenue') revenue += record.total_value;
  });
  return revenue;
};

const calculateExpenses = (records: Record[]): number => {
  let expenses: number = 0;
  records.map((record) => {
    if (record.account_category === 'expense') expenses += record.total_value;
  });
  return expenses;
};

const calculateGrossProfitMargin = (
  records: Record[],
  revenue: number
): number => {
  let sales: number = 0;
  records.map((record) => {
    if (record.account_type === 'sales' && record.value_type === 'debit')
      sales += record.total_value;
  });
  return sales / revenue;
};

const calculateNetProfitMargin = (
  totalRevenue: number,
  totalExpenses: number
): number => {
  return (totalRevenue - totalExpenses) / totalRevenue;
};

const main = () => {
  console.log('index.js');
  // console.log(records);

  const totalRevenue: number = calculateRevenue(records);
  const totalExpenses: number = calculateExpenses(records);
  const totalGrossProfitMargin: number = calculateGrossProfitMargin(
    records,
    totalRevenue
  );
  const totalNetProfitMargin: number = calculateNetProfitMargin(
    totalRevenue,
    totalExpenses
  );

  console.log(`Total Revenue: ${totalRevenue}`);
  console.log(`Total Expenses: ${totalExpenses}`);
  console.log(`Total Gross Profit Margin: ${totalGrossProfitMargin}`);
  console.log(`Total Net Profit Margin: ${totalNetProfitMargin}`);
};

main();
