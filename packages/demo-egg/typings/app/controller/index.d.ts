// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAbout from '../../../app/controller/about';
import ExportCookie from '../../../app/controller/cookie';
import ExportEjs from '../../../app/controller/ejs';
import ExportExtend from '../../../app/controller/extend';
import ExportHome from '../../../app/controller/home';
import ExportSession from '../../../app/controller/session';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    about: ExportAbout;
    cookie: ExportCookie;
    ejs: ExportEjs;
    extend: ExportExtend;
    home: ExportHome;
    session: ExportSession;
    user: ExportUser;
  }
}
