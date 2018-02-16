let ENV = process.env.NODE_ENV || 'development';

//console.log(ENV);

if(ENV === 'test' || ENV === 'development'){
    let config = require('./config.json');

    let envConfig = config[ENV];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}

