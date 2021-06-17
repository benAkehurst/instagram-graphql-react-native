const fetch = require('node-fetch');

describe('resolvers/queries/user', () => {
  const mockUserId = '60c88982771dada7f3a4ae5b';
  const mockUsername = 'user';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzg4OTgyNzcxZGFkYTdmM2E0YWU1YiIsImlhdCI6MTYyMzg1NzgxNn0.9STbGmr3cpu9N7eg4jjPq19uK9LQtzehYxlYBZhT9gw';

  it('should get all users', async () => {
    return fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
				    users {
					    id
					    username
				    }
			    }`
      })
    })
      .then(res => res.json())
      .then(res => expect(res.data.users.length).toBeGreaterThan(0));
  });

  it('should get a single user', async () => {
    return fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({
        query: `
        query {
          user(username:"${mockUsername}") {
            id
            email
            avatar
          }
        }
        `
      })
    })
      .then(res => res.json())
      .then(res => expect(res.data.user.id).toEqual(mockUserId));
  });

  it('should get me', async () => {
    return fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({
        query: `
          query {
            me {
              id
              email
              avatar
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(res => expect(res.data.me.id).toEqual(mockUserId));
  });
});

describe('resolvers/queries/photos', () => {});
