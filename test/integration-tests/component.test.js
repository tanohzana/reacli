
import rimraf from "rimraf"
import path from "path"
import Tacks from "tacks"
import dircompare from "dir-compare"

import common from "../common"

const basePath = path.resolve(__dirname, path.basename(__filename, ".js"))
const fixturePath = path.resolve(basePath, "test-files")
const Dir = Tacks.Dir
const File = Tacks.File

const withFixture = (testDone, fixture, tester) => {
	const removeAndDone = (err) => {
		if (err) throw err
		// Comment these two lines if the tested component
		// fixture does not exist yet, then copy-paste it 
		// into /fixtures and uncomment back those lines
		fixture.remove(fixturePath)
		rimraf.sync(basePath)
		testDone()
	}

	fixture.create(fixturePath)

	tester(removeAndDone)
}

describe("Component creation with CLI", () => {
    test("reacli component ./simple-component", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "simple-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
    
    test("reacli component ./flow-component --flow", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "flow-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath, "--flow"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli component ./redux-component --redux", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "redux-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath, "--redux"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli component ./scss-component --scss", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "scss-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath, "--scss"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli component ./combination-component --redux --scss", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "combination-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath, "--redux", "--scss"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    }) 

    test("reacli component ./extension-js-component --extension js", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "extension-js-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath, "--extension", "js"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
		
    test("reacli component ./pre-configured-component", (testDone) => {
        const fixture = new Tacks(Dir({
            "package.json": File({
                name: "this-is-a-cool-test",
            }),
            ".reacli": File({
                redux: true,
                flow: true,
                scss: true,
                extension: "js",
            }),
        }))
        

        const componentName = "pre-configured-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)

        withFixture(testDone, fixture, (done) => {
            common(["component", componentPath], {
                    cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                    const { same } = dircompare.compareSync(expectedPath, componentPath);
                    
                    expect(same).toBeTruthy()
                    expect(code).toEqual(0)
                    done()
            })
        })
	})
})

describe("Component creation with CLI alias", () => {
    test("reacli c ./simple-component", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "simple-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
    
    test("reacli c ./flow-component --flow", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "flow-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath, "--flow"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli c ./redux-component --redux", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "redux-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath, "--redux"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli c ./scss-component --scss", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "scss-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath, "--scss"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli c ./combination-component --redux --scss", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "combination-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath, "--redux", "--scss"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    }) 

    test("reacli c ./extension-js-component --extension js", (testDone) => {
        const fixture = new Tacks(Dir())
        const componentName = "extension-js-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath, "--extension", "js"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, componentPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
		
    test("reacli c ./pre-configured-component", (testDone) => {
        const fixture = new Tacks(Dir({
            "package.json": File({
                name: "this-is-a-cool-test",
            }),
            ".reacli": File({
                redux: true,
                flow: true,
                scss: true,
                extension: "js",
            }),
        }))
        

        const componentName = "pre-configured-component"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", componentName)
        const componentPath = path.resolve(`${fixturePath}/${componentName}`)

        withFixture(testDone, fixture, (done) => {
            common(["c", componentPath], {
                    cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                    const { same } = dircompare.compareSync(expectedPath, componentPath);
                    
                    expect(same).toBeTruthy()
                    expect(code).toEqual(0)
                    done()
            })
        })
	})
})