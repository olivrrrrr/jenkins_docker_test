node {
    
    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

    stage('Git Clone'){
       git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
    }

    stage('Build') {
	    sh 'docker build -t node_test:latest .'
		}



}