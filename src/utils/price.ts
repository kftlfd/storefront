import { Currency, Price } from '@/api/types';

function getFormatter(currencyLabel: string) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyLabel,
    currencyDisplay: 'narrowSymbol',
  });
}

export function formatPrice(prices: Price[], currency: string, quantity = 1) {
  const priceObj = currency ? prices.find((x) => x.currency.label === currency) : prices[0];

  const formatter = getFormatter(priceObj!.currency.label);

  const price = priceObj!.currency.symbol + formatter.format(priceObj!.amount * quantity).slice(1);

  return price;
}

export function formatTotal(amount: number, currencyObj: Currency) {
  const formatter = getFormatter(currencyObj.label);
  return currencyObj.symbol + formatter.format(amount).slice(1);
}
