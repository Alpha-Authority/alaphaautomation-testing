<div align="center">
<h2>Alapha Automations - Testing (AAT)</h2>
The official bot of Alpha Authority, dedicated to providing security, entertainment, and utility services.
<br>
<br>
<img src="https://img.shields.io/github/last-commit/Scrippy/alaphaautomation-testing">
<img src="https://img.shields.io/github/languages/top/Scrippy/alaphaautomation-testing">
<img src="https://img.shields.io/github/license/Alpha-Authority/alaphaautomation-testing">
<br>
</div>

<div align="center">
<a href="#about">About</a> •
<a href="#prerequisites">Prerequisites</a> •
<a href="#getting-started">Getting started</a> •
<a href="#faq">FAQ</a>
</div>

---------------

### About:

This repository is dedicated to the development of a system called Alapha Automations. Our developers push updates from this repository to the virtual private server (VPS) that Alpha Authority owns. This repository alone is considered by our developers to be a bot, and not the whole system which our VPS runs with. We may not always keep this bot open to the public, so what you see here might be the last sight you see at any given time.

Feel free to look through this, we've done a lot to reset and remove old tokens and keys that were found in this project. So far, what is here is secure and maybe not effiicient friendly, but it works good enough.

---------------

### Prerequisites:
- <a href="https://nodejs.org/en/download">Node</a>

---------------

### Getting started:

```bash 
git clone https://github.com/brplcc/alaphaautomation-testing.git
cd alphaautomation-testing
```
You will need to have a .env file with the required information. Use the example.env file in the config directory for reference.

---------------

### FAQ:

#### Why is "node_modules" included in the repository instead of package.json file?

The code relies on some legacy libraries, when we tried using NPM, it broke. So they were just added to the repository for ease of use.
