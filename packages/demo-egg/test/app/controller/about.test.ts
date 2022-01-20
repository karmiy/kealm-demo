import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/about.test.ts', () => {
  it('should GET /about', async () => {
    const result = await app.httpRequest().get('/about').expect(200);
    assert(result.text === 'hi, about');
  });
});
