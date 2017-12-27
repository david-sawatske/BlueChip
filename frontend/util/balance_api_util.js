export const updateBalance = cash_balance => (
	$.ajax({
		method: 'PATCH',
		url: `/api/cash_balances/${cash_balance.id}`,
		data: { cash_balance }
	})
);

export const createCashBalance = cash_balance => (
  $.ajax({
    method: 'POST',
    url: '/api/cash_balances',
    data: {
      cash_balance
    }
  })
);
