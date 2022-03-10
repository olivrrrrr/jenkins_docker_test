node {
    
    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

    stage('Git Clone'){
       git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
    }

    stage('Build') {

			steps {
				sh 'docker build -t oliverxekwalla/node_test:latest .'
			}
		}



}