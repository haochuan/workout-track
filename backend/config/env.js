const env = {
  production: {
    name: 'production',
    port: 3000,
    dbHost: 'mongodb://admin:admin@ds111489.mlab.com:11489/workout-track'
  },
  dev: {
    name: 'dev',
    port: 3000,
    dbHost: 'mongodb://admin:admin@ds117889.mlab.com:17889/workout-track-dev'
  },
  test: {
    name: 'test',
    port: 3000,
    dbHost: 'mongodb://admin:admin@ds117849.mlab.com:17849/workout-track-test'
  }
}

export default env[process.env.NODE_ENV];