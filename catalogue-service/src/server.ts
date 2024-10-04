import 'reflect-metadata';
import express from 'express';
import './infrastructure/datasources/catalogues.datasource';
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
