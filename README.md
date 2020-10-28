# Employee Manager

Small app for managing employees as specified here:
https://gist.github.com/vladaspasic/8dad78029a604bc97675f5568665cd67

demo: https://moysa.github.io/employee-manage-ember/

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone` this repository
* `cd employee-manager`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200/employee-manage-ember/](http://localhost:4200/employee-manage-ember/).
* Visit your tests at [http://localhost:4200/employee-manage-ember/tests](http://localhost:4200/employee-manage-ember/tests).

### Running Tests

* `ember test`
* `ember test --server`

If testem can't find Chrome on you machine. Un-comment `browser_paths` config in `testem.js`
and change the path to the Chrome/Chromium binary to reflect your setup.

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
