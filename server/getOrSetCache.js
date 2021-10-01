const Redis = require("redis");
const redisClient = Redis.createClient();


function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (err, data) => {
            if (err) return reject(err);
            if (data != null) return resolve(JSON.parse(data));
            else {
                const freshData = await cb();
                redisClient.setex(key, process.env.DEFAULT_EXPERATION, JSON.stringify(freshData));
                resolve(freshData);
            }
        });
    })
}

module.exports = getOrSetCache;