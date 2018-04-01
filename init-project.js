#!/usr/bin/env node

class CreateProject {
    constructor() {
        this.copydir = require('copy-dir');
        this.readl = require('readline');
        this.boilerplates = require('./src/info').info.boilerplates;

        this.init();
    };

    init() {
        this
            .getBoilerplate()
                .then(boilerplate => this.startProject(boilerplate))
                    .catch(err => {
                        console.error(err.message);
                        process.exit();
                    });
    };

    getUserInput(question) {
        return new Promise(resolve => {
            const interfs = this
                .readl
                    .createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

            interfs
                    .question(question, (input) => {
                        resolve(input);
                        interfs.close();
                    });
        });
    };

    getBoilerplate() {
        return new Promise((resolve, reject) => {
            this
                .getUserInput('Specify boilerplate: ')
                    .then(input => {
                        this
                            .boilerplates
                                .forEach((boilerplate, index) => {
                                    if(boilerplate.name == input) {
                                        resolve(boilerplate);
                                    } else if(boilerplate.name !== input && index == this.boilerplates.length - 1) {
                                        reject(new Error('No such boilerplate found'));
                                    }
                                });
                    });
        });
    };

    startProject(boilerplate) {
        this
            .getUserInput('Name your project: ')
                .then(input => {
                    this
                        .copydir
                            .sync(boilerplate.path, `${process.cwd()}/${input}`, (stat, filepath, filename) => {
                                for (const filter of boilerplate.filters) {
                                    if(filename == filter) {
                                        return false;
                                    }
                                }

                                return true;
                            });
                    
                    console.log(`Project ${input} created.`);
                    process.exit();
                });
    }
};

new CreateProject();