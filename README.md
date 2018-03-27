# node-initialize-project
A simple node.js script which copies the contents of a specified folder and places them in a folder created by the user.
Used as a generator of a project, by copying the contents of a boilerplate, but can also be used for other purposes.

### Description:
The info.js file in the src folder contains boilerplate and filters information.
#### boilerplates
- **name**: The name by which the boilerplate gets matched by user input, when asked for a boilerplate.
- **path**: Exact path to the boilerplate folder.
#### filters
User specified files to not transfer.

### Usage:
Open up a terminal in the script's folder, and enter ```npm link```. This will make it globally executable.
To run the script, open a terminal anywhere and write down ```init-project```.
