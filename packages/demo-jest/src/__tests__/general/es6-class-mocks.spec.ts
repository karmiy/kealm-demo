import SoundPlayer from '@utils/sound-player';
import SoundPlayerM, { mockPlaySoundFile } from '@utils/sound-player-m';
import SoundPlayerConsumer from '@utils/sound-player-consumer';
jest.mock('@utils/sound-player');
jest.mock('@utils/sound-player-m');

describe('es6 class mocks of automatic mock ', () => {
    beforeEach(() => {
        SoundPlayer.mockClear();
        mockPlaySoundFile.mockClear();
    });

    /* 测试是否调用了构造函数 new SoundPlayer */
    it('test whether the consumer called the class constructor', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(SoundPlayer).toHaveBeenCalledTimes(1);
    });

    /* 测试是否调用了实例 instance 的方法 */
    it('test whether the consumer called a method on the class instance', () => {
        /* beforeEach 清空了 mock */
        expect(SoundPlayer).not.toHaveBeenCalled(); // 构造函数未被调用

        const soundPlayerConsumer = new SoundPlayerConsumer();


        expect(SoundPlayer).toHaveBeenCalledTimes(1); // 构造函数被调用

        soundPlayerConsumer.playSomethingCool(); // 会触发 SoundPlayer 实例 instance 的 playSoundFile 方法

        const mockSoundPlayerInstance = SoundPlayer.mock.instances[0]; // 获得创建的实例 instance
        const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
        expect(mockPlaySoundFile.mock.calls[0][0]).toEqual('song.mp3'); // 被 mock 后的 playSoundFile 接收参数是否匹配

        expect(mockPlaySoundFile).toHaveBeenCalledWith('song.mp3'); // 同上
        expect(mockPlaySoundFile).toHaveBeenCalledTimes(1); // 被调用 1 次
    });
});

/* 建立 __mocks__ 对应文件手动 mock */
describe('es6 class mocks of manual mock ', () => {
    beforeEach(() => {
        SoundPlayerM.mockClear();
    });

    /* 测试是否调用了构造函数 new SoundPlayer */
    it('test whether the consumer called the class constructor', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(SoundPlayerM).toHaveBeenCalledTimes(1);
    });

    /* 测试是否调用了实例 instance 的方法 */
    it('test whether the consumer called a method on the class instance', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        soundPlayerConsumer.playSomethingCoolM();

        /* bug-node: 自定义 mock 的话似乎 instances 拿到的实例属性都是空的，playSoundFile 丢失？ */

        // const mockSoundPlayerInstance = SoundPlayerM.mock.instances[0]; // 获得创建的实例 instance
        // console.log(mockSoundPlayerInstance.playSoundFile) // undefined
        // const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;

        // const mockPlaySoundFile = soundPlayerConsumer.soundPlayerM.playSoundFile;
        expect(mockPlaySoundFile.mock.calls[0][0]).toEqual('song.mp3'); // 被 mock 后的 playSoundFile 接收参数是否匹配
        expect(mockPlaySoundFile).toHaveBeenCalledWith('song.mp3');
    });
});

/* 利用 mockImplementation 测试 class */
describe('es6 class mocks of mockImplementation ', () => {
    beforeAll(() => {
        SoundPlayer.mockImplementation(() => {
            return {
                playSoundFile: () => {
                    throw new Error('Test error');
                },
            };
        });
    });

    /* 测试是否 SoundPlayer 的 playSoundFile 方法抛出错误 */
    it('test whether throw an error when calling playSomethingCool', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
    });
});