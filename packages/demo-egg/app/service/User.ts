import { Service } from 'egg';

const asyncWrapper = <T>(promise: Promise<T>) => {
  return promise
    .then(data => [ data, null ] as [T, null])
    .catch(err => [ null, { res: err }] as [null, { res: any }]);
};

/**
 * User Service
 */
export default class User extends Service {
  private users = [
    { id: 1, name: 'karmiy' },
    { id: 2, name: 'karloy' },
    { id: 3, name: 'kealm' },
  ];
  /**
   * mock get user by id
   * @param id - your id
   */
  public async mockGet(id: number) {
    return this.users.find(item => item.id === id);
  }

  public async mysqlAdd(name: string) {
    const { app } = this;
    const querySQL = app.mysql.insert('user', { name });
    const [ res, error ] = await asyncWrapper(querySQL);

    if (error) {
      console.log(error);
      return;
    }

    return res;
  }

  public async mysqlDelete(id: number) {
    const { app } = this;
    const querySQL = app.mysql.delete('user', { id });
    const [ res, error ] = await asyncWrapper(querySQL);

    if (error) {
      console.log(error);
      return;
    }

    return res;
  }

  public async mysqlUpdate(id: number, name: string) {
    const { app } = this;
    const querySQL = app.mysql.update('user', { id, name });
    const [ res, error ] = await asyncWrapper(querySQL);

    if (error) {
      console.log(error);
      return;
    }

    return res;
  }

  public async mysqlGet(id: number) {
    const { app } = this;

    // const querySQL = app.mysql.select<Array<{ id: number; name: string }>>('user');
    const querySQL = app.mysql.get<{ id: number; name: string }>('user', { id });
    const [ res, error ] = await asyncWrapper(querySQL);

    if (error) {
      console.log(error);
      return;
    }

    return res;
  }
}
