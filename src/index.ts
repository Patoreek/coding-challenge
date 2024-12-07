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

const formatCurrency = (value: number): String => {
  let formattedValue: number | String = Math.floor(value);
  formattedValue = formattedValue.toLocaleString('en-US');
  return '$' + formattedValue;
};

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

const calculateWorkingCapitalRatio = (records: Record[]): number => {
  let assets = 0;
  let liabilities = 0;

  const assetsAccountTypes = ['current', 'bank', 'current_accounts_receivable'];
  const liabilitiesAccountTypes = ['current', 'current_accounts_payable'];

  records.map((record) => {
    if (
      record.account_category === 'assets' &&
      assetsAccountTypes.includes(record.account_type)
    ) {
      if (record.value_type === 'debit') {
        assets += record.total_value;
      } else {
        assets -= record.total_value;
      }
    }

    if (
      record.account_category === 'liability' &&
      liabilitiesAccountTypes.includes(record.account_type)
    ) {
      if (record.value_type === 'credit') {
        liabilities += record.total_value;
      } else {
        liabilities -= record.total_value;
      }
    }
  });

  return assets / liabilities;
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
  const totalWorkingCapitalRatio: number =
    calculateWorkingCapitalRatio(records);

  console.log(`Total Revenue: ${formatCurrency(totalRevenue)}`);
  console.log(`Total Expenses: ${formatCurrency(totalExpenses)}`);
  console.log(`Total Gross Profit Margin: ${totalGrossProfitMargin}`);
  console.log(`Total Net Profit Margin: ${totalNetProfitMargin}`);
  console.log(`Total Working Capital Ratio: ${totalWorkingCapitalRatio}`);
};

main();
