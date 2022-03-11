pipeline {
    
  environment {
    registry = "oliverxekwalla/docker_automation"
    registryCredential = 'dockerhub'
    dockerImage = ''
    }

    // 
    // stage('Git Clone'){
    //    git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
    // }
    agent any
    
    stages {
            stage('Cloning our Git') {
                steps {
                git "https://github.com/olivrrrrr/jenkins_docker_test"
                }
            }

          }

}