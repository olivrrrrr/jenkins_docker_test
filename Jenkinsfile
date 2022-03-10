node {
    
    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

    stage('Git Clone'){

        git "https://github.com/olivrrrrr/jenkins_docker_test"
    }

    stage('Build') {

			steps {
				sh 'docker build -t oliverxekwalla/Node_pipeline:latest .'
			}
		}

}