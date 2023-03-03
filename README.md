# node-cli
nodejs command line interface for linux/bash

---

## Installation Steps

### Linux
```
# Clone the repo
git clone git@github.com:bgalalrn/node-cli.git

# Copy node-cli to path
cd node-cli
cp node-cli.js /usr/local/bin/

```

## How to use?

### Inline mode
```
# pipe
cat access_log.log | node-cli -i 'return line.toLowerCase()'

# Input file
node-cli -i 'return line.toLowerCase()' < access_log.log

```
### File mode
#### Prepare a nodejs file
```JavaScript
//script.js
module.exports = aysnc (line)=> {
  // All your processing here...
  return processedString;
}

```
#### Pass script file as input.
```
# pipe
cat access_log.log | node-cli -f ./script.js 

# Input file
node-cli -f ./script.js < access_log.log
```
