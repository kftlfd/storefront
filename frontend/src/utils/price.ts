import { Currency, Price } from '@/api/types';

function getFormatter(currencyLabel: string) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyLabel,
    currencyDisplay: 'narrowSymbol',
  });
}

export function formatPrice(prices: Price[], currency: Currency | null, quantity = 1) {
  if (!currency) {
    return '???';
  }

  const priceObj = currency ? prices.find((x) => x.currency.label === currency.label) : prices[0];

  if (!priceObj) {
    return '-';
  }

  const formatter = getFormatter(priceObj.currency.label);

  const price = priceObj.currency.symbol + formatter.format(priceObj.amount * quantity).slice(1);

  return price;
}

export function formatTotal(amount: number, currency: Currency | null) {
  if (!currency) {
    return '???';
  }

  const formatter = getFormatter(currency.label);
  return currency.symbol + formatter.format(amount).slice(1);
}
