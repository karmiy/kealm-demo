import inquirer from 'inquirer';

export default () => {
    return inquirer.prompt([
        // packageName
        {
            type: 'input',
            name: 'packageName',
            message: 'set package name',
            validate(val) {
                if (val) return true;
                return 'Please enter package name';
            },
        },
        // port
        {
            type: 'input',
            name: 'port',
            message: 'set server port number',
            default() {
                return 8000;
            },
        },
        // middleware
        {
            type: 'checkbox',
            message: 'select middleware',
            name: 'middleware',
            choices: [
                {
                    name: 'koaRouter',
                },
                {
                    name: 'koaStatic',
                },
                {
                    name: 'koaViews',
                },
                {
                    name: 'koaBody',
                },
            ],
        },
    ]);
};