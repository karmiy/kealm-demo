import fs from 'fs';
import { IFiles, IMockFiles } from '../src/__mocks__/fs'

declare module 'fs' {
    function __setMockFiles(files: IFiles): IMockFiles;
    function readdirSync(path: string): Array<string>;
}