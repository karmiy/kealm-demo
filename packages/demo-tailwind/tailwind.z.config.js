module.exports = {
    // 清除选项
    purge: ['./src/**/*.tsx'],
    theme: {
        spacing: {
            0: 0,
            px: '1px',
            0.1: '0.1rem',
            0.2: '0.2rem',
            0.4: '0.4rem',
            0.6: '0.6rem',
            0.8: '0.8rem',
            1.2: '1.2rem',
            1.6: '1.6rem',
            2: '2rem',
            2.4: '2.4rem',
            2.8: '2.8rem',
            3.2: '3.2rem',
            iPhoneBar: '3.4rem',
            3.6: '3.6rem',
            4: '4rem',
            4.4: '4.4rem',
            4.8: '4.8rem',
            5.6: '5.6rem',
            6.4: '6.4rem',
            8: '8rem',
            9.6: '9.6rem',
            11.2: '11.2rem',
            12.8: '12.8rem',
            14.4: '14.4rem',
            16: '16rem',
            17.6: '17.6rem',
            19.2: '19.2rem',
            20.8: '20.8rem',
            22.4: '22.4rem',
            24: '24rem',
            25.6: '25.6rem',
            28.8: '28.8rem',
            32: '32rem',
            38.4: '38.4rem',
            vw: '100vw',
            vh: '100vh',
        },
        borderRadius: {
            none: '0px',
            sm: '0.2rem',
            DEFAULT: '0.4rem',
            md: '0.6rem',
            lg: '0.8rem',
            xl: '1.2rem',
            '2xl': '1.6rem',
            '3xl': '2.4rem',
            full: '9999px',
            '1/2': '50%',
        },
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            1.2: '1.2em',
            1.6: '1.6rem',
            2: '2rem',
            2.4: '2.4rem',
            2.8: '2.8rem',
            3.2: '3.2rem',
            3.6: '3.6rem',
            4: '4rem',
        },
        maxWidth: (theme, { breakpoints }) => ({
            none: 'none',
            0: '0rem',
            '1/2': '50%',
            full: '100%',
            min: 'min-content',
            max: 'max-content',
            prose: '65ch',
            ...breakpoints(theme('screens')),
        }),
        fontSize: {
            'size-1.1': `1.1rem`,
            'size-1.2': `1.2rem`,
            'size-1.3': `1.3rem`,
            'size-1.4': `1.4rem`,
            'size-1.5': `1.5rem`,
            'size-1.6': `1.6rem`,
            'size-1.7': `1.7rem`,
            'size-1.8': `1.8rem`,
            'size-1.9': `1.9rem`,
            'size-2': `2rem`,
        },
        extend: {
            /* iphoneX 底部断点 */
            screens: {
                xb: [
                    // iPhoneX, iPhoneXS
                    {
                        raw: 'only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
                    },
                    // iPhoneXS Max
                    {
                        raw: 'only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
                    },
                    // iPhoneXR
                    {
                        raw: 'only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
                    },
                    // iPhone12/12Pro
                    {
                        raw: 'only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
                    },
                    // iPhone12Pro Max
                    {
                        raw: 'only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
                    },
                ],
            },
            colors: {
                black: '#000',
                white: '#fff',
                // 中性灰色
                'my-grey': {
                    1: '#323232',
                    DEFAULT: '#323232',
                    2: '#555',
                    3: '#666',
                    4: '#999',
                    5: '#B2B2B2',
                    6: '#B5B5B5',
                    7: '#CCC',
                    8: '#DDD',
                    9: '#EBEBEB',
                    10: '#EEE',
                    11: '#F2F2F2',
                    12: '#F5F5F5',
                    13: '#FAFAFA',
                },
                'my-brand': {
                    DEFAULT: '#FF4D88',
                    12: '#FFEAF1',
                },
                'my-red': {
                    DEFAULT: '#FF4D4D',
                    12: '#FFEAEA',
                },
                'my-orange': {
                    DEFAULT: '#FF8800',
                    12: '#FFF1E0',
                },
                'my-yellow': {
                    DEFAULT: '#FAA700',
                    12: '#FEF4E0',
                },
                'my-green': {
                    DEFAULT: '#00CD9A',
                    12: '#E0F9F3',
                },
                'my-cyan': {
                    DEFAULT: '#18CCCC',
                    12: '#E3F9F9',
                },
                'my-blue': {
                    DEFAULT: '#4794FF',
                    12: '#E9F2FF',
                },
                // 蓝紫
                'my-blue-violet': {
                    DEFAULT: '#8C75FF',
                    12: '#F1EEFF',
                },
                'my-purple': {
                    DEFAULT: '#BF66FF',
                    12: '#F7EDFF',
                },
                'my-pink': {
                    DEFAULT: '#FF5CBB',
                    12: '#FFEBF7',
                },
                // 靛青
                'my-indigo': {
                    DEFAULT: '#4F7CAE',
                    12: '#EAEFF5',
                },
                // 蓝灰色
                'my-blue-grey': {
                    DEFAULT: '#A1A8B3',
                    12: '#F4F5F6',
                },
                /* 蒙层 */
                'my-thin-dark': {
                    1: 'rgba(0, 0, 0, .1)',
                    2: 'rgba(0, 0, 0, .2)',
                    3: 'rgba(0, 0, 0, .3)',
                    4: 'rgba(0, 0, 0, .4)',
                    5: 'rgba(0, 0, 0, .5)',
                    6: 'rgba(0, 0, 0, .6)',
                    7: 'rgba(0, 0, 0, .7)',
                    8: 'rgba(0, 0, 0, .8)',
                    9: 'rgba(0, 0, 0, .9)',
                },
            },
            zIndex: {
                negative: -1,
                1: 1,
                100: 100,
                1000: 1000,
            },
        },
    },
    variants: {
        extend: {
            padding: ['fs'],
            height: ['fs'],
        },
    },
    plugins: [
        function ({ addVariant, e }) {
            /* 全屏 fullscreen 变体 */
            addVariant('fs', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.fs .${e(`fs${separator}${className}`)}`;
                });
            });
        },
    ],
};
