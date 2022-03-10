node {
    
    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

    stage('Git Clone'){

        git "https://github.com/olivrrrrr/jenkins_docker_test"
    }

    stage('Build') {
			sh 'docker build -t oliverxekwalla/node-test:latest .'
		}

}