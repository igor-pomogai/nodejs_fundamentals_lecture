# nodejs_fundamentals_lecture

Homework

1. create users.xml file with users that have structure:
  ```
  <?xml version="1.0" encoding="utf-8"?>
    <users>
      <user>
        <id> 1 </id>
        <name> igor </name>
        <company> techmagic </company>
        <gender> male </gender>
        <age> 24 </age>
      </user>
      <user>
        ...
      </user>
    </users>
  ```
    
2. create **app.js** file that will be your entry point
 2.1. also create **package.json** with dependencies you need
3. create user module in separate folder. it should export User class.
  3.1. User class should contain: the same fields as in xml provided.
4. create organization module is separate folder. it should contain Organization class
  4.1. Organization class should contain: name(String), users(Array)
5. require organization and user modules into app.js
6. read **users.xml** file
  6.1. parse xml using xml-parser module from npm registry (put it as dependency in your package.json)
7. for each user
 7.1. get his org, create Organization type object for it
 7.2. create User object with correct fields
 7.3. push User object into Organization.users[] array
 7.4. push Organization object into orgs[] array **IF IT DOES NOT EXIST THERE YET (orgs are unique by name)**
8. write orgs array into organizations.txt file in format:
  ```
  <orgname> [<user.name>, <user.name>, <user.name>....]
  <orgname> [...]
  ...
  ```

 
