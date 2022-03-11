pipeline {
    
  environment {
    registry = "oliverxekwalla/docker_automation"
    registryCredential = 'dockerhub'
    dockerImage = ''
    }

    // agent any
    // stage('Git Clone'){
    //    git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
    // }

    stages {
            stage('Cloning our Git') {
                steps {
                git "https://github.com/olivrrrrr/jenkins_docker_test"
                }
            }

          }

}