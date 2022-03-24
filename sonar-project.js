const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
       'sonar.sources': '.',
       'sonar.inclusions' : 'controllers/blogs.js' // Entry point of your code
       }
     }, () => {});
 