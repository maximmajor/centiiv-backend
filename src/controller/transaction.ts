import sql from '../stores/pg';

async function getAllTransactions() {
  return sql`SELECT * FROM transaction`;
}

export = getAllTransactions;
