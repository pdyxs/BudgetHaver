window.currencies = {
  AUD: {
    value: 1,
    name: 'AUD',
    formatter: new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2
    })
  },
  USD: {
    value: 0.71,
    name: 'USD',
    formatter: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
  }
}
