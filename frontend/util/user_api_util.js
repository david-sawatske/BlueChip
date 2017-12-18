export const fetchTargetUserData = (id) => (
	$.ajax({
		method: 'GET',
		url: `/api/users/${id}`
	})
);
