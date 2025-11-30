// // import {RateLimit} from "@upstash/ratelimit"
// import { Redis } from "@upstash/redis";
// import RateLimit from '@upstash/ratelimit';
// import { config } from "dotenv";

// config();
// //rate limiter that allows 10 req per 20 seconds

// const rateLimit = new RateLimit({
//     redis : Redis.fromEnv(),
//     limiter : RateLimit.slidingWindow(10 , "20 s")
// })

// export default rateLimit;