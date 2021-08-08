import { IApi } from 'dumi';
import IAssetsPackage from 'dumi-assets-types';

export default (api: IApi) => {
  api.register({
    key: 'dumi.modifyAssetsMeta',
    fn(pkg: IAssetsPackage) {
      // 处理 pkg 并返回新的 pkg
      console.log('pkg', pkg);
      return pkg;
    },
  });
};