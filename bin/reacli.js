#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"
import chalk from "chalk"
import figlet from "figlet"

import { createComponent, createHook, loadReacliConfiguration } from "../lib/core"
import interactiveCLI from "../lib/interactiveCLI"
import { validatePath, validateName, validateExtension } from "../lib/utils/validators"

const createElement = async ({ firstParam = null, pathsToComponentsToCreate = [], options = [] }) => {
	// Cmd reacli component <path> creates a component architecture

	const promises = []
	for (let relativePath of pathsToComponentsToCreate) {
		const path = pathModule.resolve(relativePath)

		if (validatePath(path) && validateName(path)) {
			try {
				if (firstParam === "component" || firstParam === "c") {
					promises.push(createComponent(path, options))
				} else if (firstParam === "hook") {
					promises.push(createHook(path, options))
				} else {
					program.outputHelp()
				}
			} catch (error) {
				console.log("ERROR: ", error)
				program.outputHelp()
			}
		}
	}

	await Promise.all(promises)
}

const outputHelpDetails = () => {
	console.log("")
	console.log("Commands:")
	console.log("  component [path(s)] [options]")
	console.log("  c [path(s)] [options]")
	console.log("  hook [path(s)] [options]")
	console.log("")
	console.log("Examples:")
	console.log("  Interactive CLI:")
	console.log("    $ reacli")
	console.log("  Create a component using Redux and Scss:")
	console.log("    $ reacli component ./my-path/my-component --redux --scss")
	console.log("  Create two hooks:")
	console.log("    $ reacli hook ./my-hook1 ./my-hook-2")
}

const reactCli = async () => {

	// Welcome message
	console.log(chalk.green(figlet.textSync("Reacli", {
		horizontalLayout: "default",
		verticalLayout: "default",
	})));

	pkgInfo(module, "version");
	const cliVersion = module.exports.version;

	// Define cli options
	program
		.version(cliVersion)
		.description("React CLI to create things really fast")
		.usage("<command> [path(s)] [options]")
		.option("-f, --flow", "add flow to the template")
		.option("--scss", "use SCSS instead of classic css")
		.option("--redux", "add Redux to the template")
		.option("-i, --ignore-config-file", "ignore the '.reacli' optional configuration file")
		.option("--extension [value]", "the file extension to use for the templates ('js' or 'jsx')");

	program.on("--help", outputHelpDetails);

	program.parse(process.argv);


	let options = {}
	const { args } = program

	if (!args.length) {
		options = await interactiveCLI(program.ignoreConfigFile, options)
	}

	const firstParam = args.shift()
	const pathsToComponentsToCreate = args

	if (program.flow) {
		options = Object.assign(options, { flow: true })
	}
	if (program.scss) {
		options = Object.assign(options, { scss: true })
	}
	if (program.redux) {
		options = Object.assign(options, { redux: true })
	}
	if (program.extension && validateExtension(program.extension)) {
		options = Object.assign(options, { extension: program.extension })
	}

	options = await loadReacliConfiguration(process.cwd(), options, program.ignoreConfigFile)

	createElement({
		firstParam,
		options,
		pathsToComponentsToCreate,
	})
}

reactCli()

export default reactCli