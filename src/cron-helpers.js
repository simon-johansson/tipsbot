
import cronParser from 'cron-parser';
import cronPrinter from 'prettycron';
import { scheduleJob } from 'node-schedule';
import { promiseWrapper } from './utils';

export const cronPrettyPrint = cronTime =>
  cronPrinter.toString(cronTime).toLowerCase();

export const cronValidator = cronTime =>
  promiseWrapper(cronParser.parseExpression, cronTime);

export const cronJob = (cronTime, task) =>
  promiseWrapper(scheduleJob, cronTime, task);
