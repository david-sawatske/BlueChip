export const fetchTargetLeague = id => (
	$.ajax({
		method: 'GET',
		url: `/api/leagues/${id}`
	})
);

export const fetchAllLeagues = () => (
	$.ajax({
		method: 'GET',
		url: `/api/leagues`
	})
);

export const createLeague = league => (
  $.ajax({
    method: 'POST',
    url: 'api/leagues',
    data: { league }
  })
)
