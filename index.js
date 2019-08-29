const inquirer = require('inquirer');
const seperator = new inquirer.Separator('============');
(async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'author',
            message: '请输入作者名称',
            default: 'author',
            filter(input) {
                return input.trim();
            },
            validate(input) {
                return input.length > 0;
            },
            transformer(input) {
                if(input.length > 0) {
                    return '大神' + input
                }
                return input;
            }
        }, 
        {
            type: 'number',
            name: 'age',
            message(answers) {
                return `大神${answers.author}请输入您的年龄`
            },
            filter(input) {
                let num = parseInt(input);
                if(Number.isNaN(num) || num <= 0 || num > 100) return '';
                return num;
            },
            validate(input) {
                let num = parseInt(input);
                if(Number.isNaN(num) || num <= 0 || num >= 100) {
                    console.log(input);
                    return new Error('请输入合法的年龄');
                }
                return true;
            },
            transformer(input, answers) {
                return `大神${answers.author}今年  ${input}  岁`;
            }
        },
        {
            type: 'password',
            name: 'pwd',
            message(answers) {
                return `大神${answers.author}请输入您的密码`
            },
            mask: '*',
        },
        {
            type: 'confirm',
            name: 'isRoot',
            default: true,
            message: '当前目录是根目录',
        },
        {
            type: 'list',
            name: 'favorFruits',
            message: '选择你最喜欢的水果',
            default: 3,
            pageSize: 4,
            filter(input) {
                return input.slice(6)
            },
            choices() {
                return new Array(100).fill(0).map((v, i) => {
                    if(i % 4 === 0) {
                        return seperator;
                    }
                    return {
                        name: `fruit_${i}`,
                        value: `fruit_${i}`,
                    }
                });
            }
        },
        {
            type: 'rawlist',
            name: 'favorSport',
            message: '选择你最喜欢的运动',
            default: 3,
            pageSize: 5,
            when(answers) {
                return answers.favorFruits > 10 && answers.isRoot;
            },
            choices() {
                return new Promise(resolve => {
                    const result = new Array(100).fill(0).map((v, i) => {
                        if(i % 4 === 0) {
                            return seperator;
                        }
                        return {
                            name: `sport_${i}`,
                            value: `sport_${i}`,
                        }
                    });
                    setTimeout(() => {
                        resolve(result);
                    }, 1000)
                })
            }
        },
        {
            type: 'expand',
            name: 'opera',
            message: '选择您的操作',
            default: 3,
            choices() {
                return new Promise(resolve => {
                    const result = new Array(10).fill(0).map((v, i) => {
                        return {
                            name: `opera_${i}`,
                            value: `opera_${i}`,
                            key: `${i}`
                        }
                    });
                    setTimeout(() => {
                        resolve(result);
                    }, 1000)
                })
            }
        },
        {
            type: 'checkbox',
            name: 'hobby',
            message: '选择您的爱好，至少12个',
            validate(input) {
                return input.length >= 12;
            },
            choices() {
                return new Array(100).fill(0).map((v, i) => {
                    if(i % 7 === 0) return seperator;
                    return {
                        name: `hobby_${i}`,
                        value: `hobby_${i}`,
                        checked: i % 9 === 0,
                        disabled: i % 8 === 0
                    }
                });
            }
        }
    ]);

    console.log(answers);
})();