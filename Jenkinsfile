
pipeline {
    environment {
    registry = "oliverxekwalla/app1"
    registryCredential = "DOCKERHUB_CREDENTIALS"
    dockerImage = ''
    }

    agent any
    stages {
            stage('Cloning our Git') {
                steps {
                git branch: 'main', credentialsId:'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
                }
            }
        
            stage('Test') {
                  steps {
                    sh 'node test'
                  }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }

            stage('Cleaning Up') {
                steps{
                  sh "docker rmi --force $registry:$BUILD_NUMBER"
                }
            }
        }
    }
