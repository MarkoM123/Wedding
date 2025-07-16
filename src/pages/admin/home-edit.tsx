const res = await fetch('/api/admin/home', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // token iz localStorage, cookie, context itd.
  },
  body: JSON.stringify(homeData),
});
