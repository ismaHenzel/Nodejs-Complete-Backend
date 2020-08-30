import dotenv from 'dotenv';
dotenv.config();
import Queue from './Queue/Queue.js';

Queue.process("SendEmail")