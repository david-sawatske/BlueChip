export const postTransaction = transaction => (
	$.ajax({
		method: 'POST',
		url: `/api/transactions/`,
		data: { transaction }
	})
);
